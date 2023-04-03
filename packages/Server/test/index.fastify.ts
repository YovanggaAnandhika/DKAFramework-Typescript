import {Options, Server} from "../src";

(async () => {
    await Server({
        engine : "FASTIFY",
        port : 381,
        app : async (app, opts, next) => {

        },
        plugins : {
            socketIO : {

            },
            ngrok : {
                enabled : true,
                settings : {
                    authToken : "g3UD9sgpzrW41i6YGVWH_3w7oA58kHxKDgSNpmncba",
                    proto : "http"
                }
            }
        }
    }).then(async (result) => {

    }).catch(async (e) => {
        console.error(e);
    })
})();