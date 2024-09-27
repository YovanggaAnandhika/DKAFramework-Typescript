import {EscposNetwork, EscposSerial, EscposUSB} from "../interfaces/EscposConfig";
import {DEVELOPMENT, ESCPOS_NETWORK, ESCPOS_SERIAL, ESCPOS_USB} from "../Types/EscposTypes";


export const DefaultConfigUSB : EscposUSB = {
    state : DEVELOPMENT,
    connection : ESCPOS_USB,
    autoDetectUSB : true,
    identify : undefined,
    settings : {
        encoding : "GB18030",
        host : "127.0.0.1",
        port : 5331
    }
}

export const DefaultConfigSerial : EscposSerial = {
    state : DEVELOPMENT,
    connection : ESCPOS_SERIAL,
    port : "COM5",
    settings : {
        encoding : "GB18030",
        host : "127.0.0.1",
        port : 5331
    }
}