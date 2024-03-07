import * as os from "os";
import * as fs from "fs";
import {exec, execSync} from "child_process";
import path from "path";


export class HG680p {

    private gpioPath = "/sys/class/gpio";
    private isLinux = false;
    private versionDevice : "v1" | "v2" = "v2"
    private isGpioExist = false;

    constructor(version : "v1" | "v2" = "v2") {
        this.versionDevice = version;
        this.isLinux = (os.platform() === "linux");
        this.isGpioExist = (this.isLinux) ? (fs.existsSync(this.gpioPath)) : false;
    }

    lan(state : "on" | "off" | "dis" | "warn"){

        let pin_on= (this.versionDevice === "v2") ? 510 : 482;
        let pin_off= (this.versionDevice === "v2") ? 506 : 481;
        //######################################################################
        if (!this.isLinux)
            throw new Error("platform not linux");
        if (!this.isGpioExist)
            throw new Error("system not support gpio");
        //######################################################################
        try {
            if (!fs.existsSync(`${path.join(this.gpioPath,`gpio${pin_on}`)}`)) {
                execSync(`echo ${pin_on} > ${this.gpioPath}/export`);
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_on}`,`/direction`)}`);
            }else{
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_on}`,`/direction`)}`);
            }
            if (!fs.existsSync(`${path.join(this.gpioPath,`gpio${pin_off}`)}`)){
                execSync(`echo ${pin_off} > ${this.gpioPath}/export`);
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_off}`,`/direction`)}`);
            }else{
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_off}`,`/direction`)}`);
            }
            //######################################################################
            switch (state) {
                case "on" :
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    break;
                case "off" :
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    break;
                case "warn" :
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    break;
                case "dis" :
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    break;
            }
        }catch (e){}
    }

    power(state : "on" | "off" | "dis" | "warn"){
        //######################################################################
        let pin_on= (this.versionDevice === "v2") ? 425 : 483;
        let pin_off= (this.versionDevice === "v2") ? 426 : 484;
        //######################################################################
        if (!this.isLinux)
            throw new Error("platform not linux");
        if (!this.isGpioExist)
            throw new Error("system not support gpio");
        //######################################################################
        try {
            if (!fs.existsSync(`${path.join(this.gpioPath,`gpio${pin_on}`)}`)) {
                execSync(`echo ${pin_on} > ${this.gpioPath}/export`);
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_on}`,`/direction`)}`);
            }else{
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_on}`,`/direction`)}`);
            }
            if (!fs.existsSync(`${path.join(this.gpioPath,`gpio${pin_off}`)}`)){
                execSync(`echo ${pin_off} > ${this.gpioPath}/export`);
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_off}`,`/direction`)}`);
            }else{
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin_off}`,`/direction`)}`);
            }
            //######################################################################
            switch (state) {
                case "on" :
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    break;
                case "off" :
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    break;
                case "warn" :
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    break;
                case "dis" :
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_on}`,`/value`)}" `)
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin_off}`,`/value`)}" `)
                    break;
            }
        }catch (e) {}
    }

    ir(state : "on" | "off"){
        let pin= (this.versionDevice === "v2") ? 507 : 480;
        //######################################################################
        if (!this.isLinux)
            throw new Error("platform not linux");
        if (!this.isGpioExist)
            throw new Error("system not support gpio");
        //######################################################################
        try {
            if (!fs.existsSync(`${path.join(this.gpioPath,`gpio${pin}`)}`)) {
                execSync(`echo ${pin} > ${this.gpioPath}/export`);
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin}`,`/direction`)}`);
            }else{
                execSync(`echo out > ${path.join(this.gpioPath,`/gpio${pin}`,`/direction`)}`);
            }
            //######################################################################
            switch (state) {
                case "on" :
                    execSync(`echo 1 > "${path.join(this.gpioPath,`/gpio${pin}`,`/value`)}" `)
                    break;
                case "off" :
                    execSync(`echo 0 > "${path.join(this.gpioPath,`/gpio${pin}`,`/value`)}" `)
                    break;
            }
        }catch (e) {}
    }
}

export default HG680p;