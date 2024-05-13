import {SatuSehatFunctionClassParsing} from "../Interfaces/SatuSehatFunctionClassParsing";
import SatuSehatHostType from "../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../Config";
import {IntroperabilityClasses} from "./Introperability";
import {OnboardingClasses} from "./Onboarding";
import {SatuSehatCallbackProduction} from "../Interfaces/SatuSehatCallback.type";


export class FHIR {

    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static credential : SatuSehatCallbackProduction

    /**
     *
     * @internal
     */
    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;
    constructor(options : SatuSehatFunctionClassParsing) {
        FHIR.finalConfig = options.config;
        FHIR.hostConfig = options.hostConfig;
        FHIR.credential = options.credential;
    }

    /**
     *
     * @constructor
     * @desc
     * Semua resource dari ReST API yang akan dijelaskan di bagian ini, adalah inti dari semua transaksi data yang akan dilakukan pada bagian integrasi nanti, ke atau dari ekosistem SATUSEHAT. Dalam proses orientasi (onboarding) ini, resource yang harus tersedia datanya adalah: Patient, Practicioner, Organization, dan Location.
     */

    Onboarding () : OnboardingClasses {
        return new OnboardingClasses({config: FHIR.finalConfig, credential: FHIR.credential, hostConfig: FHIR.hostConfig});
    }
    /**
     *
     * @constructor
     * @desc
     * Data klasifikasi diet dari pasien yang bersangkutan akan dipetakan dengan menggunakan standar FHIR DomainResource dengan tipe Composition.
     */
    Introperability () : IntroperabilityClasses {
        return new IntroperabilityClasses({config: FHIR.finalConfig, credential: FHIR.credential, hostConfig: FHIR.hostConfig});
    }

}