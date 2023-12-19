import {ConfigFastifyServer} from "./Interfaces/ConfigFastifyServer";
import {CallbackFastifyServer} from "./Interfaces/CallbackFastifyServer";
import {merge, mergeWith} from "lodash";

import DefaultConfigFastifyServer, {
    fastifyEngineSettingsDefaultHTTP,
    fastifyEngineSettingsDefaultHTTP2,
    fastifyEngineSettingsDefaultHTTPS
} from "./Config/DefaultConfigFastifyServer";
import {FastifyHooks} from "./Component/FastifyHooks";
import {FastifyPlugins} from "./Component/FastifyPlugins";
import {Options} from "../../index";
import {DEVELOPMENT} from "../../Types/ConfigServerTypes";
import fastify, {FastifyInstance} from "fastify";

import "./Types/ExtendedFastifyTypes";
import tcpPortUsed from "tcp-port-used";

export let mFastify : FastifyInstance;


function isElectron() {
    // Renderer process
    // @ts-ignore
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to false
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

export async function FASTIFY<Config extends ConfigFastifyServer>(configServer : Config) : Promise<CallbackFastifyServer> {
    return new Promise(async (resolve, rejected) => {
        await mergeWith(configServer, DefaultConfigFastifyServer);
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
                mFastify = fastify(configServer.settings?.engine.options);
                break;
        }

        await FastifyHooks(mFastify, configServer);
        await FastifyPlugins(mFastify, configServer);

        //###################################################
        //(configServer.app !== undefined) ? await configServer.app(mFastify) : null;
        mFastify = (configServer.app !== undefined) ? await mFastify.register(configServer.app as typeof mFastify.register.arguments) : mFastify;
        configServer.host = (configServer.state === DEVELOPMENT || configServer.state === undefined) ? configServer.host : Options.HOST.WILDCARD;
        //#######################################################################################################################################

        if (isElectron()){
            if (require.resolve("electron")){
                let { app } = require("electron");

                await app.on("before-quit", () => {
                    mFastify.close();
                    process.kill(process.pid)
                    process.exit(0);
                });

                process.on("SIGINT", () => {
                    mFastify.close();
                    process.kill(process.pid)
                    process.exit(0);
                })
            }
        }else{
            process.on("SIGINT", () => {
                mFastify.close();
                process.kill(process.pid);
                process.exit(0);
            });
        }
        //#######################################################################################################################################
        tcpPortUsed.check(configServer.port as number,configServer.host)
            .then(async (inUse) => {
                if (!inUse) {
                    mFastify.listen({ port : configServer.port, host : configServer.host }, async (error) => {
                        if (!error){
                            (configServer.getConfig !== undefined) ? configServer.getConfig(configServer) : null;
                            await resolve({ status : true, code : 200, msg : `Server is Successfully Running`, config : configServer });
                        }else{
                            (configServer.getConfig !== undefined) ? configServer.getConfig(configServer) : null;
                            await rejected({ status : true, code : 500, msg : `Server is Not Successfully Running`, error : error});
                            await process.exit();
                        }
                    });
                }else{
                    await rejected({ status : false, code : 502, msg : `Port in Used. Try another port. or kill process ${configServer.port} on this machine`})
                }
            })
            .catch(async (error) => {
                await rejected({ status : false, code : 500, msg : `error Check TCP Port Used`, error : error})
            });

    });
}


export default FASTIFY;