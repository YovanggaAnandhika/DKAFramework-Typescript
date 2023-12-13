import {EscposNetwork, EscposSerial, EscposUSB} from "../Interfaces/EscposConfig";
import {DEVELOPMENT, ESCPOS_NETWORK, ESCPOS_SERIAL, ESCPOS_USB} from "../Types/EscposTypes";


export const DefaultConfigUSB : EscposUSB = {
    state : DEVELOPMENT,
    connection : ESCPOS_USB,
    autoDetectUSB : true,
    identify : undefined,
    settings : {
        encoding : "GB18030",
        autoClose : true,
        autoCut : true,
        showLibrary : false,
        showSystem : false,
        showNetwork : false
    }
}

export const DefaultConfigNetwork : EscposNetwork = {
    state : DEVELOPMENT,
    connection : ESCPOS_NETWORK,
    address : "127.0.0.1",
    port : 5022,
    timeout : 10000,
    settings : {
        encoding : "GB18030",
        autoClose : true,
        autoCut : true,
        autoClearJobPrevious : false,
        showLibrary : false
    }
}

export const DefaultConfigSerial : EscposSerial = {
    state : DEVELOPMENT,
    connection : ESCPOS_SERIAL,
    port : "COM5",
    settings : {
        encoding : "GB18030",
        autoClose : true,
        autoCut : true,
        autoClearJobPrevious : false,
        showLibrary : false
    }
}