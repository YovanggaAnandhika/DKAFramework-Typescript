import {SatuSehatFunctionClassParsing} from "../Interfaces/SatuSehatFunctionClassParsing";
import SatuSehatHostType from "../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../Config";
import {IntroperabilityClasses} from "./Introperability";
import {OnboardingClasses} from "./Onboarding";


export class FHIR {

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
        FHIR.finalConfig = options.config;
        FHIR.hostConfig = options.hostConfig;
        FHIR.token = options.accessToken;
    }

    Onboarding () : OnboardingClasses {
        return new OnboardingClasses({config: FHIR.finalConfig, accessToken: FHIR.token, hostConfig: FHIR.hostConfig});
    }
    /**
     *
     * @constructor
     * @desc
     * Data klasifikasi diet dari pasien yang bersangkutan akan dipetakan dengan menggunakan standar FHIR DomainResource dengan tipe Composition.
     */
    Introperability () : IntroperabilityClasses {
        return new IntroperabilityClasses({config: FHIR.finalConfig, accessToken: FHIR.token, hostConfig: FHIR.hostConfig});
    }

}