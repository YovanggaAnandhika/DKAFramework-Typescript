import fastify, { FastifyInstance } from "fastify";
import {ConfigFastifyServer} from "./Interfaces/ConfigFastifyServer";
import {CallbackFastifyServer} from "./Interfaces/CallbackFastifyServer";
import {merge} from "lodash";
import DefaultConfigFastifyServer from "./Config/DefaultConfigFastifyServer";

export async function FASTIFY<Config extends ConfigFastifyServer>(configServer : Config) : Promise<CallbackFastifyServer> {
    let mFastify : FastifyInstance;
    return new Promise(async (resolve, rejected) => {
        configServer = await merge(DefaultConfigFastifyServer, configServer)
        mFastify = fastify(configServer.settings?.engine);
        if (configServer.app !== undefined){
            await mFastify.register(configServer.app)
        }
        mFastify.listen({ port : configServer.port, host : configServer.host }, async (error) => {
            if (!error){
                (configServer.getConfig !== undefined) ? configServer.getConfig(configServer) : null;
                await resolve({ status : true, code : 200, msg : `Server is Successfully Running`, config : configServer })
            }else{
                (configServer.getConfig !== undefined) ? configServer.getConfig(configServer) : null;
                await rejected({ status : true, code : 200, msg : `Server is Successfully Running`, error : error})
            }
        })
    })
}

export default FASTIFY;