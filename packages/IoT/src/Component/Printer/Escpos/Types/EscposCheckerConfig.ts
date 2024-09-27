import {EscposConfig, EscposNetwork, EscposSerial, EscposUSB} from "../Interfaces/EscposConfig";
import {TYPE_ESCPOS_NETWORK, TYPE_ESCPOS_SERIAL, TYPE_ESCPOS_USB} from "./EscposTypes";


export type EscposCheckerConfig<Config extends EscposConfig> =
    Config extends { engine : TYPE_ESCPOS_USB } ? EscposUSB :
        Config extends { engine : TYPE_ESCPOS_NETWORK } ? EscposNetwork :
            Config extends { engine : TYPE_ESCPOS_SERIAL } ? EscposSerial :
                Config;
