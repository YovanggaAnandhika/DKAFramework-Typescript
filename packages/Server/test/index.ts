import {Options, Server} from "./../src";
import * as fs from "fs";
import * as path from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.SOCKETIO,
        host : "0.0.0.0",
        port : 53310,
        events : {
            socket : {
                onConnection : async (io) => {

                    /*io.on("hello", async (data) => {
                        console.log(data)
                    });*/

                },
                onLatency : async (delay, type) => {
                    console.log(`SERVER delay ${delay}, ${type}`)
                }
            }
        },
        settings : {
            socket : {
                pingInterval : 1000
            },
            engine : {
                protocol : Options.SETTINGS.ENGINE.PROTOCOL.HTTP2,
                cert : fs.readFileSync(path.join(__dirname,"./Cert/localhost.crt"),"utf-8"),
                key : fs.readFileSync(path.join(__dirname,"./Cert/private.key"), "utf-8"),
            }
        }
    }).then(async (resultServ) => {
        console.log("server berhasil dijalankan")
        // @ts-ignore
    }).catch(async (error) => {
        console.error(error)
    })
})();
