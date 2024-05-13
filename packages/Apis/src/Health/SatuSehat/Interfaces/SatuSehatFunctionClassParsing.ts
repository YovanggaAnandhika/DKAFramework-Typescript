import {SatuSehatConstructorConfig} from "./SatuSehatConstructor.type";
import SatuSehatHostType from "./SatuSehatHost.type";
import {SatuSehatCallbackProduction} from "./SatuSehatCallback.type";

export interface SatuSehatFunctionClassParsing {
    config : SatuSehatConstructorConfig;
    credential : SatuSehatCallbackProduction;
    hostConfig ?: SatuSehatHostType;
}