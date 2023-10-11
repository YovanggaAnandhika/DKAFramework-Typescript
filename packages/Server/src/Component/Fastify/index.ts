import fastify, {FastifyInstance} from "fastify";
import {ConfigFastifyServer} from "./Interfaces/ConfigFastifyServer";
import {CallbackFastifyServer} from "./Interfaces/CallbackFastifyServer";
import {merge} from "lodash";

import DefaultConfigFastifyServer, {
    fastifyEngineSettingsDefaultHTTP,
    fastifyEngineSettingsDefaultHTTP2,
    fastifyEngineSettingsDefaultHTTPS
} from "./Config/DefaultConfigFastifyServer";
import {FastifyHooks} from "./Component/FastifyHooks";
import {FastifyPlugins} from "./Component/FastifyPlugins";
import {Options} from "../../index";
import {DEVELOPMENT} from "../../Types/ConfigServerTypes";
import isElectron from "is-electron";

export let mFastify : FastifyInstance

export async function FASTIFY<Config extends ConfigFastifyServer>(configServer : Config) : Promise<CallbackFastifyServer> {
    return new Promise(async (resolve, rejected) => {
        await merge(configServer, DefaultConfigFastifyServer)
        switch (configServer.settings.engine.type) {
            case Options.SETTINGS.ENGINE.PROTOCOL.HTTP :
                await merge(configServer.settings.engine, fastifyEngineSettingsDefaultHTTP);
                mFastify = fastify(configServer.settings?.engine.options);
                break;
            case Options.SETTINGS.ENGINE.PROTOCOL.HTTPS :
                await merge(configServer.settings.engine, fastifyEngineSettingsDefaultHTTPS);
                mFastify = fastify(configServer.settings?.engine.options);
                break;
            case Options.SETTINGS.ENGINE.PROTOCOL.HTTP2 :
                await merge(configServer.settings.engine, fastifyEngineSettingsDefaultHTTP2);
                console.log(configServer.settings.engine.options)
                mFastify = fastify(configServer.settings?.engine.options);
                break;
        }

        await FastifyPlugins(mFastify, configServer);
        await FastifyHooks(mFastify, configServer);
        //###################################################
        //(configServer.app !== undefined) ? await configServer.app(mFastify) : null;
        mFastify = (configServer.app !== undefined) ? await mFastify.register(configServer.app as typeof mFastify.register.arguments) : mFastify;
        configServer.host = (configServer.state === DEVELOPMENT || configServer.state === undefined) ? configServer.host : Options.HOST.WILDCARD;

        //#######################################################################################################################################
        if (isElectron()){
            if (require.resolve("electron")){
                let { app } = require("electron");
                await app.on("before-quit", async () => {
                    await mFastify.close();
                });

                process.on("SIGINT", async () => {
                    await mFastify.close();
                })
            }
        }else{
            process.on("SIGINT", async () => {
                await mFastify.close();
            })
        }

        //#######################################################################################################################################

        mFastify.listen({ port : configServer.port, host : configServer.host }, async (error) => {
            if (!error){
                (configServer.getConfig !== undefined) ? configServer.getConfig(configServer) : null;
                await resolve({ status : true, code : 200, msg : `Server is Successfully Running`, config : configServer });
            }else{
                (configServer.getConfig !== undefined) ? configServer.getConfig(configServer) : null;
                await rejected({ status : true, code : 500, msg : `Server is Not Successfully Running`, error : error});
                await process.exit();
            }
        })

    })
}


export default FASTIFY;