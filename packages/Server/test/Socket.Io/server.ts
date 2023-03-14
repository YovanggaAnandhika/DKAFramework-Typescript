import {Options, Server} from "./../../src";
import {SocketIOInstanceSocket} from "../../src/Type/types";

(async () => {
    await Server({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.SOCKETIO.Server,
        host : "0.0.0.0",
        port: 2818,
        onConnection : async (io) => {
          console.log(io.id)
        },
        licence: {
            method: "LICENCE_KEY_OFFLINE",
            key: "./dka.env"
        },
        options : {
            socket : {
                pingInterval : 1000,
                pingTimeout : 3000,
                connectTimeout : 5000
            }
        }
    }).then(async (result) => {
        console.log(result);
    }).catch(async (e) => {
        console.error(e);
    })
})();