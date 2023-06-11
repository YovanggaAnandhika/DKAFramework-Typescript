import Apis from "../src";


(async () => {
    /*let mQris = new Apis.Payment.QRIS({
        mID : "ID1023262011142",
        apikey : "a838831"
    });

    mQris.createInvoice({
        cliTrxAmount : 100000,
        cliTrxNumber : "#392992"
    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.error(error)
    })*/
    let mBCA = new Apis.Payment.BCA({
        state : "sandbox.bca.co.id",
        credential : {
            clientId : `3db9c038-f385-42ea-8c4d-39bd46e218e2`,
            clientSecret : `db3d0b37-47d9-4100-9e35-cd154b6b7866`
        }
    });

    mBCA.getToken()
        .then(async (resolve) => {
            console.log(resolve)
        })
        .catch(async (error) => {
            console.error(error)
        });

})();