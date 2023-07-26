import {EscposNetwork, EscposUSB} from "../Interfaces/EscposConfig";
import {DEVELOPMENT, ESCPOS_NETWORK, ESCPOS_USB} from "../Types/EscposTypes";


export const DefaultConfigUSB : EscposUSB = {
    state : DEVELOPMENT,
    connection : ESCPOS_USB,
    autoDetectUSB : true,
    identify : undefined,
    settings : {
        encoding : "GB18030",
        autoClose : true,
        autoCut : true,
        autoClearJobPrevious : false,
        showLibrary : false,
        showSystem : false,
        showNetwork : false
    }
}

export const DefaultConfigNetwork : EscposNetwork = {
    state : DEVELOPMENT,
    connection : ESCPOS_NETWORK,
    port : "COM5",
    settings : {
        encoding : "GB18030",
        autoClose : true,
        autoCut : true,
        autoClearJobPrevious : false,
        showLibrary : false
    }
}