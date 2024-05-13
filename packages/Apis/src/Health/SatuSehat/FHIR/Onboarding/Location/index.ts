import SatuSehatHostType from "../../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../../Config";
import {SatuSehatFunctionClassParsing} from "../../../Interfaces/SatuSehatFunctionClassParsing";
import {SatuSehatCallbackProduction} from "../../../Interfaces/SatuSehatCallback.type";


export class LocationClasses {

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
        LocationClasses.finalConfig = options.config;
        LocationClasses.hostConfig = options.hostConfig;
        LocationClasses.credential = options.credential;
    }


}