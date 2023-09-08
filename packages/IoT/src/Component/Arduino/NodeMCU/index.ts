import five, { Board, Led, Relay, Button, Sensor, Switch } from "johnny-five";
import { EtherPortClient } from "etherport-client";
import {
    ALL_STATE,
    BOARD_STATE_CLOSE,
    BOARD_STATE_CONNECT,
    BOARD_STATE_ERROR,
    BOARD_STATE_FAIL,
    BOARD_STATE_IDLE,
    BOARD_STATE_READY,
    MODE_USB,
    MODE_WIFI, NodeMCUButtonMethod,
    NodeMCUConfig,
    NodeMCULedMethod, NodeMCURelayMethod, RELAY_MODE_ONCE, RELAY_MODE_TOGGLE
} from "./Interfaces/NodeMCUConfig";
import {merge} from "lodash";
import {
    DefaultConfigButtonMethod,
    DefaultConfigConstructorNodeMCUUSB,
    DefaultConfigConstructorNodeMCUWifi,
    DefaultConfigLedMethod, DefaultConfigRelayMethod
} from "./Config/DefaultNodeMCUConfiguration";

import Firmata from "firmata";

let boardStates : ALL_STATE = BOARD_STATE_IDLE;
let mBoard : Board | undefined = undefined;
let LedList : {[pin : string] : Led } = {};
let ButtonList : {[pin : string] : Button } = {};
let RelayList : {[pin : string] : Relay } = {};

export const MethodNodeMCU = {
    Led : async (options : NodeMCULedMethod) : Promise<{ status : boolean, code : number, value : number, msg : string }> => {
        options = await merge(DefaultConfigLedMethod, options);
        return new Promise(async (resolve, rejected) => {
            if (mBoard !== undefined){
                //checking Instance Led
                LedList[options.pin] = (LedList[options.pin] === undefined) ? new Led({ board : mBoard, pin : options.pin}) : LedList[options.pin];

                if (!options.reverse){
                    (options.state) ? LedList[options.pin].on() : LedList[options.pin].off();
                    resolve({ status : true, code : 200, value : LedList[options.pin].value, msg : `successfully set led ${options.pin}`});
                }else{
                    (options.state) ? LedList[options.pin].off() : LedList[options.pin].on();
                    resolve({ status : true, code : 200, value : LedList[options.pin].value, msg : `successfully set led ${options.pin}`});
                }
            }else{
                await rejected({ status : false, code : 500, msg : `board undefined` });
            }
        })
    },
    Relay : async (options : NodeMCURelayMethod) : Promise<{ status : boolean, code : number, msg : string }> => {
        options = await merge(DefaultConfigRelayMethod, options);
        return new Promise(async (resolve, rejected) => {
            if (mBoard !== undefined){
                //checking Instance Led
                RelayList[options.pin] = (RelayList[options.pin] === undefined) ? new Relay({ board : mBoard, pin : options.pin}) : RelayList[options.pin];

                if (!options.reverse){
                    switch(options.mode){
                        case RELAY_MODE_ONCE :
                            (options.state) ? RelayList[options.pin].open() : RelayList[options.pin].close();
                            await resolve({ status : true, code : 200, msg : `successfully set relay ${options.pin}`});
                            break;
                        case RELAY_MODE_TOGGLE :
                            await RelayList[options.pin].open();
                            await setTimeout(async () => {
                                await RelayList[options.pin].close();
                                await resolve({ status : true, code : 200, msg : `successfully set relay ${options.pin}`});
                            }, (options.intervalDelay !== undefined) ? options.intervalDelay : 800);
                            break;
                    }

                }else{
                    switch(options.mode){
                        case RELAY_MODE_ONCE :
                            (options.state) ? RelayList[options.pin].close() : RelayList[options.pin].open();
                            resolve({ status : true, code : 200, msg : `successfully set relay ${options.pin}`});
                            break;
                        case RELAY_MODE_TOGGLE :
                            await RelayList[options.pin].close();
                            await setTimeout(async () => {
                                await RelayList[options.pin].open();
                                await resolve({ status : true, code : 200, msg : `successfully set relay ${options.pin}`});
                            },(options.intervalDelay !== undefined) ? options.intervalDelay : 800);
                            break;
                    }
                }
            }else{
                await rejected({ status : false, code : 500, msg : `board undefined` });
            }
        })
    },
    Button : (options : NodeMCUButtonMethod)  => {
        if (mBoard !== undefined){
            options = merge(DefaultConfigButtonMethod, options)
            ButtonList[options.pin] = (ButtonList[options.pin] === undefined) ? new Button({ board : mBoard, pin : options.pin, holdtime : options.holdtime }) : ButtonList[options.pin];
            //add Event If Require
            (options.onPress !== undefined) ? ButtonList[options.pin].on("press", options.onPress) : null;
            (options.onDown !== undefined) ? ButtonList[options.pin].on("down", options.onDown) : null;
            (options.onUp !== undefined) ? ButtonList[options.pin].on("up", options.onUp) : null;
        }else{

        }
    }
}

async function NodeMCU(config ?: NodeMCUConfig) : Promise<typeof MethodNodeMCU> {
    let board : Board | undefined = undefined;
    let Ether : EtherPortClient | undefined;
    return new Promise(async (resolve, rejected) => {
        switch (config.mode) {
            case MODE_WIFI :
                config = merge(DefaultConfigConstructorNodeMCUWifi, config);
                Ether = new EtherPortClient({ host: config.host, port: config.port});

                if (config.reconnect) {
                    let connection = 0;
                    board = await new Board({
                        port : Ether,
                        repl : config.repl,
                        timeout : config.timeout
                    });

                    console.log(board.io.debug)
                    board.io.on("connect", async () => {
                        if(connection > 0 ) {
                            (config.onReady !== undefined) ? config.onReady(MethodNodeMCU) : null;
                        } else {
                            connection++;
                            //AUTO CONNECT PING
                            setInterval(function(){
                                board.io.sysexCommand([0]);
                            }, 1000);
                        }
                    });

                }else{
                    board = await new Board({
                        port : Ether,
                        repl : config.repl,
                        timeout : config.timeout
                    });
                }
                mBoard = board;

                break;
            case MODE_USB :
                config = merge(DefaultConfigConstructorNodeMCUUSB, config);
                board = new Board({
                    port : config.port,
                    debug : config.debug,
                    repl : config.repl,
                    timeout : config.timeout
                });
                mBoard = board;
                break;
        }

        // @ts-ignore
        board.on("disconnect", async () => {
            console.log("disconnect")
        });
        board.on("close", async () => {
            boardStates = BOARD_STATE_CLOSE;
            console.log("onClose");
            await config?.onClose();
        });

        board.on("ready", async () => {
            boardStates = BOARD_STATE_READY;
            (config.onReady !== undefined) ? await config.onReady(MethodNodeMCU) : null;
            await resolve(MethodNodeMCU);
        });
        board.on("connect", async () => {
            boardStates = BOARD_STATE_CONNECT;
            (config.onConnect !== undefined) ? await config?.onConnect() : null;

        });

        // @ts-ignore
        board.on("disconnect", async () => {
            console.log("disconnect")
        })

        board.on("fail", async (log) => {
            boardStates = BOARD_STATE_FAIL;
            await config?.onFail();
            await rejected(log);
        });

        board.on("error", async (error) => {
            boardStates = BOARD_STATE_ERROR;
            (config.onError !== undefined ) ? await config?.onError(error) : null;
            await rejected(error);
        });
    });
}

export default NodeMCU;