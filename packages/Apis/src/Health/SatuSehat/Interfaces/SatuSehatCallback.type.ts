import {SatuSehatConstructorConfig} from "./SatuSehatConstructor.type";
import {SatuSehatConfigConstructorState} from "../Types/SatuSehatConfigConstructor";


export interface SatuSehatCallbackProduction {
    refresh_token_expires_in ?: string,
    api_product_list ?: string,
    api_product_list_json ?: Array<string>,
    organization_name ?: string,
    "developer.email" ?: string,
    token_type ?: string,
    issued_at ?: string,
    client_id ?: string,
    access_token ?: string,
    application_name ?: string,
    scope ?: string,
    expires_in ?: string,
    refresh_count ?: string,
    status ?: string
}



export interface SatuSehatCallbackDevelopment {
    client_id ?: string,
    client_secret ?: string
}


export type SatuSehatCallbackChecker<Config = SatuSehatConstructorConfig> = Config extends { state : SatuSehatConfigConstructorState.PRODUCTION } ? SatuSehatCallbackProduction : SatuSehatCallbackDevelopment;

