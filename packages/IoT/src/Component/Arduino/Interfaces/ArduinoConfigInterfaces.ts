import {ARDUINO_TYPE_SERIAL, ARDUINO_TYPE_WIFI, ArduinoTypes} from "../Types/ArduinoTypes";
import Five, {Board} from "johnny-five";



export interface ArduinoConfigDeviceBoard {
    onReady ?: (device : typeof Five) => void,
    onError ?: (error : Error) => void,
    onClose ?: () => void,
    onExit ?: () => void
}
export interface ArduinoConfigDevice {
    board ?: ArduinoConfigDeviceBoard | undefined
}
export interface ArduinoConfigWifi {
    type : ARDUINO_TYPE_WIFI | undefined,
    debug ?: boolean | undefined,
    repl ?: boolean | undefined,
    timeout ?: number | undefined,
    fork ?: boolean | undefined,
    host ?: string | undefined,
    port ?: number | undefined,
    device ?: ArduinoConfigDevice | undefined
}

export interface ArduinoConfigSerial {
    type : ARDUINO_TYPE_SERIAL | undefined,
    debug ?: boolean | undefined,
    repl ?: boolean | undefined,
    timeout ?: number | undefined,
    path ?: string | undefined,
    fork ?: boolean | undefined,
    baudRate ?: number | undefined,
    device ?: ArduinoConfigDevice | undefined
}
export type ArduinoConfig = ArduinoConfigWifi | ArduinoConfigSerial;