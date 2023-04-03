import {FastifyInstance} from "fastify";
import {ConfigFastify} from "../../../Interfaces/Config/Fastify";
import {Logger} from "winston";
import ngrok from "ngrok";
import {Server} from "socket.io";

function checkModuleExist(name : string){
    try {
        require.resolve(name);
        return true;
    }catch (e) {
        return false;
    }
}

export async function ServerViewInstance(config: ConfigFastify, logger: Logger, app: FastifyInstance): Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.pointOfView !== undefined) {
            if (config.plugins?.pointOfView?.enabled) {
                /** ================= DEBUG CONSOLE ======================= **/
                logger.info("plugins point of view enabled. check the module resolution `@fastify/view` ")
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("@fastify/view")) {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.info("plugins point of view enabled. `@fastify/view` is exist ")
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (config.plugins.pointOfView.settings !== undefined) {
                        await app.register(require("@fastify/view"), config.plugins.pointOfView.settings);
                        await resolve(app);
                    } else {
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `point of view is Enabled, but plugins.pointOfView.settings. not declare`
                        })
                    }
                } else {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.error("plugins point of view enabled. but `@fastify/view` not found. please install first")
                    /** ================= DEBUG CONSOLE ======================= **/
                    rejected({
                        status: false,
                        code: 500,
                        msg: `plugin point of view enabled. but module not found. skipped`
                    })
                }
            } else {
                await resolve(app);
            }
        } else {
            await resolve(app);
        }

    })
}

export async function ServerFormBodyInstance(config: ConfigFastify, logger: Logger, app: FastifyInstance): Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.formBody !== undefined) {
            if (config.plugins?.formBody?.enabled) {
                /** ================= DEBUG CONSOLE ======================= **/
                logger.info("plugins point of view enabled. check the module resolution `@fastify/formBody` ")
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("@fastify/view")) {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.info("plugins point of view enabled. `@fastify/formBody` is exist ")
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (config.plugins.formBody.settings !== undefined) {
                        await app.register(require("@fastify/formbody"));
                        await resolve(app);
                    } else {
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `point of view is Enabled, but plugins.formBody.settings. not declare`
                        })
                    }
                } else {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.error("plugins point of view enabled. but `@fastify/formBody` not found. please install first")
                    /** ================= DEBUG CONSOLE ======================= **/
                    rejected({status: false, code: 500, msg: `form Body enabled. but module not found. skipped`})
                }
            } else {
                await resolve(app);
            }
        } else {
            await resolve(app);
        }

    })
}

export async function ServerStaticInstance(config: ConfigFastify, logger: Logger, app: FastifyInstance): Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.static !== undefined) {
            if (config.plugins?.static?.enabled) {
                /** ================= DEBUG CONSOLE ======================= **/
                logger.info("plugins static enabled. check the module resolution `@fastify/static` ")
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("@fastify/static")) {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.info("plugins point of view enabled. `@fastify/static` is exist ")
                    /** ================= DEBUG CONSOLE ======================= **/
                    if (config.plugins.static.settings) {
                        await app.register(require("@fastify/static"), config.plugins.static.settings);
                        await resolve(app);
                    } else {
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `static is Enabled, but plugins.static.settings. not declare`
                        })
                    }
                } else {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.error("plugins static enabled. but `@fastify/static` not found. please install first")
                    /** ================= DEBUG CONSOLE ======================= **/
                    rejected({
                        status: false,
                        code: 500,
                        msg: `plugin point of view enabled. but module not found. skipped`
                    })
                }
            } else {
                /** ================= DEBUG CONSOLE ======================= **/
                logger.info("plugins static not enabled. set enabled to used feature ")
                /** ================= DEBUG CONSOLE ======================= **/
                await resolve(app);
            }
        } else {
            /** ================= DEBUG CONSOLE ======================= **/
            logger.info("plugins static not settings. set enabled to used feature. skipped the plugins ")
            /** ================= DEBUG CONSOLE ======================= **/
            await resolve(app);
        }

    })
}

export async function ServerNgrokTunnelingInstance(config: ConfigFastify, logger: Logger, app: FastifyInstance): Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.ngrok !== undefined) {
            logger.info("plugins ngrok not undefined. start checking `ngrok` module resolution.")
            if (config.plugins?.ngrok?.enabled) {
                /** ================= DEBUG CONSOLE ======================= **/
                logger.info("plugins ngrok is enabled. start checking `ngrok` module resolution.")
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("ngrok")) {
                    logger.info("plugins ngrok is enabled. ngrok module is exist.")
                    if (config.plugins.ngrok.settings) {
                        logger.info("plugins ngrok is enabled. ngrok module is exist. settings is exist")
                        const ngrok = require("ngrok");
                        await ngrok.authtoken(config.plugins.ngrok.settings.authToken as string)
                            .then(async () => {
                                logger.info("ngrok starting connect")
                                await ngrok.connect({
                                    proto: config.plugins?.ngrok?.settings?.proto,
                                    addr: config.port
                                }).then(async () => {
                                    logger.info("ngrok plugins is successfully connect")
                                    let api = ngrok.getApi();
                                    switch (config.plugins?.ngrok?.settings?.proto) {
                                        case "http" :
                                            logger.info("ngrok plugins is successfully connect. is HTTP Protocol")
                                            await api?.listTunnels()
                                                .then(async (result: any) => {
                                                    console.log([result.tunnels[0].public_url, result.tunnels[1].public_url])
                                                })
                                                .catch(async (error: any) => {
                                                    await rejected({
                                                        status: false,
                                                        code: 500,
                                                        msg: `ngrok list Tunnels Error`,
                                                        error: error
                                                    });
                                                });
                                            await resolve(app);
                                            break;
                                        case "tcp" :
                                            logger.info("ngrok plugins is successfully connect. is TCP Protocol")
                                            await api?.listTunnels()
                                                .then(async (result: any) => {
                                                    console.log([result.tunnels[0].public_url])
                                                })
                                                .catch(async (error: any) => {
                                                    await rejected({
                                                        status: false,
                                                        code: 500,
                                                        msg: `ngrok list Tunnels Error`,
                                                        error: error
                                                    });
                                                })
                                            await resolve(app);
                                            break;
                                        default :
                                            logger.error(`ngrok unknown proto method | ERROR_PROTO_METHOD`)
                                            await rejected({
                                                status: false,
                                                code: 500,
                                                msg: `ngrok unknown proto method`
                                            });
                                    }

                                }).catch(async (error : any) => {
                                    logger.info(`ngrok connect error | ${error}`)
                                    await rejected({
                                        status: false,
                                        code: 500,
                                        msg: `ngrok error connect`,
                                        error: error
                                    });
                                })
                            }).catch(async (error : any) => {
                                logger.error(`ngrok plugin auth token error, please correction auth token | ${error}`)
                                await rejected({status: false, code: 500, msg: `ngrok error auth token`, error: error});
                            });
                    } else {
                        logger.warning("plugins ngrok is enabled. ngrok module is exist. settings not declaration")
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `ngrok is Enabled, but plugins.ngrok.settings. not declare`
                        });
                    }
                } else {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.warning("plugin ngrok is enabled. but module `ngrok` is not found. skipped")
                    /** ================= DEBUG CONSOLE ======================= **/
                    await rejected({
                        status: false,
                        code: 500,
                        msg: `plugin ngrok enabled. but module not found. skipped`
                    })
                }
            } else {
                logger.info(`ngrok plugin not enabled. skipped module register`)
                await resolve(app);
            }
        } else {
            logger.info(`ngrok plugin not undefined. skipped module register`)
            await resolve(app);
        }
    })
}

export async function ServerSocketIOInstance(config: ConfigFastify, logger: Logger, app: FastifyInstance): Promise<FastifyInstance> {
    return new Promise(async (resolve, rejected) => {
        if (config.plugins?.socketIO !== undefined) {
            logger.info("socket.io server undefined not undefined. start checking `ngrok` module resolution.")
            if (config.plugins?.socketIO?.enabled) {
                /** ================= DEBUG CONSOLE ======================= **/
                logger.info("plugin socket.io server is enabled. start checking `socket.io` module resolution.")
                /** ================= DEBUG CONSOLE ======================= **/
                if (checkModuleExist("socket.io")) {
                    logger.info("plugins socket.io is enabled. socket.io module is exist.")
                    if (config.plugins.socketIO.settings) {
                        logger.info("plugins socket.io is enabled. socket.io module is exist. settings is exist")
                        const socketIO = new Server(app.server, config.plugins.socketIO.settings)
                        let m = await app.decorate("socketIO", socketIO);
                    } else {
                        logger.warning("plugins socket.io is enabled. socket.io module is exist. settings not declaration")
                        await rejected({
                            status: false,
                            code: 500,
                            msg: `socket.io is Enabled, but plugins.socketIO.settings. not declare`
                        });
                    }
                } else {
                    /** ================= DEBUG CONSOLE ======================= **/
                    logger.warning("plugin socket.io is enabled. but module `socket.io` is not found. skipped")
                    /** ================= DEBUG CONSOLE ======================= **/
                    await rejected({
                        status: false,
                        code: 500,
                        msg: `plugin socket.io enabled. but module not found. skipped`
                    })
                }
            } else {
                logger.info(`socket.io plugin not enabled. skipped module register`)
                await resolve(app);
            }
        } else {
            logger.info(`socket.io plugin not undefined. skipped module register`)
            await resolve(app);
        }
    })
}

export async function Plugins(config: ConfigFastify, logger: Logger, app: FastifyInstance): Promise<FastifyInstance> {
    let mApp: FastifyInstance = app;
    logger.info("starting promise plugin fastify engine");
    await Promise.all([
        await ServerViewInstance(config, logger, app),
        await ServerStaticInstance(config, logger, app),
        await ServerFormBodyInstance(config, logger, app),
        await ServerNgrokTunnelingInstance(config, logger, app)
    ]).then(async () => {
        mApp = app;
    }).catch(async (error) => {
        logger.error(`detecting plugin fastify register | ${error}`)
        await Promise.reject(error)
    })
    return mApp;
}