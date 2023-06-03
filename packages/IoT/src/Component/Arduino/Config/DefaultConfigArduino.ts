import {ArduinoConfig} from "../Interfaces/ArduinoConfigInterfaces";
import {ARDUINO_TYPE_SERIAL, ARDUINO_TYPE_WIFI} from "../Types/ArduinoTypes";


export const DefaultConfigMCUWifi : ArduinoConfig = {
    type : ARDUINO_TYPE_WIFI,
    host : "192.168.1.1",
    debug : false,
    repl : false,
    fork : false,
    timeout : 1e5,
    port : 3030
}

export const DefaultConfigMCUSerial : ArduinoConfig = {
    type : ARDUINO_TYPE_SERIAL,
    path : "COM5",
    debug : false,
    repl : false,
    timeout : 1e5,
    fork : true,
    baudRate : 57600
}