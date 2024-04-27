import {SatuSehatConstructorConfig} from "./Interfaces/SatuSehatConstructor.type";
import axios from "axios";
import {DefaultContructorConfig, DefaultHostSatuSehat} from "./Config";
import {merge} from "lodash";
import SatuSehatHostType from "./Interfaces/SatuSehatHost.type";
import {SatuSehatConfigConstructorState} from "./Types/SatuSehatConfigConstructor";
import {SatuSehatCallbackChecker} from "./Interfaces/SatuSehatCallback.type";
import {MasterPatientIndex} from "./Resources/MasterPatientIndex";


class SatuSehat<Config extends SatuSehatConstructorConfig> {
    get HostConfig(): SatuSehatHostType {
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

    private _HostConfig : SatuSehatHostType = DefaultHostSatuSehat;
    constructor(config ?: Config) {
        this.finalConfig = merge(this.finalConfig, config);
        if (this.finalConfig.state === SatuSehatConfigConstructorState.PRODUCTION){
            this.HostConfig = {
                auth : "https://api-satusehat.kemkes.go.id/oauth2/v1",
                resources : "https://api-satusehat.kemkes.go.id/fhir-r4/v1"
            }
        }


    }

    getAccessToken() : Promise<SatuSehatCallbackChecker<Config>> {
        return new Promise((resolve, rejected) => {
            if (this.finalConfig.credentials?.auth?.clientId === undefined)
                return rejected({ status : false, code : 400, msg : `clientId is require not found`});
            if (this.finalConfig.credentials?.auth?.clientSecret === undefined)
                return rejected({ status : false, code : 400, msg : `clientSecret is require not found`});

            axios({
                url : `${this.HostConfig.auth}/oauth2/v1/accesstoken`,
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded",
                    "Cache-Control" : "no-cache",
                },
                params : {
                    grant_type : "client_credentials"
                },
                responseType : "json",
                data : JSON.stringify({
                    client_id : this.finalConfig.credentials?.auth?.clientId,
                    client_secret : this.finalConfig.credentials?.auth?.clientSecret
                })
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                rejected(error);
            });
        });
    }

    getResources(accessToken : string){
        MasterPatientIndex.hostConfig = this.HostConfig;
        return {
            MasterPatientIndex : () => {
                return new MasterPatientIndex()
            }
        }
    }

}

export { SatuSehat };
export default SatuSehat;