import Apis from "../src";
import {SatuSehatConfigConstructorState} from "../src/Health/SatuSehat/Types/SatuSehatConfigConstructor";


(async () => {

    const SastuSehat = new Apis.Health.satusehat({
        state: SatuSehatConfigConstructorState.STAGING,
        credentials: {
            auth: {
                clientId: "<token-here>",
                clientSecret: "<token-here>"
            }
        }
    });
    /** Dapatkan Kode Token Dari Module **/
    const token = await SastuSehat.getAccessToken();

    const MasterPasien = SastuSehat.getResources(token.access_token).MasterPatientIndex()

    const DataPasien = await MasterPasien.Read("personal",{ identifier : 898392823983892 });
    const DataPasienDetail = await MasterPasien.getDetail(DataPasien.data.entry[0].fullUrl);
    console.log(DataPasien.data)


})();