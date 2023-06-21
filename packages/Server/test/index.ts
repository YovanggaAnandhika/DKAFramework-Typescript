import { Server, Options } from "./../src";
(async () => {

    Server({
        engine : Options.ENGINE.FASTIFY,
        host : Options.HOST.WILDCARD,
        port : 8233,
        app : async (app, opts, next) => {
            app.get("/",async (request, response) => {
                request.headers["Bypass-Tunnel-Reminder"] = "";
                response.send("halo")
            })
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
            },
            ngrok : {
                enabled : true,
                authToken : "g3UD9sgpzrW41i6YGVWH_3w7oA58kHxKDgSNpmncba"
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