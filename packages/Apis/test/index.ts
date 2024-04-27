import Apis from "../src";
import {SatuSehatConfigConstructorState} from "../src/Health/SatuSehat/Types/SatuSehatConfigConstructor";


(async () => {

    const SastuSehat = new Apis.Health.satusehat({
        state : SatuSehatConfigConstructorState.PRODUCTION,
        credentials : {
            auth : {
                clientId : "<credential-here>",
                clientSecret : "<credential-here>"
            }
        }
    });
    /** Dapatkan Kode Token Dari Module **/
    const token = await SastuSehat.getAccessToken();
    /** Mengakses Resource **/
    const MasterPasien = SastuSehat
        .getResources(token.access_token)
        .MasterPatientIndex()

    /** Perintah Melihat Data Pasien **/
    MasterPasien.Get({ identifier : 73713773737730001 })
        .then((DataPasien) => {
            console.log(DataPasien);
        })
        .catch((error) => {
            console.error(error)
        });






})();