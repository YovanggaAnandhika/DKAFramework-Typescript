import { Printer } from "@node-escpos/core";
import {usb} from "usb";
// install escpos-usb adapter module manually
import USB from "@node-escpos/usb-adapter";
import NETWORK from "@node-escpos/serialport-adapter";
// Select the adapter based on your printer type
import {EscposConfig, EscposUSB} from "./Interfaces/EscposConfig";
import {ESCPOS_NETWORK, ESCPOS_USB, TYPE_ESCPOS_NETWORK, TYPE_ESCPOS_USB} from "./Types/EscposTypes";
import {merge} from "lodash";
import {DefaultConfigNetwork, DefaultConfigUSB} from "./Config/DefaultConfigEscpos";
import {EscposCheckerConfig} from "./Types/EscposCheckerConfig";
import path from "path";
import * as fs from "fs";

export class Escpos<Config extends EscposConfig> {

    private config : EscposConfig | undefined;
    private device : USB | NETWORK | undefined = undefined;
    private printer : Printer<any> | undefined = undefined;

    constructor(escposConfig : EscposCheckerConfig<Config>) {
        if (escposConfig.engine === TYPE_ESCPOS_USB) {
            let configUSB = merge(DefaultConfigUSB, escposConfig);
            this.config = configUSB;

            if (USB.findPrinter().length > 0){
                this.device = (configUSB.autoDetectUSB) ? new USB() : new USB(configUSB.vendorId, configUSB.productId);
            }else{
                this.device = undefined;
            }
            //###### Event Reinit Plug or Unplug ###################
            if (configUSB.settings?.autoReinitialize){
                usb.on("attach", async (device) => {
                    if (USB.findPrinter().length > 0){
                        this.device = (configUSB.autoDetectUSB) ? new USB() : new USB(configUSB.vendorId, configUSB.productId);
                    }else{
                        this.device = undefined;
                    }
                });

                usb.on("detach", async (device) => {
                    this.device = undefined;
                })
                process.on("SIGINT", async () => {
                    usb.unrefHotplugEvents();
                })
            }
        } else if (escposConfig.engine === TYPE_ESCPOS_NETWORK) {
            let configNetwork = merge(DefaultConfigNetwork, escposConfig);
            this.config = configNetwork;
            this.device = new NETWORK(`${configNetwork.port}`, {});
        }
    }

    async Print(printer : (printer : Printer<any>) => void) : Promise<any>{
        return new Promise(async (resolve, rejected) => {
            switch (this.config?.engine) {
                case TYPE_ESCPOS_USB:
                    if (this.device !== undefined){
                        (this.device as USB).open(async (error) => {
                            if (!error){
                                this.printer = new Printer(this.device as USB, merge(this.config?.settings));
                                await printer(this.printer);

                                if (this.config?.settings?.showBanner){
                                    let PackagePath = path.join(process.cwd(),"./package.json");
                                    if (fs.existsSync(PackagePath)){
                                        let mPackage = require(PackagePath)
                                        this.printer
                                            .feed(1)
                                            .align("CT")
                                            .style("B")
                                            .size(0,0)
                                            .text(`${mPackage.name} - V.${mPackage.version}`)
                                            .feed(1)
                                    }
                                }
                                if (this.config?.settings?.autoCut){
                                    this.printer.cut()
                                }

                                if (this.config?.settings?.autoClose){
                                    await this.printer.close()
                                        .then(async () => {
                                            await resolve({ status : true, code : 200, msg : "successfully to print job"});
                                        })
                                        .catch(async (error) => {
                                            await rejected({ status : false, code : 505, msg : `error print detected`, error : error})
                                        })
                                }else{
                                    await resolve({ status : true, code : 200, msg : "successfully to print job"});
                                }
                            }else{
                                await rejected({ status : false, code : 500, msg : `cannot open print`, error : error})
                            }
                        })
                    }else{
                        await rejected({ status : false, code : 500, msg : `printer not Detect`})
                    }
                    break;
                case TYPE_ESCPOS_NETWORK:
                    (this.device as NETWORK).open(async (error) => {
                        if (!error){
                            this.printer = new Printer(this.device as NETWORK, merge(this.config?.settings));
                            await printer(this.printer);
                            if (this.config?.settings?.autoCut){
                                this.printer.cut()
                            }
                            if (this.config?.settings?.autoClose){
                                await this.printer.close()
                                    .then(async () => {
                                        await resolve({ status : true, code : 200, msg : "successfully to print job"});
                                    })
                                    .catch(async (error) => {
                                        await rejected({ status : false, code : 505, msg : `error print detected`, error : error})
                                    })
                            }else{
                                await resolve({ status : true, code : 200, msg : "successfully to print job"});
                            }
                        }else{
                            await rejected({ status : false, code : 500, msg : `cannot open print`, error : error})
                        }
                    })
                    break;
            }
        })
    }
};

export default Escpos;