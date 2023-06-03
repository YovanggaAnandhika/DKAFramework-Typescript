import {ESCPOS_NETWORK, ESCPOS_USB} from "../Types/EscposTypes";



export interface EscposPrinterSettings {
    encoding ?: string | undefined,
    autoClose ?: boolean | undefined,
    autoCut ?: boolean | undefined,
    autoReinitialize ?: boolean | undefined,
    showBanner ?: boolean | undefined
}

export interface EscposNetwork {
    engine ?: ESCPOS_NETWORK | undefined
    port ?: string | undefined,
    settings ?: EscposPrinterSettings | undefined
}

export interface EscposUSB {
    engine ?: ESCPOS_USB | undefined
    vendorId ?: number | undefined,
    productId ?: number | undefined,
    autoDetectUSB ?: boolean | undefined,
    settings ?: EscposPrinterSettings | undefined
}


export type EscposConfig = EscposUSB | EscposNetwork;