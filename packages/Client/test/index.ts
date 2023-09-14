import {Options, SocketIO} from "../src";

(async () => {

    let io = SocketIO({
        host : Options.HOST.LOCALHOST,
        port : 53310,
        events : {
            onConnect : async () => {

            },
            onDisconnect : async (reason,desc ) => {
                console.log(reason)
            },
            onLatency : async (responseLatency) => {
              console.log(`CLIENT delay ${responseLatency.delay} ms`);
            },
            Manager : {
                onReconnectAttempt : async (attempt) => {
                  console.log(`menghubungkan kembali ${attempt} `)
                }
            }
        },
        settings : {
            socket : {
                secure: true,
            }
        }
    }).connect();

})();