import SatuSehatHostType from "../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../Interfaces/SatuSehatCallback.type";


export class ConditionClasses {

    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static credential : SatuSehatCallbackProduction;

    /**
     *
     * @internal
     */
    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;

    constructor(options: SatuSehatFunctionClassParsing) {
        ConditionClasses.finalConfig = options.config;
        ConditionClasses.hostConfig = options.hostConfig;
        ConditionClasses.credential = options.credential;
    }
}