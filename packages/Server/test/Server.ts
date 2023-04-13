import { Server, Options} from "../src";
import {readFileSync} from "fs";
import { join } from "path";

(async () => {
    await Server({
        engine : Options.ENGINE.UDP
    });

    /*await Server({
        engine : Options.ENGINE.SOCKETIO,
        host : "0.0.0.0",
        port : 8888,
        settings : {
            engine : {
                protocol : "HTTP2",
                allowHTTP1 : true,
                key: readFileSync(join(__dirname, "./Cert/Server/localhost.key")),
                cert: readFileSync(join(__dirname, "./Cert/Server/localhost.crt")),
                ca : readFileSync(join(__dirname, "./Cert/CA/localhost.crt")),
                requestCert : true
            },
            socket : {
                pingInterval : 1000,
                pingTimeout : 3000,
            }
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.error(error)
    })*/
})();