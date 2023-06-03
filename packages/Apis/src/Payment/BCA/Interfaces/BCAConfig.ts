import {DEVELOPMENT} from "../Types/BCAApisTypes";


export interface BCAApisConfigCredential {
    clientSecret ?: string,
    clientId ?: string
}


export interface BCAApisConfig {
    state ?: DEVELOPMENT,
    credential ?: BCAApisConfigCredential
}


export interface RawRequestOpenApiConfigCredential {
    apiKey ?: string
}
export interface RawRequestOpenApiConfig {
    token : BCATokenAccess,
    method : "POST" | "GET" | "PUT" | "DELETE" | "HEAD",
    path : string,
    timestamp : string,
    data : object,
    contentType : string,
    credential : RawRequestOpenApiConfigCredential,
    origin : string
}

export interface BCATokenAccess {
    accessToken ?: string,
    tokenType ?: string,
    expiresIn ?: number,
    scope ?: Array<string>
}