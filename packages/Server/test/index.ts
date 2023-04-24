import { Server, Options } from "../src";

(async () => {
    await Server({
        engine : Options.ENGINE.FASTIFY,
        host : Options.HOST.WILDCARD,
        app : async (app, opts, next) => {
            await app.get("/", async (req, res) => {
                res.send({ halo : "dunia"})
            })
            await next()
        },
        getConfig : async (config) => {
          console.log(config)
        }
    }).then(async (server) => {
        console.log(server.config)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {

    });



    //mServer.engine.server.listen
})();