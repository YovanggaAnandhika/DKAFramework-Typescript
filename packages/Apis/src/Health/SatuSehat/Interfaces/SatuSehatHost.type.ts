import {SatuSehatConfigConstructorState} from "../Types/SatuSehatConfigConstructor";

export interface SatuSehatHostTypeResource {
    fhir : {
        [ name : number ] : string
    };
    masterData : {
        [ name : number ] : string
    };
}

export interface SatuSehatHostTypeAuth {
    [ name : number ] : string
}

export interface SatuSehatHostType {
    auth : SatuSehatHostTypeAuth;
    resources : SatuSehatHostTypeResource;
}

export default SatuSehatHostType;