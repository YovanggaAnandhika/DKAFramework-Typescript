import {ARDUINO_TYPE_SERIAL, ARDUINO_TYPE_WIFI} from "../Component/Arduino/Types/ArduinoTypes";
import {ESCPOS_USB, TYPE_ESCPOS_NETWORK, TYPE_ESCPOS_USB} from "../Component/Escpos/Types/EscposTypes";


export const IOTConfigGlobal = {
    ARDUINO : {
        ARDUINO_TYPE_WIFI : ARDUINO_TYPE_WIFI,
        ARDUINO_TYPE_SERIAL : ARDUINO_TYPE_SERIAL,
    },
    ESCPOS : {
        ESCPOS_USB : TYPE_ESCPOS_USB,
        ESCPOS_NETWORK : TYPE_ESCPOS_NETWORK
    }
}

export default IOTConfigGlobal;