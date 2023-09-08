import {Options, SocketIO} from "../src";

(async () => {

    SocketIO({
        host : Options.HOST.LOCALHOST,
        port : 3821,
        io : async (io) => {
            io.on("hello", async (data) => {
                io.emit('hello',{ halo : "hello from client"});
            });
        },
        events : {
            onConnect : async () => {
              console.log("terhubung ke server");
            },
            onDisconnect : async (reason,desc ) => {
                console.log(reason)
            },
            onLatency : async (delay, type) => {
              console.log(`delay ${delay} ms, ${type}`);
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