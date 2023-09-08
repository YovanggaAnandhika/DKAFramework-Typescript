import axios from "axios";
import BRiApisConfig, {BRIApisConfigGetToken} from "./Interfaces/BRiApisConfig";


export class BRI {

    private config : BRiApisConfig;
    constructor(config : BRiApisConfig) {
        this.config = config;
    }

    async getToken(configGetToken : BRIApisConfigGetToken) : Promise<any> {
        let refactorHost = `${this.config.host}/oauth/client_credential/accesstoken`;
        return new Promise(async (resolve, rejected) => {
            await axios({
                url : refactorHost,
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                params : {
                    grant_type : "client_credentials"
                },
                data : {
                    client_id : configGetToken.client_key,
                    client_secret : configGetToken.client_secret
                }
            }).then(async (res) => {
                await resolve(res)
            }).catch(async (error) => {
                await rejected(error);
            })
        })
    }

}

export default BRI;