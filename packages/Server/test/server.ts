import {Server, Options} from "./../src";
import * as fs from "fs";
import * as path from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.FASTIFY,
        port : 5321,
        app : (app, opts, next) => {
            let cashier = app.io.of("/cashier");
            next()
        },
        server : (server) => {

        },
        plugin : {
            socketIO : {
                options: {
                    cors : {
                        origin : "*"
                    }
                }
            }
        },
        settings : {
            engine : {
                type : Options.SETTINGS.ENGINE.PROTOCOL.HTTP2,
                options : {
                    http2 : true,
                    https : {
                        cert : fs.readFileSync(path.join(__dirname,"SSL","Cert","./server.crt"),"utf-8"),
                        key : fs.readFileSync(path.join(__dirname,"SSL","Keys","./private.key"),"utf-8"),
                        ca : [
                            fs.readFileSync(path.join(__dirname,"SSL","Cert","./ca.crt"),"utf-8"),
                        ],
                        passphrase : "Cyberhack2010"
                    }
                }
            }
        }
    }).then(async (resultServ) => {
        console.log("server berhasil dijalankan")
        // @ts-ignore
    }).catch(async (error) => {
        console.error(error)
    });
})();
