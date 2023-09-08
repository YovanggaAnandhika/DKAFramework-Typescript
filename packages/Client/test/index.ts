import SocketIOInstance from "../src/Component/SocketIO";

(async () => {

    SocketIOInstance({
        host : "localhost",
        port : 3821,
        ns : "/dev",
        io : async (io) => {
            io.on("hello", async (data) => {
                console.log(data);
                io.emit('hello',{ halo : "hello from client"})
            });
        },
        events : {
            onConnect : async () => {
              console.log("terhubung ke server");
            },
            onDisconnect : async (reason,desc ) => {
                console.log(reason)
            },
            /*onConnectError : async (error) => {
              console.error(error)
            },*/
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
                reconnectionAttempts : 10000,
                reconnection : true,
                reconnectionDelay : 1000,
                reconnectionDelayMax : 5000
            }
        }
    }).connect();

})();