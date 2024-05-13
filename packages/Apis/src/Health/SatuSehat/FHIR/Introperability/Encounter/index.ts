import {SatuSehatConstructorConfig} from "../../../Interfaces/SatuSehatConstructor.type";
import {SatuSehatFunctionClassParsing} from "../../../Interfaces/SatuSehatFunctionClassParsing";
import {DefaultContructorConfig} from "../../../Config";
import SatuSehatHostType from "../../../Interfaces/SatuSehatHost.type";
import axios from "axios";
import {SatuSehatFHIREncounterCreateRequest} from "./Interfaces/SatuSehatFHIREncounterCreateResponse";
import {SatuSehatFHIREncounterCreateModel} from "./Model/SatuSehatFHIREncounterCreateModel";
import {SatuSehatCallbackProduction} from "../../../Interfaces/SatuSehatCallback.type";


export class EncounterClassses {

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
        EncounterClassses.finalConfig = options.config;
        EncounterClassses.hostConfig = options.hostConfig;
        EncounterClassses.credential = options.credential;
    }

    Add(query: SatuSehatFHIREncounterCreateModel) : Promise<any> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (EncounterClassses.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            axios<SatuSehatFHIREncounterCreateRequest>({
                url: `${EncounterClassses.hostConfig.resources.fhir[EncounterClassses.finalConfig.state]}/Encounter`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${EncounterClassses.credential.access_token}`,
                    "Content-Type": "application/json",
                    "Cache-Control" : "no-cache",
                },
                data: query,
            }).then(async (response) => {
                resolve({
                    status: true,
                    code: 200,
                    msg: `Data FHIR Encounter Berhasil Ditembahkan`,
                    data: response.data.data
                })

            }).catch((error) => {
                rejected({
                    ...error
                });
            });
        });
    }
}

export default EncounterClassses;