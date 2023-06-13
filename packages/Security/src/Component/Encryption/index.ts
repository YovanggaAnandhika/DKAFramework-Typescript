import {JWE, JWK, JWS, parse, JWA} from "node-jose"
import * as Jose from "jose"

import {merge} from "lodash";
import {
    SecurityDefaultConfigJWEDecryptOptions,
    SecurityDefaultConfigJWEEncryptOptions
} from "./Config/SecurityDefaultConfig";
import fs from "fs";
import {SecurityConfigJWTEngineOptions} from "./Interfaces/SecurityConfig";
import path from "path";

export class Encryption {

    private JWEEncryptor ?: JWE.Encryptor;


    private async getKeyBuffer(path: string): Promise<Buffer> {
        return new Promise(async (resolve, rejected) => {
            if (fs.existsSync(path)) {
                resolve(fs.readFileSync(path))
            } else {
                await resolve(Buffer.from(path))
            }
        })

    }

    async encrypt(payloads: object, opts ?: SecurityConfigJWTEngineOptions) : Promise<any> {
        return new Promise(async (resolve, rejected) => {
            opts = merge(SecurityDefaultConfigJWEEncryptOptions, opts);
            // extract payload datas
            let buffer = Buffer.from(JSON.stringify(payloads));
            /** get Buffer key **/
            this.getKeyBuffer(opts?.JWK?.key as string)
                .then(async (key) => {
                    /** get JWKKey from Buffer **/
                    await JWK.asKey(key, opts?.JWK?.form, opts?.JWK?.extras)
                        .then(async (JWKKey) => {
                            /** start create encryptor step 1 **/
                            this.JWEEncryptor = JWE.createEncrypt(opts?.JWE as JWE.EncryptOptions, JWKKey);
                            /** Update from buffer step 2 **/
                            await this.JWEEncryptor.update(buffer);

                            /*sign.final()
                                .then(async (resolve) => {
                                    console.log(resolve.signResult)
                                })
                                .catch(async (error) => {
                                    console.log(error);
                                })*/

                            /** finish and close encrypt progress step 3 **/
                            await this.JWEEncryptor.final()
                                .then(async (encryptText) => {
                                    await resolve(encryptText);
                                })
                                .catch(async (error) => {
                                    await rejected({status: false, code: 503, msg: `error final get Encryption text`, error : error})
                                });
                        })
                        .catch(async (error) => {
                            await rejected({status: false, code: 503, msg: `error generate key JWK`, error : error})
                        });
                })
                .catch(async (error) => {
                    await rejected(error)
                });
        });
    }

    async decrypt(data : string, opts ?: SecurityConfigJWTEngineOptions) : Promise<object | undefined>{
        return new Promise(async (resolve, rejected) => {
            opts = merge(SecurityDefaultConfigJWEDecryptOptions, opts);
            let keystore = JWK.createKeyStore();
            /** get Buffer key **/
            let key = await this.getKeyBuffer(opts?.JWK?.key as string);
            /** get JWKKey from Buffer **/
            let JWKKey = await JWK.asKey(key, opts?.JWK?.form, opts?.JWK?.extras);
            await keystore.add(JWKKey);
            try {
                let outPut = parse.compact(data)
                let decryptedVal = await outPut.perform(keystore);
                // @ts-ignore
                let claims = Buffer.from(decryptedVal.plaintext).toString();
                await resolve(JSON.parse(claims))
            }catch (e) {
                console.error(e)
                await rejected({ status : false, code : 500, msg : `Illegal or CorruptData To Decryption`})
            }
        });
    }

}

export default Encryption;