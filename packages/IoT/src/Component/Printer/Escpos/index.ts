import path from "path";
import * as fs from "fs";
import {merge} from "lodash";
// install escpos-usb adapter module manually
import { Printer, Image } from "@node-escpos/core";
import USB, {TDevice} from "@node-escpos/usb-adapter";
import NETWORK from "@node-escpos/serialport-adapter";

// Select the adapter based on your printer type
import {EscposConfig, EscposNetwork, EscposUSB, EscposUSBIdentifyVendorProduct} from "./Interfaces/EscposConfig";
import {DEVELOPMENT, ESCPOS_NETWORK, ESCPOS_USB} from "./Types/EscposTypes";
import {DefaultConfigNetwork, DefaultConfigUSB} from "./Config/DefaultConfigEscpos";
import {EscposCheckerConfig} from "./Types/EscposCheckerConfig";

import EscposOptions from "./Const";
import * as os from "os";
import * as macaddress from "macaddress";
const CPUUsage = require("cpu-percentage");
import * as ip from "ip";

export class Escpos<Config extends EscposConfig> {
    //######################################################
    private config : EscposConfig | undefined;
    private adapter : USB | NETWORK | undefined = undefined;
    private device : TDevice | undefined = undefined;
    private printer : Printer<any> | undefined = undefined;
    static Image : typeof Image = Image;

    static Options : typeof EscposOptions = EscposOptions;
    static CheckProductVendor = () => {
        let mDeviceList : Array<{ vendorId ?: number, productId ?:number }> = [];
        let mFindDevice = USB.findPrinter();
        mFindDevice.map(async (device) => {
            mDeviceList.push({
                vendorId : device.deviceDescriptor.idVendor,
                productId : device.deviceDescriptor.idProduct
            });
        })
        return mDeviceList;
    }
    private SystemInfo : { totalMemory ?: string, memoryUsed ?: string, CPUUsage ?: string, os ?: string } = { totalMemory : "0", memoryUsed : "0", CPUUsage : "-%", os : "-"};
    private static formatMemoryUsage = (bytes : number, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
    private static checkModuleExist(moduleName : string){
        try {
            require.resolve(moduleName);
            return true;
        } catch (e) {
            return false;
        }
    }
    //######################################################
    constructor(escposConfig : EscposCheckerConfig<Config>) {
        let logger = (escposConfig.state === DEVELOPMENT) ?
            (Escpos.checkModuleExist("winston")) ? require("winston").createLogger({
                transports : [ new (require("winston")).transports.Console() ]
            }) : undefined : undefined;
        switch (escposConfig.connection) {
            case ESCPOS_USB :
                let configUSB : EscposUSB = merge(DefaultConfigUSB, escposConfig);
                this.config = configUSB;
                logger?.info(`connection via usb connector`);
                break;
            case ESCPOS_NETWORK :
                let configNetwork : EscposNetwork = merge(DefaultConfigNetwork, escposConfig);
                this.config = configNetwork;
                logger?.info(`connection via network attached`);
                break;
        }
    }

    async Job(printer : (printer : Printer<any>) => void) : Promise<any>{
        //@######################################################################
        let logger = (this.config.state === DEVELOPMENT) ?
            (Escpos.checkModuleExist("winston")) ? require("winston").createLogger({
                transports : [ new (require("winston")).transports.Console() ]
            }) : undefined : undefined;
        //@#######################################################################
        return new Promise(async (resolve, rejected) => {
            switch (this.config?.connection) {
                case ESCPOS_USB:
                    let config : EscposUSB = this.config;
                    if (USB.findPrinter().length > 0){
                        let mDevice = await (USB.findPrinter());

                        if (this.config.identify !== undefined && config.identify.vendorId !== undefined && config.identify.productId !== undefined){
                            this.device = mDevice.find((device) => device.deviceDescriptor.idVendor === config.identify.vendorId && device.deviceDescriptor.idProduct === config.identify.productId);
                            if (this.device !== undefined){
                                logger?.info(`device 0x${this.device.deviceDescriptor.idVendor}:0x${this.device.deviceDescriptor.idProduct} is found`);
                            }
                        }else{
                            this.device = mDevice[0];
                            logger?.info(`device 0x${this.device.deviceDescriptor.idVendor}:0x${this.device.deviceDescriptor.idProduct} is selected default`);
                        }
                        if (this.device !== undefined){
                            this.adapter = new USB(this.device);
                            //### device Open Connection
                            this.adapter?.open(async (error) => {
                                if (!error){
                                    this.printer = new Printer(this.adapter, merge(this.config?.settings));
                                    await this.printer
                                        .align("CT")
                                        .style("");
                                    //** get Functionable user command
                                    await printer(this.printer);
                                    //** Show Separator **/
                                    if (this.config?.settings?.showLibrary || this.config?.settings?.showNetwork || this.config?.settings?.showSystem){
                                        this.printer
                                            .feed(1)
                                            .text(`============================================`)
                                    }
                                    if (this.config?.settings?.showSystem){
                                        this.SystemInfo = {
                                            CPUUsage : `${Math.floor(CPUUsage().percent)} %`,
                                            totalMemory : Escpos.formatMemoryUsage(os.totalmem()),
                                            memoryUsed : Escpos.formatMemoryUsage(os.totalmem() - os.freemem()),
                                            os : `${os.platform()} ${os.arch()}`
                                        }

                                        this.printer.text(`System Information`);
                                        this.printer.text(`OS : ${this.SystemInfo.os}`)
                                        this.printer.text(`CPU Usage : ${this.SystemInfo.CPUUsage}`)
                                        this.printer.text(`memory : ${this.SystemInfo.memoryUsed} / ${this.SystemInfo.totalMemory}`)
                                        this.printer.text(`-------------------------------------------`)

                                    }
                                    /** show Network **/
                                    if (this.config?.settings?.showNetwork){
                                        this.printer.text(`Network Information`);
                                        let macAddress : string = "00:00:00:00:00:01"
                                        await macaddress.one()
                                            .then( (mMacAddress) => {
                                                macAddress = mMacAddress;
                                                macAddress = macAddress.replace("-",":");
                                                macAddress = macAddress.toUpperCase();

                                            })
                                            .catch(async (error) => {
                                                macAddress = "00:00:00:00:00:02";
                                            });
                                        this.printer.text(`${macAddress} - ${ip.address()}`)
                                        this.printer.text(`-------------------------------------------`)
                                    }
                                    /** show Banner Options **/
                                    if (this.config?.settings?.showLibrary){
                                        let PackagePath = path.join(__dirname,"./../../../../package.json");
                                        if (fs.existsSync(PackagePath)){
                                            let mPackage = require(PackagePath)
                                            this.printer
                                                .align("CT")
                                                .style("B")
                                                .size(0,0)
                                                .text(`${mPackage.name} - V.${mPackage.version}`)
                                                .style("I")
                                                .text(`${mPackage.author.name} - ${mPackage.author.email}`)
                                                .text(`${mPackage.author.url}`)
                                        }
                                    }
                                    if (this.config?.settings?.showLibrary || this.config?.settings?.showNetwork || this.config?.settings?.showSystem){
                                        this.printer
                                            .style(``)
                                            .text(`============================================`)
                                            .feed(2)
                                    }
                                    if (this.config?.settings?.autoCut){
                                        this.printer.cut();
                                    }
                                    if (this.config?.settings?.autoClose){
                                        await this.printer.close()
                                            .then(async () => {
                                                await resolve({ status : true, code : 200, msg : "successfully to print job"});
                                            })
                                            .catch(async (error) => {
                                                await rejected({ status : false, code : 505, msg : `error close print detected`, error : error})
                                            })
                                    } else{
                                        await resolve({ status : true, code : 200, msg : "successfully to print job"});
                                    }
                                }else{
                                    await rejected({ status : false, code : 500, msg : `failed to open connection printer device`, error : error})
                                }
                            })
                        }else{
                            await rejected({ status : false, code : 404, msg : `device find by vendor product printer not exist`})
                        }
                    }else{
                        await rejected({ status : false, code : 404, msg : `device printer not detected`})
                    }
                    break;
                case ESCPOS_NETWORK:
                    this.adapter.open(async (error) => {
                        if (!error){
                            this.printer = new Printer(this.adapter, merge(this.config?.settings));
                            await printer(this.printer);
                            if (this.config?.settings?.autoCut){
                                this.printer.cut();
                            }
                            if (this.config?.settings?.autoClose){
                                await this.printer.close()
                                    .then(async () => {
                                        await resolve({ status : true, code : 200, msg : "successfully to print job"});
                                    })
                                    .catch(async (error) => {
                                        await rejected({ status : false, code : 505, msg : `error close print detected`, error : error})
                                    })
                            }else{
                                await resolve({ status : true, code : 200, msg : "successfully to print job"});
                            }
                        }else{
                            await rejected({ status : false, code : 500, msg : `failed to open connection printer device`, error : error})
                        }
                    });
                    break;
            }
        });
    }
}

export default Escpos;