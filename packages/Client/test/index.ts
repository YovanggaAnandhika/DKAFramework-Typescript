import Client, { Options } from "../src";

(async () => {
    let socketIO = await Client({
        state : Options.STATE.DEVELOPMENT,
        engine : Options.ENGINE.SOCKETIO,
        host : "127.0.0.1",
        port : 291
    });

    socketIO



})();