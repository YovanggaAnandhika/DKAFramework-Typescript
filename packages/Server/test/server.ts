import {Options, Server} from "./../src";
import * as fs from "fs";
import * as path from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.SOCKETIO,
        host : Options.HOST.WILDCARD,
        port : 53319,
        events : {
            socket : {
                onConnection : async (io) => {
                    io.on("offer", async (data) => {
                        console.log(data)
                    })
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
