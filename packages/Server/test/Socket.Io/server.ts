import { Server } from "./../.."

(async () => {

    await Server({
        host : "0.0.0.0",
        port : 892
    }).then(async (resolve) => {
        console.log(resolve)
    }).catch(async (reject) => {
        console.error(reject)
    })
})();