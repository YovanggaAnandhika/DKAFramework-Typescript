import { Server, Options } from "../dist";
import {Configuration} from "webpack";
import {WebpackMultiConfig, WebpackSingleConfig} from "../src/Component/Webpack/Types/WebpackTypesServer";
import { join } from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.WEBPACK,
        host : Options.HOST.LOCALHOST,
        port : 2888,
        webpack : {
            output : {
                path : join(__dirname,"./dist/"),
                filename: 'dkaframework.js'
            }
        }

    }).then(async (result) => {

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