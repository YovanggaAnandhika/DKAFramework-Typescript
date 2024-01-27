import {JWE, JWK, parse, JWS, JWA} from "node-jose"
import * as crypto from "crypto";
import * as jose from "jose";
import {merge} from "lodash";
import {
    SecurityDefaultConfigJWEDecryptOptions,
    SecurityDefaultConfigJWEEncryptOptions, SecurityDefaultConfigJWTConstructor
} from "./Config/SecurityDefaultConfig";
import fs from "fs";
import {JWTConfig, SecurityConfigJWTEngineOptions} from "./Interfaces/SecurityConfig";
import OpenSSL from "../../SSL";
import {KeyPairsData} from "../../SSL/Types/GeneralCertOptionsMethod";
import {pki} from "node-forge";
import RawKey = JWK.RawKey;
import {error} from "winston";

export class JWT {

    private JWEEncryptor ?: JWE.Encryptor;

    private async getKeyBuffer(path: string): Promise<Buffer> {
        return new Promise(async (resolve) => {
            if (fs.existsSync(path)) {
                resolve(fs.readFileSync(path))
            } else {
                await resolve(Buffer.from(path))
            }
        });
    }

    private async getKeyLocation(path : string) : Promise<string> {
        return new Promise(async (resolve) => {
            if (fs.existsSync(path)){
                resolve(fs.readFileSync(path,'utf-8'))
            }else{
                await resolve(path)
            }
        })
    }

    constructor() {

    }
    async encrypt(payloads: object | string, opts ?: SecurityConfigJWTEngineOptions) : Promise<string> {
        return new Promise(async (resolve, rejected) => {
            opts = merge(SecurityDefaultConfigJWEEncryptOptions, opts);
            // extract payload data
            let payloadsData = (typeof payloads === "object") ? JSON.stringify(payloads) : payloads;
            let buffer = Buffer.from(payloadsData);
            /** get Buffer key **/
            if (opts.JWK?.key !== undefined){
                this.getKeyBuffer(opts?.JWK.key)
                    .then(async (key) => {
                        /** get JWKKey from Buffer **/
                        await JWK.asKey(key, opts?.JWK?.form, opts?.JWK?.extras)
                            .then(async (JWKKey) => {
                                /** start create encryptor step 1 **/
                                this.JWEEncryptor = JWE.createEncrypt(opts?.JWE as JWE.EncryptOptions, JWKKey);
                                /** Update from buffer step 2 **/
                                await this.JWEEncryptor.update(buffer);
                                /** finish and close encrypt progress step 3 **/
                                await this.JWEEncryptor.final()
                                    .then(async (encryptText) => {
                                        let base64 = Buffer.from(encryptText,"utf-8").toString("base64url");
                                        await resolve(base64);
                                    })
                                    .catch(async (error) => {
                                        await rejected({status: false, code: 503, msg: `error final get Encryption text`, error : error})
                                    });
                            })
                            .catch(async (error) => {
                                await rejected({status: false, code: 502, msg: `error generate key JWK. or key must public`, error : error})
                            });
                    })
                    .catch(async (error) => {
                        await rejected(error)
                    });
            }else{
                await rejected({status: false, code: 500, msg: `encryption key is Require` })
            }
        });
    }

    async decrypt(data : string, opts ?: SecurityConfigJWTEngineOptions) : Promise<object | string>{
        return new Promise(async (resolve, rejected) => {
            opts = merge(SecurityDefaultConfigJWEDecryptOptions, opts);
            let keystore = JWK.createKeyStore();
            /** get Buffer key **/
            if (opts?.JWK?.key !== undefined){
                try {
                    let key = await this.getKeyBuffer(opts?.JWK?.key);
                    let JWKKey = await JWK.asKey(key, opts?.JWK?.form, opts?.JWK?.extras);
                    await keystore.add(JWKKey);
                    try {
                        let base64decode = Buffer.from(data,"base64url").toString("utf-8");
                        let outPut = parse.compact(base64decode)
                        let decryptedVal = await outPut.perform(keystore);
                        // @ts-ignore
                        let claims = Buffer.from(decryptedVal.plaintext);
                        try {
                            await resolve(JSON.parse(claims.toString()) as object)
                        }catch (e) {
                            await resolve(claims.toString() as string)
                        }
                    }catch (e) {
                        await rejected({ status : false, code : 503, msg : `illegal or Unaccepted private key format. PRIVATE_KEY_UNVALID`});
                    }
                }catch (e) {
                    if (opts?.JWK?.passphrase !== undefined){
                        let mKey = await this.getKeyLocation(opts.JWK.key);
                        try {
                            let getPrivateKeysFormat = pki.decryptRsaPrivateKey(mKey, opts?.JWK?.passphrase);
                            let mPem = pki.privateKeyToPem(getPrivateKeysFormat)
                            let mBuffer = Buffer.from(mPem);
                            /** get JWKKey from Buffer **/
                            let JWKKey = await JWK.asKey(mBuffer, opts?.JWK?.form, opts?.JWK?.extras);
                            await keystore.add(JWKKey);
                            try {
                                let base64decode = Buffer.from(data,"base64url").toString("utf-8");
                                let outPut = parse.compact(base64decode)
                                let decryptedVal = await outPut.perform(keystore);
                                // @ts-ignore
                                let claims = Buffer.from(decryptedVal.plaintext);
                                try {
                                    await resolve(JSON.parse(claims.toString()) as object)
                                }catch (e) {
                                    await resolve(claims.toString() as string)
                                }
                            }catch (e) {
                                await rejected({ status : false, code : 503, msg : `illegal or Unaccepted private key format. PRIVATE_KEY_UNVALID`});
                            }
                        }catch (e) {
                            await rejected({ status : false, code : 505, msg : `private key corrupted or passphrase wrong`})
                        }
                    }else{
                        await rejected({ status : false, code : 502, msg : `private key require passphrase`})
                    }
                }
            }else{
                await rejected({status: false, code: 500, msg: `private key key is Require` })
            }
        });
    }

}

export default JWT;