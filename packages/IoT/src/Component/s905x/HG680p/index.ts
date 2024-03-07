import * as os from "os";
import * as fs from "fs";
import {exec, execSync} from "child_process";
import path from "path";


export class HG680p {

    private gpioPath = "/sys/class/gpio";
    private isLinux = false;
    private isGpioExist = false;

    constructor() {
        this.isLinux = (os.platform() === "linux");
        this.isGpioExist = (this.isLinux) ? (fs.existsSync(this.gpioPath)) : false;
    }

    lan(state : "on" | "off" | "dis" | "warn"){
        let pin_on= 510;
        let pin_off= 506;
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
        let pin_on= 425;
        let pin_off= 426;
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
}

export default HG680p;