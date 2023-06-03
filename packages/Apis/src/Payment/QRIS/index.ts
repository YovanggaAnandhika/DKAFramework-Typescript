import axios from "axios";
import {
    QrisApiConfig, QrisCheckStatusCallback,
    QrisCOnfigCheckStatus,
    QrisConfigCreateInvoice,
    QrisCreateInvoiceCallback
} from "./Interfaces/QrisApiConfig";


export class QRIS {

    private config : QrisApiConfig;

    constructor(configQris : QrisApiConfig) {
        this.config = configQris;
    }

    createInvoice(data : QrisConfigCreateInvoice) : Promise<QrisCreateInvoiceCallback> {
        return new Promise(async (resolve, rejected) => {
            axios({
                url : "https://qris.id/restapi/qris/show_qris.php",
                method : "GET",
                params : {
                    do : "create-invoice",
                    apiKey : this.config.apikey,
                    mID : this.config.mID,
                    cliTrxNumber : data.cliTrxNumber,
                    cliTrxAmount : data.cliTrxAmount
                }
            }).then(async (result) => {
                let dataResult = result.data as QrisCreateInvoiceCallback;
                switch (dataResult.status){
                    case "success" :
                        await resolve(dataResult);
                        break;
                    case "failed" :
                        await rejected(dataResult);
                        break;
                }
            }).catch(async (error) => {
                await rejected(error)
            })
        })
    }

    async checkStatus(data : QrisCOnfigCheckStatus) : Promise<QrisCheckStatusCallback> {
        return new Promise(async (resolve, rejected) => {
            axios({
                url : "https://qris.id/restapi/qris/checkpaid_qris.php",
                method : "GET",
                params : {
                    do : "checkStatus",
                    apiKey : this.config.apikey,
                    mID : this.config.mID,
                    invid : data.qris_invoiceid,
                    trxvalue : data.trxvalue,
                    trxdate : data.trxdate
                }
            }).then(async (result) => {
                let dataResult = result.data as QrisCheckStatusCallback;
                switch (dataResult.status){
                    case "success" :
                        switch (dataResult.data.qris_status) {
                            case "paid" :
                                await resolve(dataResult);
                                break;
                            case "unpaid" :
                                await rejected(dataResult);
                                break;
                        }
                        break;
                    case "failed" :
                        await rejected(dataResult);
                        break;
                }
            }).catch(async (error) => {
                await rejected(error)
            })
        })
    }
}