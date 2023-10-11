import {JWEOptions, JWKOptions, JWTConfig, SecurityConfigJWTEngineOptions} from "../Interfaces/SecurityConfig";
import path from "path";

export const SecurityDefaultConfigJWEEncryptOptionsJWK : JWKOptions = {
    form : "pem"
}

export const SecurityDefaultConfigJWEOptionsJWE : JWEOptions = {
    format : "compact",
    contentAlg : "A256GCM",
    fields : {
        "alg": "RSA-OAEP"
    }
}

export const SecurityDefaultConfigJWEEncryptOptions : SecurityConfigJWTEngineOptions = {
    JWK : SecurityDefaultConfigJWEEncryptOptionsJWK,
    JWE : SecurityDefaultConfigJWEOptionsJWE
}


export const SecurityDefaultConfigJWEDecryptOptionsJWK : JWKOptions = {
    form : "pem",
}

export const SecurityDefaultConfigJWEDecryptOptions : SecurityConfigJWTEngineOptions = {
    JWK : SecurityDefaultConfigJWEDecryptOptionsJWK,
    JWE : SecurityDefaultConfigJWEOptionsJWE
}

export const SecurityDefaultConfigJWTConstructor : JWTConfig = {
    keyPair : {
        modulusLength : 4096,
        privateKeyEncoding : {
            type : "pkcs8",
            format : "pem"
        },
        publicKeyEncoding : {
            type : "spki",
            format : "pem"
        }
    }
}

