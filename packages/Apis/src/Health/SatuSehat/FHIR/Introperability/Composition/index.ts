import SatuSehatHostType from "../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../Config";
import {SatuSehatFunctionClassParsing} from "../../Interfaces/SatuSehatFunctionClassParsing";


export class CompositionClasses {

    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static token: string = "";

    /**
     *
     * @internal
     */
    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;

    constructor(options: SatuSehatFunctionClassParsing) {
        CompositionClasses.finalConfig = options.config;
        CompositionClasses.hostConfig = options.hostConfig;
        CompositionClasses.token = options.accessToken;
    }
}