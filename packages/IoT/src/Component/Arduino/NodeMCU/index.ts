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
    MODE_WIFI,
    NodeMCUConfig,
    NodeMCULedMethod, NodeMCURelayMethod
} from "./Interfaces/NodeMCUConfig";
import {merge} from "lodash";
import {
    DefaultConfigConstructorNodeMCUUSB,
    DefaultConfigConstructorNodeMCUWifi,
    DefaultConfigLedMethod, DefaultConfigRelayMethod
} from "./Config/DefaultNodeMCUConfiguration";

let boardStates : ALL_STATE = BOARD_STATE_IDLE;
let mBoard : Board | undefined = undefined;
let LedList : {[pin : string] : Led } = {};
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
                    (options.state) ? RelayList[options.pin].open() : RelayList[options.pin].close();
                    resolve({ status : true, code : 200, msg : `successfully set relay ${options.pin}`});
                }else{
                    (options.state) ? RelayList[options.pin].close() : RelayList[options.pin].open();
                    resolve({ status : true, code : 200, msg : `successfully set relay ${options.pin}`});
                }
            }else{
                await rejected({ status : false, code : 500, msg : `board undefined` });
            }
        })
    },
}

async function NodeMCU(config ?: NodeMCUConfig) : Promise<typeof MethodNodeMCU> {
    let board : Board | undefined = undefined;
    return new Promise(async (resolve, rejected) => {
        switch (config.mode) {
            case MODE_WIFI :
                config = merge(DefaultConfigConstructorNodeMCUWifi, config);
                board = new Board({
                    port : new EtherPortClient({
                        host: config.host,
                        port: config.port,
                    }),
                    repl : config.repl
                });
                mBoard = board;

                break;
            case MODE_USB :
                config = merge(DefaultConfigConstructorNodeMCUUSB, config);
                board = new Board({
                    port : config.port,
                    debug : config.debug,
                    repl : config.repl
                });
                mBoard = board;
                break;
        }

        board.on("ready", async () => {
            boardStates = BOARD_STATE_READY;
            await config?.onReady(MethodNodeMCU);
            await resolve(MethodNodeMCU);
        });
        board.on("connect", async () => {
            boardStates = BOARD_STATE_CONNECT;
            await config?.onConnect();
        });
        board.on("close", async () => {
            boardStates = BOARD_STATE_CLOSE;
            await config?.onClose();
        });
        board.on("fail", async (log) => {
            boardStates = BOARD_STATE_FAIL;
            await config?.onFail();
            await rejected(log);
        });

        board.on("error", async (error) => {
            boardStates = BOARD_STATE_ERROR;
            await config?.onError(error);
            await rejected(error);
        });
    });
}

export default NodeMCU;