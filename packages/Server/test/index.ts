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

    Server({
        engine : Options.ENGINE.FASTIFY,
        port : 2811
    }).then(async (server) => {
        console.log(server)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {
        console.error(error)
    });



    //mServer.engine.server.listen
})();