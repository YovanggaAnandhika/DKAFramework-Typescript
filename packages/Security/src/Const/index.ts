import {
    ALGORITHM_AES_128_GCM,
    ALGORITHM_AES_192_GCM,
    ALGORITHM_AES_256_GCM, ENCRYPT_STYLE_BASE64, ENCRYPT_STYLE_BINARY, ENCRYPT_STYLE_HEX, ENCRYPT_STYLE_NORMAL,
    ENCRYPT_STYLE_SYMBOL
} from "../Interfaces/Types";
import {ConfigConstructor} from "../Interfaces/Config";


export const AES_256_GCM : ALGORITHM_AES_256_GCM = 'aes-256-gcm';
export const AES_192_GCM : ALGORITHM_AES_192_GCM = 'aes-192-gcm';
export const AES_128_GCM : ALGORITHM_AES_128_GCM = 'aes-128-gcm';

export const ENCRYPTION_STYLE_NORMAL : ENCRYPT_STYLE_NORMAL = "NORMAL";
export const ENCRYPTION_STYLE_SYMBOL : ENCRYPT_STYLE_SYMBOL = "SYMBOL";
export const ENCRYPTION_STYLE_BASE64 : ENCRYPT_STYLE_BASE64 = "BASE64";
export const ENCRYPTION_STYLE_HEX : ENCRYPT_STYLE_HEX = "HEX";
export const ENCRYPTION_STYLE_BINARY : ENCRYPT_STYLE_BINARY = "BINARY";

export const DEFAULT_CONFIG_CONSTRUCTOR : ConfigConstructor = {
    algorithm : "aes-256-gcm",
    encryptStyle : ENCRYPTION_STYLE_SYMBOL,
    secretKey : "Cyberhack2010",
    keyLength : 10
}