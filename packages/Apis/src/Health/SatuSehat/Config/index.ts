import {SatuSehatConstructorConfig} from "../Interfaces/SatuSehatConstructor.type";
import {SatuSehatConfigConstructorState} from "../Types/SatuSehatConfigConstructor";
import SatuSehatHostType from "../Interfaces/SatuSehatHost.type";


export const DefaultContructorConfig : SatuSehatConstructorConfig = {
    state : SatuSehatConfigConstructorState.STAGING,
    credentials : {
        auth : {
            clientId : "",
            clientSecret : ""
        }
    }
}

export const DefaultHostSatuSehat : SatuSehatHostType = {
    auth : "https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1",
    resources : "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1"
}