import {JWE} from "node-jose";
import {GenerateKeys, KeyPairsData} from "../../../SSL/Types/GeneralCertOptionsMethod";


export interface JWKOptions {
    key ?: string;
    form?: 'json' | 'private' | 'pkcs8' | 'public' | 'spki' | 'pkix' | 'x509' | 'pem',
    passphrase ?: string
    extras?: Record<string, unknown>
}

export type JWEOptions = JWE.EncryptOptions;

export interface SecurityConfigJWTEngineOptions {
    JWK ?: JWKOptions,
    JWE ?: JWEOptions
}


export interface JWTConfig {
    keyPair ?: GenerateKeys
}




