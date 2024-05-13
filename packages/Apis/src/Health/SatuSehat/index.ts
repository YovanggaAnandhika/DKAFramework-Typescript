import {SatuSehatConstructorConfig} from "./Interfaces/SatuSehatConstructor.type";
import axios from "axios";
import {DefaultContructorConfig} from "./Config";
import {merge} from "lodash";
import SatuSehatHostType from "./Interfaces/SatuSehatHost.type";
import {SatuSehatConfigConstructorState} from "./Types/SatuSehatConfigConstructor";
import {SatuSehatCallbackChecker, SatuSehatCallbackProduction} from "./Interfaces/SatuSehatCallback.type";
import {MasterPatientIndex} from "./Resources/MasterPatientIndex";
import {FHIR} from "./FHIR";


class SatuSehat<Config extends SatuSehatConstructorConfig> {
    get HostConfig(): SatuSehatHostType | undefined {
        return this._HostConfig;
    }

    set HostConfig(value: SatuSehatHostType) {
        this._HostConfig = value;
    }
    get finalConfig(): SatuSehatConstructorConfig {
        return this._finalConfig;
    }
    set finalConfig(value: SatuSehatConstructorConfig) {
        this._finalConfig = value;
    }
    private _finalConfig : SatuSehatConstructorConfig = DefaultContructorConfig;

    private _HostConfig : SatuSehatHostType | undefined;
    constructor(config ?: Config) {
        this.finalConfig = merge(this.finalConfig, config);
        this.HostConfig = {
            auth : {
                [ SatuSehatConfigConstructorState.STAGING ] : `https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v${this.finalConfig.versionApi}`,
                [ SatuSehatConfigConstructorState.PRODUCTION ] : `https://api-satusehat.kemkes.go.id/oauth2/v${this.finalConfig.versionApi}`
            },
            resources : {
                fhir : {
                    [ SatuSehatConfigConstructorState.STAGING ] : `https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v${this.finalConfig.versionApi}`,
                    [ SatuSehatConfigConstructorState.PRODUCTION ] : `https://api-satusehat.kemkes.go.id/fhir-r4/v${this.finalConfig.versionApi}`
                },
                masterData : {
                    [ SatuSehatConfigConstructorState.STAGING ] : `https://api-satusehat-stg.dto.kemkes.go.id/masterdata/v${this.finalConfig.versionApi}`,
                    [ SatuSehatConfigConstructorState.PRODUCTION ] : `https://api-satusehat.kemkes.go.id/masterdata/v${this.finalConfig.versionApi}`
                }
            }
        };
    }

    getAccessToken() : Promise<SatuSehatCallbackProduction> {
        return new Promise((resolve, rejected) => {
            if (this.finalConfig.credentials?.auth?.clientId === undefined)
                return rejected({ status : false, code : 400, msg : `clientId is require not found`});
            if (this.finalConfig.credentials?.auth?.clientSecret === undefined)
                return rejected({ status : false, code : 400, msg : `clientSecret is require not found`});
            if (this.HostConfig === undefined)
                return rejected({ status : false, code : 400, msg : `host config undefined`});
            const hostServer = `${this.HostConfig.auth[this.finalConfig.state]}/accesstoken`;
            axios<SatuSehatCallbackProduction>({
                url : hostServer,
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded",
                    "Cache-Control" : "no-cache",
                },
                params : {
                    grant_type : "client_credentials"
                },
                responseType : "json",
                data : {
                    client_id : this.finalConfig.credentials?.auth?.clientId,
                    client_secret : this.finalConfig.credentials?.auth?.clientSecret
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                rejected({ status : false, code : error.response.status, msg : error.response.statusText, error : error.response.data.issue});
            });
        });
    }

    /**
     * @constructor
     * @param { SatuSehatCallbackProduction } credential
     * Kode Akses Token yang Didapatkan Dari Function data get Access Token
     */

    getResources(credential : SatuSehatCallbackProduction){
        return {
            MPI : () => {
                return new MasterPatientIndex({ config : this.finalConfig, credential : credential, hostConfig : this.HostConfig })
            },
            /**
             * @constructor
             * @desc
             * Fast Healthcare Interoperability Resources FHIR adalah sebuah standar global (internasional) yang menetapkan format data beserta elemen-elemennya (yang disebut "resources") dan sebuah standar antarmuka pemrograman aplikasi (API/Application Programming Interface) untuk pertukaran informasi (interoperabilitas SATUSEHAT) yang pada penerapannya akan dibagi-bagi lagi menjadi beberapa alur proses sesuai penggunaannya (use case) baik use case dasar maupun use case tematik. FHIR dibaca “fire” dalam bahasa Inggris (/faier/).
             */
            FHIR : () => {
                return new FHIR({ config : this.finalConfig, credential : credential, hostConfig : this.HostConfig });
            }
        }
    }

}

export { SatuSehat };
export default SatuSehat;