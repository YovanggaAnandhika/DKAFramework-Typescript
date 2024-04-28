import Apis from "../src";
import {SatuSehatConfigConstructorState} from "../src/Health/SatuSehat/Types/SatuSehatConfigConstructor";


(async () => {

    /***
     * API Bridge SatuSehat Mastery Patient Data
     * Created by : Yovangga Anandhika
     */
    const SastuSehat = new Apis.Health.satusehat({
        state: SatuSehatConfigConstructorState.STAGING,
        credentials: {
            auth: {
                clientId: "<token-here>",
                clientSecret: "<token-here>"
            }
        }
    });
    /**
     * Dapatkan Kode Token Dari Module **/
    const token = await SastuSehat.getAccessToken();

    const MasterPasien = SastuSehat.getResources(token.access_token).MPI();

    const FHIR = SastuSehat
        .getResources(token.access_token)
        .FHIR()
        .Onboarding()
        .Location()

})();