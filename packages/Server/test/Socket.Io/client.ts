import {Client, Options} from "./../../src";

(async () => {
    await Client({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : Options.Server.Engine.SOCKETIO.Client,
        host : "localhost",
        port : 2818,
        licence: {
            method: "LICENCE_KEY_OFFLINE",
            key: "./dka.env"
        },
        settings : {
            secure : false,
            forceNew : true
        },
        on : {
            Connect : async (io) => {
              console.log(JSON.stringify(io))
            },
            Disconnect : async (id) => {
                console.log(`user disconnect ${id?.id}`)
            },
            Manager : {
                ReconnectAttempt : async (attempt) => {
                    console.log(`Mencoba Kembali Menghubungkan dalam ${attempt}`)
                },
                Reconnect : async (attempt) => {
                    console.log(`sedang berusaha menghubungkan ke ${attempt}`)
                },
                Ping : async (delay) => {
                    console.log(delay)
                }
            },
        }
        /*onConnectError : async (error) => {
          console.error(JSON.stringify(error.responseText))
        },*/
    }).then(async (result) => {
        result.io.connect()
        //console.log(result)
    }).catch(async (e) => {
        console.error(e);
    })
})();