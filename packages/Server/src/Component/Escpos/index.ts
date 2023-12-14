import tcpPortUsed from "tcp-port-used";
import * as net from "net";
import * as tls from "tls";
import {EscposConfig} from "./interfaces/EscposConfig";

import {Image, Printer} from "@node-escpos/core";
import { Adapter } from "@node-escpos/adapter"
import USB, {TDevice} from "@node-escpos/usb-adapter";
import SERIAL from "@node-escpos/serialport-adapter";
import NETWORK from "@node-escpos/network-adapter";
import {merge} from "lodash";
import {DefaultConfigSerial, DefaultConfigUSB} from "./Config/DefaultConfigEscpos";
import {DEVELOPMENT, ESCPOS_SERIAL, ESCPOS_USB} from "./Types/EscposTypes";


function checkModuleExist(moduleName : string){
    try {
        require.resolve(moduleName);
        return true;
    } catch (e) {
        return false;
    }
}

export async function Escpos(config : EscposConfig) {
    let Server : net.Server = net.createServer();

    let adapter : Adapter<[]> = undefined;
    let device : TDevice | undefined = undefined;
    let printer : Printer<any> = undefined;
    config = await merge(DefaultConfigUSB, config);
    //@######################################################################
    let logger = (config.state === DEVELOPMENT) ?
        (checkModuleExist("winston")) ? require("winston").createLogger({
            transports : [ new (require("winston")).transports.Console() ]
        }) : undefined : undefined;
    //@#######################################################################
    return new Promise(async (resolve, rejected) => {
        await tcpPortUsed.check(config.settings.port)
            .then(async (isUsed) => {
                if (!isUsed){
                    switch (config.connection) {
                        case ESCPOS_USB :
                            let configUSB = merge(DefaultConfigUSB, config);


                            if (configUSB.autoDetectUSB){
                                process.on("SIGINT", async () => {
                                    await Server.close();
                                    logger?.info(`interruption by CTRL + C. terminating program`)
                                    await process.exit(0);
                                    process.kill(process.pid);
                                });

                                USB.on("attach", async (device) => {
                                    logger?.info(`device 0x${device.deviceDescriptor.idVendor}:0x${device.deviceDescriptor.idProduct} detected`);
                                    if (!Server.listening){
                                        Server.listen({ port : configUSB.settings.port, host : configUSB.settings.host });
                                    }
                                });

                                USB.on("detach", async (device) => {
                                    logger?.info(`device 0x${device.deviceDescriptor.idVendor}:0x${device.deviceDescriptor.idProduct} unplugged`);
                                    if (Server.listening){
                                        await adapter?.close();
                                        await Server.close();
                                    }
                                });
                            }else{

                                Server.on("close", () => {
                                    logger?.info(`close server successfully`)
                                    process.exit(0);
                                    process.kill(process.pid)
                                })
                                process.on("SIGINT", async () => {
                                    logger?.info(`interruption by CTRL + C. terminating program. close server`)
                                    await Server.close();
                                });

                                USB.on("detach", async () => {
                                    logger?.info(`device 0x${device.deviceDescriptor.idVendor}:0x${device.deviceDescriptor.idProduct} unplugged`);
                                    if (Server.listening){
                                        await adapter?.close();
                                        await Server.close();
                                    }
                                });
                            }

                            Server.on("listening", async () => {
                                logger?.info(`server starting successfully`);
                                await resolve({ status : true, code : 200, msg : `printer succesfully started`, config : configUSB})
                            });
                            Server.on("error", (error) => {
                                logger?.error(`server error detected, ${error}`);
                            })
                            Server.on("connection", async (client) => {
                                logger?.info(`connection incoming`);
                                adapter = new USB();

                                await adapter?.open(async (error) => {
                                    if (!error){
                                        logger?.info(`adapter open without error`);
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        await client.pipe(adapter, { end : false });
                                        logger?.info(`successfully running pipe adapter`);
                                    }else{
                                        logger?.error(`error opening adapter, ${error}`);
                                    }
                                });
                            });
                            Server.listen({ port : configUSB.settings.port, host : configUSB.settings.host });
                            break;
                        case ESCPOS_SERIAL :
                            let configSerial = merge(DefaultConfigSerial, config);
                            USB.on("attach", async () => {
                                if (!Server.listening){
                                    Server.listen({ port : configSerial.settings.port, host : configSerial.settings.host });
                                }
                            });

                            USB.on("detach", async (device) => {
                                if (Server.listening){
                                    await adapter?.close();
                                    await Server.close();
                                }
                            });
                            Server.on("listening", async () => {
                                await resolve({ status : true, code : 200, msg : `printer succesfully started`, config : configSerial })
                            });
                            Server.on("error", (error) => {
                                console.error(error);
                            });

                            Server.on("connection", async (client) => {
                                adapter = new SERIAL(configSerial.port,configSerial.settings);
                                await adapter?.open(async (error) => {
                                    if (!error){
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        await client.pipe(adapter, { end : false });
                                    }else{
                                        console.log("error open", error)
                                    }
                                });
                            });
                            Server.listen({ port : configSerial.settings.port, host : configSerial.settings.host });
                            break;
                        default :
                            await rejected({ status : false, code : 500, msg : `connection Method not allowed`});
                            break;
                    }
                }else{
                    await rejected({ status : false, code : 500, msg : `port in used, please close the port or try another port`})
                }
            })
            .catch(async (error) => {
                await rejected({ status : false, code : 505, msg : `failed to check port`, error : error})
            })
    });
}

export default Escpos;