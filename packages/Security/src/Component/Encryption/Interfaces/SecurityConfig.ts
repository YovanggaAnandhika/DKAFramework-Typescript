import {JWE} from "node-jose";


export interface JWKOptions {
    key ?: string
    form?: 'json' | 'private' | 'pkcs8' | 'public' | 'spki' | 'pkix' | 'x509' | 'pem',
    extras?: Record<string, unknown>
}

export type JWEOptions = JWE.EncryptOptions;

export interface SecurityConfigJWTEngineOptions {
    JWK ?: JWKOptions,
    JWE ?: JWEOptions
}





