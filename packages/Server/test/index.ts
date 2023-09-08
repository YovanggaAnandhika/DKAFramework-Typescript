import { Server, Options } from "./../src";

import * as process from "process";
import {readFileSync} from "fs";
import * as path from "path";
import * as fs from "fs";
import {ConfigSocketIOServerInstancesNamespaces} from "../src/Component/SocketIO/Interfaces/ConfigSocketIOServer";

(async () => {

    let mNamespace : ConfigSocketIOServerInstancesNamespaces = {
        dev : {
            onConnection : async (io, namespace) => {
                //console.log(`connect namespace ${namespace.name}`);
                io.on("hello", async (data) => {
                    console.log(data);
                });
                io.emit('hello',{ halo : "hello from server"});
            }
        }
    }

    await Server({
        engine : Options.ENGINE.SOCKETIO,
        host : "0.0.0.0",
        port : 3821,
        namespaces : mNamespace,
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
