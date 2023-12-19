import {
    ESCPOS_ENGINE,
    TYPE_ALL_STATES,
    TYPE_ESCPOS_NETWORK,
    TYPE_ESCPOS_SERIAL,
    TYPE_ESCPOS_USB
} from "../Types/EscposTypes";
import {TDevice} from "@node-escpos/usb-adapter";
import {DEVELOPMENT, PRODUCTION} from "../../../Types/ConfigServerTypes";


export interface EscposPrinterSettingsNetwork {
    encoding ?: string | undefined,
    autoClose ?: boolean | undefined,
    autoCut ?: boolean | undefined,
    autoClearJobPrevious ?: boolean | undefined,
    showLibrary ?: boolean | undefined,
    showSystem ?: boolean | undefined
    showNetwork ?: boolean | undefined
}

export interface EscposPrinterSettingsSerial extends EscposPrinterSettingGlobal {
    encoding ?: string | undefined
}

export interface EscposPrinterSettingGlobal {
    host : string | undefined
    port : number | undefined,
}

export interface EscposPrinterSettingsUSB extends EscposPrinterSettingGlobal {
    encoding ?: string | undefined

}

export interface EscposPrinterSettingsServer {
    port : number,
    host : string,
    onListening ?: (result ?: any) => void | Promise<void> | undefined,
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
    engine ?: ESCPOS_ENGINE | undefined,
    connection ?: TYPE_ESCPOS_SERIAL | undefined
    port ?: string | undefined,
    settings ?: EscposPrinterSettingsSerial | undefined
}


export interface EscposUSBIdentifyVendorProduct {
    vendorId : number,
    productId : number,
}

export interface EscposUSBIdentifySerial {
    serialNumber : string
}

export interface EscposUSBEvents {
    USB ?: EscposUSBEventsUSB | undefined,
    Server ?: EscposUSBEventsServer | undefined
}
export interface EscposUSBEventsUSB {
    onAttach ?: (device ?: TDevice | undefined) => void | Promise<void> | undefined,
    onDetach ?: (device ?: TDevice | undefined) => void | Promise<void> | undefined;
    onError ?: (error ?: Error | undefined) => void | Promise<void> | undefined;
}

export interface EscposUSBEventsServer {
    onListening ?: () => void | Promise<void> | undefined
    onClose ?: () => void | Promise<void> | undefined
    onError ?: (error ?: Error | undefined) => void | Promise<void> | undefined
}

export interface EscposUSB {
    state ?: DEVELOPMENT | PRODUCTION
    engine ?: ESCPOS_ENGINE | undefined,
    connection ?: TYPE_ESCPOS_USB | undefined
    identify ?: EscposUSBIdentifyVendorProduct | EscposUSBIdentifySerial | undefined,
    autoDetectUSB ?: boolean | undefined,
    Events ?: EscposUSBEvents | undefined
    settings ?: EscposPrinterSettingsUSB | undefined
}


export type EscposConfig = EscposUSB | EscposSerial;