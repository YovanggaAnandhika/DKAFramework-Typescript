import fastify, {FastifyInstance} from "fastify";
import {ConfigSocketIOFastifySettings} from "../../../../../Interfaces/Config/SocketIO/Server";
import {Logger} from "winston";

let mHttp: FastifyInstance;

async function FastifySocketIOEngine(config: ConfigSocketIOFastifySettings, logger: Logger): Promise<FastifyInstance> {
    mHttp = (config.settings !== undefined) ? fastify(config?.settings.server) : fastify();
    logger.info(`socket.io server binding to protocol server http or https`)
    if (config.app !== undefined) {
        /*let mPluginsApp = (config.settings?.plugin !== undefined) ? await Plugins(config.settings?.server, logger, mHttp) : mHttp;*/
        await mHttp.register(config?.app)
    }
    return mHttp;
}

export default FastifySocketIOEngine;