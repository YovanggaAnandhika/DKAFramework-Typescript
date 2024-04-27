import {SatuSehatConfigConstructorState} from "../Types/SatuSehatConfigConstructor";


export interface SatuSehatConstructorConfigCredentialAuth {
    clientId ?: string,
    clientSecret ?: string
}

export interface SatuSehatConstructorConfigCredential {
    auth ?: SatuSehatConstructorConfigCredentialAuth
}
export interface SatuSehatConstructorConfig {
    state : SatuSehatConfigConstructorState;
    versionApi ?: number;
    credentials ?: SatuSehatConstructorConfigCredential
}