import axios, {Axios} from "axios";
import {
    QrisApiConfig,
    QrisConfigCheckStatus,
    QrisConfigCreateInvoice,
    QrisCreateInvoiceCallback
} from "./Interfaces/QrisApiConfig";


export class QRIS {

    private config : QrisApiConfig;
    private mAxios : Axios;

    constructor(configQris : QrisApiConfig) {
        this.config = configQris;
        this.mAxios = axios.create({
            timeout : 30000,
        });
    }

    createInvoice(data : QrisConfigCreateInvoice) : Promise<QrisCreateInvoiceCallback> {
        return new Promise(async (resolve, rejected) => {
            await this.mAxios.get("https://qris.id/restapi/qris/show_qris.php", {
                params: {
                    do: "create-invoice",
                    apiKey: this.config.apikey,
                    mID: this.config.mID,
                    cliTrxNumber: data.cliTrxNumber,
                    cliTrxAmount: data.cliTrxAmount
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
                await rejected(error);
            })
        })
    }

    async checkStatus(options : QrisConfigCheckStatus) {

        return new Promise(async (resolve, rejected) => {

        });

    }
}