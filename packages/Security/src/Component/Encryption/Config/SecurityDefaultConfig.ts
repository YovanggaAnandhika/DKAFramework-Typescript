import {
    JWEOptions,
    JWKOptions, SecurityConfigJWTEngineOptions
} from "../Interfaces/SecurityConfig";
import path from "path";

export const SecurityDefaultConfigJWEEncryptOptionsJWK : JWKOptions = {
    key : path.join(__dirname, "./../Cert/Server/public.key"),
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
    key : path.join(__dirname, "./../Cert/Server/public.key"),
    form : "pem"
}

export const SecurityDefaultConfigJWEDecryptOptions : SecurityConfigJWTEngineOptions = {
    JWK : SecurityDefaultConfigJWEDecryptOptionsJWK,
    JWE : SecurityDefaultConfigJWEOptionsJWE
}

