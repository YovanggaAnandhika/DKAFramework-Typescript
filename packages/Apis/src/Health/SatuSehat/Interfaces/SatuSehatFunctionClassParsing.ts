import {SatuSehatConstructorConfig} from "./SatuSehatConstructor.type";
import SatuSehatHostType from "./SatuSehatHost.type";

export interface SatuSehatFunctionClassParsing {
    config : SatuSehatConstructorConfig;
    accessToken : string;
    hostConfig ?: SatuSehatHostType;
}