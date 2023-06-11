import { Server, Options } from "./../src";
(async () => {

    Server<{ engine : "FASTIFY"}>({
        engine : Options.ENGINE.FASTIFY,
        host : Options.HOST.WILDCARD,
        port : 443,
        app : async (app, opts, next) => {
            await app.register(async (app, opts, next) => {
                await app.register(async (app, opts, next) => {

                    app.io.on("connection", async (io) => {
                        console.log(io.id)
                    });
                    next();
                });
                next();
            });
            next();
        },
        plugin : {
          socketIO : { enabled : true }
        },
        settings : {
            engine : {
                type : Options.SETTINGS.ENGINE.PROTOCOL.HTTP2,
                options : {

                }
            }
        }
    }).then(async (result) => {
        console.log("Server Berjalan")
    }).catch(async (error) => {
        console.log(error)
    })

    /*Server({
        engine : Options.ENGINE.FASTIFY,
        port : 2811
    }).then(async (server) => {
        console.log(server)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {
        console.error(error)
    });*/



    //mServer.engine.server.listen
})();