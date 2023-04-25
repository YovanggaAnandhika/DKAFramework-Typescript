import { Server, Options } from "../src";

(async () => {
    /*await Server({
        engine : Options.ENGINE.FASTIFY,
        host : Options.HOST.WILDCARD,
        app : async (app, opts, next) => {
            await app.all("/", async (req, res) => {
                // @ts-ignore
                console.log(req.query.redirect_uri)
                // @ts-ignore
                res.redirect(req.query.redirect_uri)
            })
            await next()
        },
        getConfig : async (config) => {
          //console.log(JSON.stringify(config))
        }
    }).then(async (server) => {
        console.log(server)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {

    });*/

    await Server({
        engine : Options.ENGINE.SOCKETIO,
        host : Options.HOST.WILDCARD,
        port : 2888,
        settings : {
            engine : {
                protocol : Options.SETTINGS.ENGINE.PROTOCOL.HTTP2
            },
        }
    }).then(async (server) => {
        console.log(server)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {
        console.error(error)
    });



    //mServer.engine.server.listen
})();