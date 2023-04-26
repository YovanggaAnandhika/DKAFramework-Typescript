import Apis from "../src";


(async () => {
    let mBCA = new Apis.Payment.BRI({
        state : "DEVELOPMENT",
        host : "https://sandbox.partner.api.bri.co.id",
    });

    await mBCA.getToken({
        client_key : "CzYISO8QbIAaE7W1K77hLGa6BM3XFt7Z",
        client_secret : "GhuPNMqbk3OfhNHr"
    }).then(async (resolve) => {
        console.log(resolve.data)
    }).catch(async (error) => {
        console.error(error.request.res.responseUrl)
    })
})();