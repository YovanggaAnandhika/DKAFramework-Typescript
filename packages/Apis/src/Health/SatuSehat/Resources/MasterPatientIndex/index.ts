import SatuSehatHostType from "../../Interfaces/SatuSehatHost.type";
import {DefaultContructorConfig} from "../../Config";
import {
    CheckedPatientActionGetter,
    MasterPatientQueryGetterNewBorn,
    MasterPatientQueryGetterPersonal, MasterPatientQueryInserter,
    MasterPationGetterAction, SatuSehatMasterPatientCallback
} from "./interfaces/MasterPatientIndex";
import axios from "axios";
import {SatuSehatMasterPatientCallbackRequest} from "./interfaces/MasterPatientGetCallback";
import {SatuSehatConstructorConfig} from "../../Interfaces/SatuSehatConstructor.type";
import {SatuSehatPatientModelInsertRequest} from "./interfaces/MasterPatientInsertModel";
import {MasterPatientUpdateModelRequest} from "./interfaces/MasterPatientUpdateModel";
import {SatuSehatCallbackProduction} from "../../Interfaces/SatuSehatCallback.type";
import {SatuSehatFunctionClassParsing} from "../../Interfaces/SatuSehatFunctionClassParsing";

export class MasterPatientIndex {
    /**
     * @internal
     */
    static hostConfig: SatuSehatHostType | undefined;
    /**
     * @internal
     */
    static credential : SatuSehatCallbackProduction;

    /**
     *
     * @internal
     */
    static finalConfig: SatuSehatConstructorConfig = DefaultContructorConfig;


    constructor(options : SatuSehatFunctionClassParsing) {
        MasterPatientIndex.finalConfig = options.config;
        MasterPatientIndex.hostConfig = options.hostConfig;
        MasterPatientIndex.credential = options.credential;
    }

    Read<action extends MasterPationGetterAction>(action: action, query: CheckedPatientActionGetter<action>): Promise<SatuSehatMasterPatientCallback> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (MasterPatientIndex.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            let finalQuery: any = query;
            let mergeQuery: any = {};
            //###########################################################
            switch (action) {
                case "personal":
                    if (query !== undefined) finalQuery.identifier = `https://fhir.kemkes.go.id/id/nik|${query.identifier}`;

                    mergeQuery = {...query, ...finalQuery};

                    axios<SatuSehatMasterPatientCallbackRequest>({
                        url: `${MasterPatientIndex.hostConfig.resources.fhir[MasterPatientIndex.finalConfig.state]}/Patient`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${MasterPatientIndex.credential.access_token}`
                        },
                        params: mergeQuery
                    }).then(async (response) => {
                        if (response.data.total < 1) return rejected({
                            status: false,
                            code: 404,
                            msg: `Patient Data Not Found`
                        });

                        resolve({
                            status: true,
                            code: response.status,
                            msg: `Data Pasien Ditemukan`,
                            data: response.data
                        })

                    }).catch((error) => {
                        rejected({ status : false, code : error.status, msg : error.code});
                    });

                    break;
                case "newBorn":
                    if (query !== undefined) finalQuery.identifier = `https://fhir.kemkes.go.id/id/nik-ibu|${query.identifier}`;
                    mergeQuery = {...query, ...finalQuery};
                    axios<SatuSehatMasterPatientCallbackRequest>({
                        url: `${MasterPatientIndex.hostConfig.resources.fhir[MasterPatientIndex.finalConfig.state]}/Patient`,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${MasterPatientIndex.credential.access_token}`
                        },
                        params: mergeQuery
                    }).then((response) => {
                        if (response.data.total < 1) return rejected({
                            status: false,
                            code: 404,
                            msg: `Patient Data Not Found`
                        });
                        resolve({
                            status: true,
                            code: response.status,
                            msg: `Data Pasien Ditemukan`,
                            data: response.data
                        });
                    }).catch((error) => {
                        rejected(error);
                    });
                    break;
            }
        });
    }

    getDetail(fullUrl: string) : Promise<SatuSehatMasterPatientCallback> {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (MasterPatientIndex.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            axios<SatuSehatMasterPatientCallbackRequest>({
                url: fullUrl,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${MasterPatientIndex.credential.access_token}`
                }
            }).then(async (response) => {
                if (response.data.total < 1) return rejected({
                    status: false,
                    code: 404,
                    msg: `Patient Data Not Found`
                });

                resolve({
                    status: true,
                    code: response.status,
                    msg: `Data Pasien Ditemukan`,
                    data: response.data
                })

            }).catch((error) => {
                rejected(error);
            });
        });
    }
    Insert(query: SatuSehatPatientModelInsertRequest) {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (MasterPatientIndex.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            axios({
                url: `${MasterPatientIndex.hostConfig.resources.fhir[MasterPatientIndex.finalConfig.state]}/Patient`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${MasterPatientIndex.credential.access_token}`,
                    "Content-Type": "application/json",
                    "Cache-Control" : "no-cache",
                },
                data: query,
            }).then(async (response) => {
                resolve({
                    status: true,
                    code: 200,
                    msg: `Data Pasien Berhasil Ditembahkan`,
                    data: response.data.data
                })

            }).catch((error) => {
                rejected({
                    ...error
                });
            });
        });
    }

    Update(fullUrl: string, query: Array<MasterPatientUpdateModelRequest>) {
        return new Promise((resolve, rejected) => {
            //###########################################################
            if (MasterPatientIndex.hostConfig === undefined)
                return rejected({status: false, code: 500, msg: `host config Fatal Error`});
            //###########################################################
            axios({
                url: `${fullUrl}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${MasterPatientIndex.credential.access_token}`,
                    "Content-Type": "application/json",
                    "Cache-Control" : "no-cache",
                },
                data: query,
            }).then(async (response) => {
                resolve({
                    status: true,
                    code: 200,
                    msg: `Data Pasien Berhasil Dirubah`,
                    data: response.data.data
                })

            }).catch((error) => {
                rejected({
                    ...error
                });
            });
        });
    }


}