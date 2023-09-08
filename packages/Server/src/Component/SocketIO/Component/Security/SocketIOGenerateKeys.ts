import {generateKeyPair, createSign, RSAKeyPairOptions} from "crypto";
import {open} from "fs";

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
