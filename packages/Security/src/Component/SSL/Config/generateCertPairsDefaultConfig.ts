import {GenerateKeys} from "../Types/GeneralCertOptionsMethod";


export const generateCertPairsDefaultConfig : GenerateKeys = {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        // cipher: 'aes-256-cbc',
        // passphrase: 'top secret'
    },
}