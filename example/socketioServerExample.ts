import { Server, Options } from "@dkaframework/server";

(async () => {
    Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.SOCKETIO.Server,
        host : Options.Server.Host.LOCALHOST,
        port : Options.Server.Port.DEFAULT,
        io : async (io) => {
            //@todo Your Code After Socket Server Created
        },
        onConnection : async (io) => {
            //@todo code run if client connected
        },
        onDisconnect : async (io) => {
            //@todo code run if client disconnected
        },
        getConfig : async (config) => {
            //@todo get final config after server start.
        },
        onError : async (error) => {
            //@todo get Error After Server Run
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.log(error)
    })
})()