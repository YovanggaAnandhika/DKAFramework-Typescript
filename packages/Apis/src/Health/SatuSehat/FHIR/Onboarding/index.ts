import {SatuSehatFunctionClassParsing} from "../../Interfaces/SatuSehatFunctionClassParsing";
import SatuSehatHostType from "../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../Config";
import {LocationClasses} from "./Location";
import {SatuSehatCallbackProduction} from "../../Interfaces/SatuSehatCallback.type";
import {OrganizationClasses} from "./Organization";


export class OnboardingClasses {

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
    constructor(options : SatuSehatFunctionClassParsing) {
        OnboardingClasses.finalConfig = options.config;
        OnboardingClasses.hostConfig = options.hostConfig;
        OnboardingClasses.credential = options.credential;
    }

    /**
     *
     * @constructor
     * @desc
     * Data klasifikasi diet dari pasien yang bersangkutan akan dipetakan dengan menggunakan standar OnboardingClasses DomainResource dengan tipe Composition.
     */
    Location () : LocationClasses {
        return new LocationClasses({config: OnboardingClasses.finalConfig, credential: OnboardingClasses.credential, hostConfig: OnboardingClasses.hostConfig});
    }

    Organization () : OrganizationClasses {
        return new OrganizationClasses({config: OnboardingClasses.finalConfig, credential: OnboardingClasses.credential, hostConfig: OnboardingClasses.hostConfig});
    }
}