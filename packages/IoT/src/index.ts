import {Arduino} from "./Component/Arduino";
import {ArduinoTypes} from "./Component/Arduino/Types/ArduinoTypes";
import IOTConfigGlobal from "./Options/IOTConfigGlobal";
import {Escpos} from "./Component/Escpos";


export const IoT = {
    Arduino : Arduino,
    Escpos : Escpos,
    Options : IOTConfigGlobal
}


export { Arduino, Escpos, IOTConfigGlobal as Options };

export default IoT;