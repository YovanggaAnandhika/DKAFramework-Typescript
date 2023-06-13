import * as Crypto from "crypto";


export const SSL = {
    generateKey : async () => {
        let { privateKey, publicKey } = Crypto.generateKeyPairSync("rsa", {
            modulusLength : 4096,
            publicKeyEncoding: {
                type : "spki",
                format: 'pem',

            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'Cyberhack2010'
            }
        });


        return privateKey
    }
}

export default SSL;