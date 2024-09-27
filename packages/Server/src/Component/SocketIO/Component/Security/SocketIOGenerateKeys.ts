import {createSign, generateKeyPair, RSAKeyPairOptions} from "crypto";

class SocketIOGenerateKeys {

    async keys(keyOptions : RSAKeyPairOptions<any, any>) {
        await generateKeyPair("rsa", keyOptions, async (error, publicKey, privateKey) => {

        })
    }

    async request(){
        createSign("RSA-SHA256",{
            
        })
    }
}
