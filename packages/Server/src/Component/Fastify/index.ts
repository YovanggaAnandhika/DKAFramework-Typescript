import fastify, { FastifyInstance } from "fastify";
import SocketIOFastify from "fastify-socket.io";
import {ConfigFastifyServer} from "./Interfaces/ConfigFastifyServer";
import {CallbackFastifyServer} from "./Interfaces/CallbackFastifyServer";
import {merge} from "lodash";
import cors from "@fastify/cors";
import DefaultConfigFastifyServer from "./Config/DefaultConfigFastifyServer";
import {FastifyHooks} from "./Component/FastifyHooks";
import {ServerOptions} from "socket.io";

export async function FASTIFY<Config extends ConfigFastifyServer>(configServer : Config) : Promise<CallbackFastifyServer> {
    let mFastify : FastifyInstance;
    return new Promise(async (resolve, rejected) => {
        configServer = await merge(DefaultConfigFastifyServer, configServer)
        mFastify = fastify(configServer.settings?.engine);
        await mFastify.register(cors, {
            origin : "*"
        });
        mFastify.register(SocketIOFastify, {

        })

        mFastify = await FastifyHooks(mFastify, configServer);

        (configServer.app !== undefined) ? await mFastify.register(configServer.app) : null;

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