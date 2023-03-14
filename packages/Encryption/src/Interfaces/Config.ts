import {
    ALGORITHM_AES_128_GCM,
    ALGORITHM_AES_192_GCM,
    ALGORITHM_AES_256_GCM,
    ENCRYPT_STYLE_BASE64, ENCRYPT_STYLE_BINARY, ENCRYPT_STYLE_HEX, ENCRYPT_STYLE_NORMAL,
    ENCRYPT_STYLE_SYMBOL
} from "./Types";

export type ConfigConstructorAlgoritm = ALGORITHM_AES_128_GCM | ALGORITHM_AES_192_GCM | ALGORITHM_AES_256_GCM;
export type EncryptStyle = ENCRYPT_STYLE_NORMAL | ENCRYPT_STYLE_BINARY | ENCRYPT_STYLE_BASE64 | ENCRYPT_STYLE_SYMBOL | ENCRYPT_STYLE_HEX;

export interface ConfigConstructor {
    algorithm ?: ConfigConstructorAlgoritm,
    encryptStyle ?: EncryptStyle,
    secretKey ?: string,
    keyLength ?: number | undefined
}