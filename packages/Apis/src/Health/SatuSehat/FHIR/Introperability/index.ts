


import {SatuSehatFunctionClassParsing} from "../../Interfaces/SatuSehatFunctionClassParsing";
import SatuSehatHostType from "../../Interfaces/SatuSehatHost.type";
import {SatuSehatConstructorConfig} from "../../Interfaces/SatuSehatConstructor.type";
import {DefaultContructorConfig} from "../../Config";
import {MedicationClasses} from "./Medication";
import {ObservationClasses} from "./Observation";
import {CompositionClasses} from "./Composition";
import {ConditionClasses} from "./Condition";
import EncounterClassses from "./Encounter";


export class IntroperabilityClasses {

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
        IntroperabilityClasses.finalConfig = options.config;
        IntroperabilityClasses.hostConfig = options.hostConfig;
        IntroperabilityClasses.token = options.accessToken;
    }

    /**
     *
     * @constructor
     * @desc
     * Data klasifikasi diet dari pasien yang bersangkutan akan dipetakan dengan menggunakan standar IntroperabilityClasses DomainResource dengan tipe Composition.
     */
    Composition () : CompositionClasses {
        return new CompositionClasses({config: IntroperabilityClasses.finalConfig, accessToken: IntroperabilityClasses.token, hostConfig: IntroperabilityClasses.hostConfig});
    }

    /**
     *
     * @constructor
     * @desc
     * Data diagnosis pasien dapat dikirimkan menggunakan resource Condition.
     * Informasi diagnosis yang dimiliki pasien dilaporkan menggunakan kode ICD-10. Satu payload Condition hanya dapat digunakan untuk melaporkan 1 kode ICD-10.
     * Sehingga apabila pasien memiliki 2 diagnosis, maka dikirimkan 2 payload Condition dengan 2 kode ICD-10 yang berbeda.
     */
    Condition () : ConditionClasses {
        return new ConditionClasses({config: IntroperabilityClasses.finalConfig, accessToken: IntroperabilityClasses.token, hostConfig: IntroperabilityClasses.hostConfig});
    }

    /**
     *
     * @constructor
     * @desc
     * Kunjungan pasien dapat didefinisikan sebagai interaksi pasien terhadap suatu layanan Fasyankes. Sebagai contoh, dalam satu rangkaian rawat jalan, seluruh rangkaian dapat didefinisikan sebagai satu “Encounter”. Data-data kunjungan pasien yang direkam meliputi kapan pertemuan tersebut mulai dan selesai, siapa tenaga kesehatan yang melayani, siapa subjek dari pelayanannya, dan informasi pendukung lainnya.
     */
    Encounter () : EncounterClassses {
        return new EncounterClassses({config: IntroperabilityClasses.finalConfig, accessToken: IntroperabilityClasses.token, hostConfig: IntroperabilityClasses.hostConfig});
    }
    Medication () : MedicationClasses {
        return new MedicationClasses({config: IntroperabilityClasses.finalConfig, accessToken: IntroperabilityClasses.token, hostConfig: IntroperabilityClasses.hostConfig});
    }

    Observation () : ObservationClasses {
        return new ObservationClasses({config: IntroperabilityClasses.finalConfig, accessToken: IntroperabilityClasses.token, hostConfig: IntroperabilityClasses.hostConfig});
    }
}