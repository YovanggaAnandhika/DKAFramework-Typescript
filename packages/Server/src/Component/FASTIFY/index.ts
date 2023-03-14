import {FastifyInstances} from "../../Type/types";
import Fastify, {FastifyInstance} from "fastify";
import {Logger} from "winston";
import {Plugins} from "./Plugins";
import {ConfigFastify} from "../../Interfaces/Config/Fastify";


/**
 * @param { ConfigFastify } config
 * @param logger
 * @param { FastifyInstances } config.app
 * @constructor
 * @return Promise<FastifyInstance>
 */

export const FASTIFY = async (config: ConfigFastify, logger: Logger): Promise<FastifyInstance> => {
    // **************************
    logger.info("starting the fastify engine");
    let mFastify = await Fastify(config.settings);
    logger.info("finish settings the fastify engine")
    /*let mApp = */
    logger.info("prepare loading plugin fastify engine")
    let mPluginsApp = (config.plugins !== undefined) ? await Plugins(config, logger, mFastify) : mFastify;
    logger.info("finish loading plugin fastify engine");
    logger.info("prepare register module fastify engine");
    let mApp = (config.settings?.registerModule !== undefined) ? await config.settings.registerModule(mFastify) : mPluginsApp;
    logger.info("finish register module fastify engine");

    return new Promise(async (resolve, rejected) => {
        logger.info(`try catch config app is starting`)
        try {
            logger.info(`checking entry point "app" undefined or not`)
            if (config.app !== undefined) {
                logger.info(`entry point "config.app" settings is defined. register`)
                await mApp.register(config.app);
                await resolve(mApp)
            } else {
                logger.error(`entry point "config.app" not defined. please declaration route function`)
                rejected({status: false, code: 500, msg: `app must Declaration For Routes`})
            }
        }catch (e) {
            logger.error(`detect unknown error try catch pointing register fastify engine`)
            await rejected(e);
        }
    })
};

export default FASTIFY;