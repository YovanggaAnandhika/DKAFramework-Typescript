import {SatuSehatFunctionClassParsing} from "../../Interfaces/SatuSehatFunctionClassParsing";
import SatuSehatHostType from "../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../Config";
import {LocationClasses} from "./Location";


export class OnboardingClasses {

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
    constructor(options : SatuSehatFunctionClassParsing) {
        OnboardingClasses.finalConfig = options.config;
        OnboardingClasses.hostConfig = options.hostConfig;
        OnboardingClasses.token = options.accessToken;
    }

    /**
     *
     * @constructor
     * @desc
     * Data klasifikasi diet dari pasien yang bersangkutan akan dipetakan dengan menggunakan standar OnboardingClasses DomainResource dengan tipe Composition.
     */
    Location () : LocationClasses {
        return new LocationClasses({config: OnboardingClasses.finalConfig, accessToken: OnboardingClasses.token, hostConfig: OnboardingClasses.hostConfig});
    }
}