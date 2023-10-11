import {SecurityConfigJWTEngineOptions} from "../../JWT/Interfaces/SecurityConfig";


export interface SecurityConfigEncryptionFile extends SecurityConfigJWTEngineOptions {
    saveToFile ?: boolean,
    ext ?: "dka"
}

export interface SecurityConfigDecryptionFile extends SecurityConfigJWTEngineOptions {

}