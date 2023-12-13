import {TYPE_ALL_STATES, TYPE_ESCPOS_NETWORK, TYPE_ESCPOS_SERIAL, TYPE_ESCPOS_USB} from "../Types/EscposTypes";


export interface EscposPrinterSettingsNetwork {
    encoding ?: string | undefined,
    autoClose ?: boolean | undefined,
    autoCut ?: boolean | undefined,
    autoClearJobPrevious ?: boolean | undefined,
    showLibrary ?: boolean | undefined,
    showSystem ?: boolean | undefined
    showNetwork ?: boolean | undefined
}

export interface EscposPrinterSettingsSerial {
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

export interface EscposPrinterSettingsServer {
    port : number,
    host : string,
    onListening ?: () => void | Promise<void> | undefined,
    onError ?: (error ?: Error | undefined) => void | Promise<void> | undefined,
    onClose ?: (error ?: Error | undefined) => void | Promise<void> | undefined,
}

export interface EscposNetwork {
    state ?: TYPE_ALL_STATES,
    connection ?: TYPE_ESCPOS_NETWORK | undefined,
    address ?: string | undefined
    port ?: number | undefined,
    timeout ?: number | undefined
    settings ?: EscposPrinterSettingsNetwork | undefined
}

export interface EscposSerial {
    state ?: TYPE_ALL_STATES,
    connection ?: TYPE_ESCPOS_SERIAL | undefined
    port ?: string | undefined,
    settings ?: EscposPrinterSettingsSerial | undefined
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


export type EscposConfig = EscposUSB | EscposNetwork | EscposSerial;