import SatuSehatHostType from "../../Interfaces/SatuSehatHost.type";
import {DefaultHostSatuSehat} from "../../Config";
import {MasterPatientQuery} from "./interfaces/MasterPatientIndex";
import axios from "axios";
import {SatuSehatMasterPatientCallbackRequest} from "./interfaces/MasterPatientGetCallback";


export class MasterPatientIndex {
    /**
     * @internal
     */
    static hostConfig : SatuSehatHostType = DefaultHostSatuSehat;
    Get(query : MasterPatientQuery) : Promise<SatuSehatMasterPatientCallbackRequest> {
        return new Promise((resolve, rejected) => {
            axios({
                method : "GET",
                headers : {
                    Authorization : `Bearer ${MasterPatientIndex.hostConfig.resources}`
                },
                params : query
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                rejected(error);
            });
        });
    }
}