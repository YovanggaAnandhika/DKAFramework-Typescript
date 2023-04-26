import { Server, Options } from "../src";

(async () => {

    await Server({
        engine : Options.ENGINE.FASTIFY,
        app : function (app, opts,next){

        },
        settings : {

        }
    }).then(async (server) => {
        console.log(server)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {

    });

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