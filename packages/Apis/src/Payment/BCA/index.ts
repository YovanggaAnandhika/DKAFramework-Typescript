import {BCAApisConfig, BCAApisConfigCredential, BCATokenAccess, RawRequestOpenApiConfig} from "./Interfaces/BCAConfig";
import axios from "axios";
import * as crypto from "crypto";


export class BCA {

    private config : BCAApisConfig;
    private accessToken : BCATokenAccess = {};

    constructor(config : BCAApisConfig) {
        this.config = config
    }

    async getToken(credential ?: BCAApisConfigCredential) : Promise<BCATokenAccess> {
        credential = (credential !== undefined) ? credential : this.config.credential;
        return new Promise(async (resolve, rejected) => {
            await axios({
                url : `https://${this.config.state}/api/oauth/token`,
                method : "POST",
                headers : {
                    Authorization : BCA.encodingAuthorization(credential),
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                data : {
                    grant_type : "client_credentials"
                }
            }).then(async (res) => {
                this.accessToken.accessToken = res.data.access_token;
                this.accessToken.tokenType = res.data.token_type;
                this.accessToken.expiresIn = res.data.expires_in;
                this.accessToken.scope = res.data.scope.split(" ")
                await resolve(this.accessToken)
            }).catch(async (error) => {
                await rejected(error);
            })
        })
    }

    private async RawRequestOpenApi(configRequest : RawRequestOpenApiConfig) : Promise<object> {
        return new Promise(async (resolve, rejected) => {
            const JSONParse = JSON.stringify(configRequest.data);
            const bodyHash = crypto.createHash('sha256').update(JSONParse.replace(/\s/g, '')).digest('hex')
            const stringToSign: string = `${configRequest.method}:${configRequest.path}:${configRequest.token.accessToken}:${bodyHash}:${configRequest.timestamp}`;
            const generateSignature = crypto.createHmac('sha256', `${configRequest?.credential?.apiKey}`).update(stringToSign).digest('hex')
            const headersData = {
                Authorization : `${configRequest.token?.tokenType} ${configRequest.token.accessToken}`,
                "Content-Type" : configRequest.contentType,
                "Origin" : configRequest.origin,
                "X-BCA-Key" : configRequest.credential.apiKey,
                "X-BCA-Timestamp" : configRequest.timestamp,
                "X-BCA-Signature" : generateSignature,
            };
            console.log(headersData)
            await axios({
                url : `https://${this.config.state}${configRequest.path}`,
                method : configRequest.method,
                headers : headersData,
                data : configRequest.data
            }).then(async (result) => {
                resolve(result.data)
            }).catch(async (error) => {
                rejected(error)
            })
        })
    }

    private static encodingAuthorization(credential ?: BCAApisConfigCredential){
        return `Basic ${Buffer.from(`${credential?.clientId}:${credential?.clientSecret}`).toString('base64')}`
    }
}