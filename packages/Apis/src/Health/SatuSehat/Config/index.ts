import {SatuSehatConstructorConfig} from "../Interfaces/SatuSehatConstructor.type";
import {SatuSehatConfigConstructorState} from "../Types/SatuSehatConfigConstructor";
import SatuSehatHostType from "../Interfaces/SatuSehatHost.type";


export const DefaultContructorConfig : SatuSehatConstructorConfig = {
    state : SatuSehatConfigConstructorState.STAGING,
    versionApi : 1,
    credentials : {
        auth : {
            clientId : "",
            clientSecret : ""
        }
    }
}