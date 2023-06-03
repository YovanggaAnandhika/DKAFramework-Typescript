import {ArduinoConfig, ArduinoConfigSerial, ArduinoConfigWifi} from "../Interfaces/ArduinoConfigInterfaces";
import {ARDUINO_TYPE_SERIAL, ARDUINO_TYPE_WIFI} from "./ArduinoTypes";


export type ArduinoCheckerConfig<Config extends ArduinoConfig> = Config extends { type : ARDUINO_TYPE_WIFI } ?
    ArduinoConfigWifi :  Config extends { type : ARDUINO_TYPE_SERIAL } ?
        ArduinoConfigSerial : ArduinoConfig;