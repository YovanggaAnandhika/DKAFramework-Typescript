import { Server, Options } from "../src";
import {readFileSync} from "fs";

(async () => {
    await Server({
        engine : Options.ENGINE.SOCKETIO,
        host : Options.HOST.WILDCARD,
        port : 2883,
        use : async (io, next) => {
            await next();
        },
        events : {
            socket : {
                onConnection : async (io) => {
                    // @ts-ignore
                    //console.log(io.conn.peerCertificate)
                }
              },
            server : {
              onListening : async () => {
                  console.log("server berjalan")
              }
            }
        },
        settings : {
            engine : {
                protocol : Options.SETTINGS.ENGINE.PROTOCOL.HTTPS,
                autoListen : true
            }
        }
    }).then(async (server) => {
        //console.log(server)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {

    });



    //mServer.engine.server.listen
})();