import {TYPE_ALL_STATES, TYPE_ESCPOS_NETWORK, TYPE_ESCPOS_USB} from "../Types/EscposTypes";


export interface EscposPrinterSettingsNetwork {
    encoding ?: string | undefined,
    autoClose ?: boolean | undefined,
    autoCut ?: boolean | undefined,
    autoClearJobPrevious ?: boolean | undefined,
    showLibrary ?: boolean | undefined,
    showSystem ?: boolean | undefined
    showNetwork ?: boolean | undefined
}

export interface EscposPrinterSettingsUSB {
    encoding ?: string | undefined,
    autoClose ?: boolean | undefined,
    autoCut ?: boolean | undefined,
    showLibrary ?: boolean | undefined,
    showSystem ?: boolean | undefined
    showNetwork ?: boolean | undefined

}

export interface EscposNetwork {
    state ?: TYPE_ALL_STATES,
    connection ?: TYPE_ESCPOS_NETWORK | undefined
    port ?: string | undefined,
    settings ?: EscposPrinterSettingsNetwork | undefined
}


export interface EscposUSBIdentifyVendorProduct {
    vendorId ?: number | undefined,
    productId ?: number | undefined,
}
export interface EscposUSB {
    state ?: TYPE_ALL_STATES,
    connection ?: TYPE_ESCPOS_USB | undefined
    identify ?: EscposUSBIdentifyVendorProduct,
    autoDetectUSB ?: boolean | undefined,
    settings ?: EscposPrinterSettingsUSB | undefined
}


export type EscposConfig = EscposUSB | EscposNetwork;