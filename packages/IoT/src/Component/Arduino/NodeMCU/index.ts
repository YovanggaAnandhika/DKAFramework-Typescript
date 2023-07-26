import five, { Board, Led } from "johnny-five";
import { usb } from "usb";
import {NodeMCUConfig, NodeMCULedMethod} from "./Interfaces/NodeMCUConfig";
import Firmata from "firmata";
import SerialPort from "serialport";

class NodeMCU {

    private board : Firmata | undefined = undefined;
    private sp : SerialPort | undefined = undefined;
    private led : { [pin : string] : Led } = {};
    private config : NodeMCUConfig | undefined = undefined;

    constructor(config ?: NodeMCUConfig) {
        this.config = config;

        this.sp = new SerialPort(config.port);

        this.board = new Firmata(this.sp);
        this.board.on("ready", async () => {
            console.log("ready")
        })
    }

    Led(LEDOptions : NodeMCULedMethod) : Promise<void>{
        /** Led Declaration initialization **/
        return new Promise(async (resolve, rejected) => {
            this.board = new Firmata(this.sp, async (error) => {
                console.log(error)
                switch (LEDOptions.mode) {
                    case "LED_MODE_NORMAL":
                        console.log("ready")
                        break;
                }
            });
        })

    }


}

export default NodeMCU;