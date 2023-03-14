import {Options, Server} from "../src";

(async () => {
    await Server({
        engine : "FASTIFY",
        port : 381,
        plugins : {
            ngrok : {
                enabled : true,
                settings : {
                    authToken : "g3UD9sgpzrW41i6YGVWH_3w7oA58kHxKDgSNpmncba",
                    proto : "http"
                }
            }
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (e) => {
        console.error(e);
    })
})();