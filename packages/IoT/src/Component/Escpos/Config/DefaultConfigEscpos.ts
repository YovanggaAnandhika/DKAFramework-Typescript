import {EscposNetwork, EscposUSB} from "../Interfaces/EscposConfig";
import {ESCPOS_NETWORK, ESCPOS_USB, TYPE_ESCPOS_NETWORK, TYPE_ESCPOS_USB} from "../Types/EscposTypes";
import {toUnicode} from "punycode";


export const DefaultConfigUSB : EscposUSB = {
    engine : TYPE_ESCPOS_USB,
    autoDetectUSB : true,
    vendorId : undefined,
    productId : undefined,
    settings : {
        encoding : "GB18030",
        autoClose : true,
        autoCut : true,
        autoReinitialize : false,
        showBanner : false
    }
}

export const DefaultConfigNetwork : EscposNetwork = {
    engine : TYPE_ESCPOS_NETWORK,
    port : "COM5",
    settings : {
        encoding : "GB18030",
        autoClose : true,
        autoCut : true,
        autoReinitialize : true,
        showBanner : false
    }
}