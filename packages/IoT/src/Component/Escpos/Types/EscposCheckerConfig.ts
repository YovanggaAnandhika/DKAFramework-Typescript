import {EscposConfig, EscposNetwork, EscposUSB} from "../Interfaces/EscposConfig";
import {ESCPOS_NETWORK, ESCPOS_USB} from "./EscposTypes";


export type EscposCheckerConfig<Config extends EscposConfig> =
    Config extends { engine : ESCPOS_USB } ? EscposUSB :
        Config extends { engine : ESCPOS_NETWORK } ? EscposNetwork :
            Config;
