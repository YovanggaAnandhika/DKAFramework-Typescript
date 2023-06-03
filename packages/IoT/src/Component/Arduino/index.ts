import Firmata from "firmata";
import Five, { Board, Led } from "johnny-five";
import {
    ArduinoConfig,
    ArduinoConfigSerial,
    ArduinoConfigWifi
} from "./Interfaces/ArduinoConfigInterfaces";
import {ARDUINO_TYPE_SERIAL, ARDUINO_TYPE_WIFI} from "./Types/ArduinoTypes";
import {merge} from "lodash";
import {DefaultConfigMCUSerial, DefaultConfigMCUWifi} from "./Config/DefaultConfigArduino";
import {usb} from "usb";
const {EtherPortClient} = require('etherport-client');
import {ArduinoCheckerConfig} from "./Types/ArduinoCheckerConfig";
import {SerialPort} from "serialport";

import cluster from "cluster";

export  async function Arduino<Config extends ArduinoConfig>(configMCU : ArduinoCheckerConfig<Config>) {

    let board : Board;
    let serialPort : Firmata | undefined = undefined
    let connection : number = 0;

    switch (configMCU.type) {
        case ARDUINO_TYPE_WIFI :
            let configWifi = await merge(DefaultConfigMCUWifi, configMCU) as ArduinoConfigWifi;

            let EtherSerial = new EtherPortClient({
                host: configWifi.host,
                port: configWifi.port
            });

            serialPort = new Firmata(EtherSerial,{});

            board = new Board({ io:  serialPort, repl: configWifi.repl, debug : configWifi.debug, timeout: configWifi.timeout });

            serialPort.on("connect", async () => {
                if(connection > 0 ) {
                    connection++;
                    //@ts-ignore
                    board?.emit("ready");
                } else {
                    connection++;
                    //AUTO CONNECT PING
                    setInterval(async () => {
                        serialPort?.sysexCommand([0]);
                    }, 1000);
                }
            });


            if (configWifi.device?.board?.onReady !== undefined){
                board.on("ready", async () => {
                    configWifi.device?.board?.onReady?.(Five)
                });
            }

            if (configWifi.device?.board?.onClose !== undefined){
                board.on("close", async () => {
                    configWifi.device?.board?.onClose?.()
                })
            }

            if (configWifi.device?.board?.onExit !== undefined){
                board.on("exit", async () => {
                    configWifi.device?.board?.onExit?.();
                })
            }

            if (configWifi.device?.board?.onError !== undefined){
                board.on("error", async (error) => {
                    configWifi.device?.board?.onError?.(error)
                })
            }

            break;
        case ARDUINO_TYPE_SERIAL :

            process.on("uncaughtException", async (error) => {
                //console.log(error)
            });

            let configSerial = merge(DefaultConfigMCUSerial, configMCU) as ArduinoConfigSerial;
            let mTimer : NodeJS.Timer;

            // put your code here
            let SettingSerial = {
                path : `${configSerial.path}`,
                baudRate : configSerial.baudRate as number
            }

            let SP = new SerialPort(SettingSerial);

            serialPort = new Firmata(SP);

            board = new Board({ io: serialPort, repl: configSerial.repl, debug : configSerial.debug, timeout: configSerial.timeout });

            serialPort.on("connect", async () => {
                if(connection > 0 ) {
                    connection++;
                    mTimer = setInterval(async () => {
                        serialPort?.sysexCommand([0]);
                    }, 3000);
                    //@ts-ignore
                    board?.emit("ready");
                } else {
                    connection++;
                    //AUTO CONNECT PING
                    mTimer = setInterval(async () => {
                        serialPort?.sysexCommand([0]);
                    }, 3000);
                }
            });

            if (configSerial.device?.board?.onReady !== undefined){
                board.on("ready", async () => {
                    configSerial.device?.board?.onReady?.(Five);
                })
            }


            if (configSerial.device?.board?.onClose !== undefined){
                board.on("close", async () => {
                    configSerial.device?.board?.onClose?.()
                })
            }

            if (configSerial.device?.board?.onExit !== undefined){
                board.on("exit", async () => {
                    configSerial.device?.board?.onExit?.();
                })
            }

            if (configSerial.device?.board?.onError !== undefined){
                board.on("error", async (error) => {
                    configSerial.device?.board?.onError?.(error);

                })
            }

            usb.on("attach", async (device) => {
                SerialPort.list()
                    .then(async (portList) => {
                        SP.open(async (error) => {
                            if (error){
                                console.log("SP Error", error)
                            }
                        });
                    })
            });

            usb.on("detach", async (device) => {
                if (SP.isOpen){
                    await SP.drain();
                    await SP.close();
                    clearInterval(mTimer);
                }
            });

            break;
        default :
            break;
    }
}