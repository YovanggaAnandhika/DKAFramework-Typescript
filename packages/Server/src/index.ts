'use strict';
'use warnings';
/** module from package.json **/
import * as DKATypes from "./Type/types";
import {merge} from "lodash";
import winston, {format, Logger} from "winston";
import * as tcpPortUsed from "tcp-port-used";
import {DKAClientCallback, DKAServerCallback} from "./Interfaces/Callback";
/** declare interface **/
import {ConfigFastify} from "./Interfaces/Config/Fastify";
import {ConfigSocketIO} from "./Interfaces/Config/SocketIO/Server";
import {ConfigSocketIOClient} from "./Interfaces/Config/SocketIO/Client";
import {ConfigReactJS} from "./Interfaces/Config/ReactJS";
import {ConfigExpressJS} from "./Interfaces/Config/Express";
/** options **/
import Options, * as BaseFramework from "./Const";
/** configuration **/
import {
    ExpressJSConfigurationDefault,
    FastifyConfigurationDefault,
    ReactJSConfigurationDefault,
    SocketIOClientConfigurationDefault,
    SocketIOConfigurationDefault
} from "./Config";
/** Module Component **/
import FASTIFY from "./Component/FASTIFY";
import SOCKET_IO from "./Component/SOCKET.IO/Server";
import REACTJS from "./Component/REACTJS";
import SOCKET_IO_CLIENT from "./Component/SOCKET.IO/Client";
import EXPRESS from "./Component/EXPRESS";
import path from "path";
import {existsSync} from "fs";
import * as dotEnv from "dotenv";
import Encryption from "@dkaframework/security";
import moment from "moment-timezone";
import {FastifyInstance} from "fastify";
import {Server as HTTPServer} from "http";
import {Server as HTTPSServer} from "https";

/** Declare Variable **/
let mTempFastify: ConfigFastify | never = {engine: "FASTIFY"};
let mTempSocketIO: ConfigSocketIO = {engine: "SOCKET.IO"};
let mTempSocketIOClient: ConfigSocketIOClient = {engine: "SOCKET.IO-CLIENT"};
let mTempReactJS: ConfigReactJS = {engine: "REACTJS"};
let mTempExpressJS: ConfigExpressJS = {engine: "EXPRESSJS"};

const {timestamp, printf} = format;


/**
 *
 * @param {ConfigFastify | ConfigSocketIO | ConfigReactJS | ConfigExpressJS} config
 * @constructor
 */
export async function Server(config: ConfigFastify | ConfigSocketIO | ConfigReactJS | ConfigExpressJS = FastifyConfigurationDefault): Promise<DKAServerCallback> {
    let logger: Logger;

    return new Promise(async (resolve, rejected) => {
        let enc = new Encryption({
            secretKey: `INFKE#fh3fh3ifjhKCJN38u8J#O*FOF`
        });

        async function Runner(licenceInfo ?: any) {
            switch (config.engine) {
                case Options.Server.Engine.FASTIFY :
                    //## Set Configuration merger
                    mTempFastify = await merge(FastifyConfigurationDefault, config);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempFastify.getConfig;
                    // Separator
                    await config.getConfig?.(mTempFastify as ConfigFastify);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    logger = winston.createLogger({
                        format: winston.format.combine(
                            winston.format.label({label: `FASTIFY`}),
                            timestamp({format: "DD-MM-YYYY | HH:mm:ss:SS"}),
                            printf(({message, timestamp, label, separatorNewProccess}) => {
                                if (separatorNewProccess !== undefined && separatorNewProccess === true) {
                                    return ``;
                                } else {
                                    return `DKA | ${timestamp} | ${mTempFastify.state?.toLocaleUpperCase()} | V.${BaseFramework.Options.Information.version} | ${label} | ${message}`;
                                }

                            })
                        ),
                        transports: (mTempFastify.logger?.enabled === true) ? [
                            new winston.transports.File({filename: mTempFastify.logger?.path?.error, level: 'error'}),
                            new winston.transports.File({filename: mTempFastify.logger?.path?.info, level: 'info'}),
                            new winston.transports.File({
                                filename: mTempFastify.logger?.path?.warning,
                                level: "warning"
                            })
                        ] : [new winston.transports.Console()],
                    });
                    logger.info("", {separatorNewProccess: true});
                    //$$$$$$$$$$$ CALL TYPE ENGINE FASTIFY $$$$$$$$$$$$
                    await FASTIFY(mTempFastify, logger)
                        .then(async (app) => {
                            logger.info(`finished to processing fastify engine instance. checking port used`)
                            //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                            await tcpPortUsed.check({
                                host: mTempFastify.host,
                                port: mTempFastify.port as number,
                            }).then(async (inUse) => {
                                if (!inUse) {
                                    logger.info(`port not in use. port is available`);
                                    //$$$$$$$$$$$ ACTION LISTEN SERVER IF PORT NOT USED $$$$$$$$$$$$
                                    await app.listen({
                                        host: mTempFastify.host,
                                        port: mTempFastify.port as number,
                                    }, async (error) => {
                                        if (!error) {
                                            logger.info(`engine fastify fully start done. all green`);
                                            //logger.warn(`licence key activated by ${licenceInfo.name} until ${moment.unix(licenceInfo.expiresTo).format(`DD-MM-YYYY`)}`)
                                            await resolve({
                                                status: true,
                                                code: 200,
                                                msg: `Server "FASTIFY" Running Successfully`,
                                                settings: mTempFastify,
                                                metadata: {
                                                    author: Options.Information.author,
                                                    version: Options.Information.version
                                                }
                                            });
                                        } else {
                                            logger.info(`engine fastify failed to listen | ${error}`);
                                            await rejected({
                                                status: false,
                                                code: 500,
                                                msg: `Server "FASTIFY" Running Failed`,
                                                error: {errorNames: "DKA_SERVER_LISTEN_FAILED", raw: error}
                                            });
                                            setTimeout(async () => {
                                                await process.exit(0)
                                            }, 2000);
                                        }
                                    });
                                    //$$$$$$$$$$$ END ACTION LISTEN SERVER IF PORT NOT USED $$$$$$$$$$$$
                                } else {
                                    logger.error(`port in use. port is not available. stopped proccess`);
                                    await rejected({
                                        status: false,
                                        code: 500,
                                        msg: `Server "FASTIFY" Running Failed`,
                                        error: {errorNames: "DKA_PORT_SERVER_IN_USE"}
                                    });
                                    setTimeout(async () => {
                                        await process.exit(0)
                                    }, 2000)
                                }
                            }, async (err) => {
                                logger.error(`port checking failed | ${err}`);
                                await rejected({
                                    status: false,
                                    code: 500,
                                    msg: `Failed, to Check Port Server`,
                                    error: {errorNames: "DKA_PORT_SERVER_FAILED_CHECK", raw: err}
                                });
                                setTimeout(async () => {
                                    await process.exit(0)
                                }, 2000)
                            });
                            //$$$$$$$$$$$ END CHECK PORT USED $$$$$$$$$$$$
                        })
                        .catch(async (e) => {
                            logger.error(`fastify engine instance error detected | ${e}`);
                            await rejected(e)
                        });
                    //$$$$$$$$$$$ END CALL TYPE ENGINE FASTIFY $$$$$$$$$$$$
                    break;
                case Options.Server.Engine.SOCKETIO.Server :
                    //## Set Configuration merger
                    mTempSocketIO = await merge(SocketIOConfigurationDefault, config);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempSocketIO.getConfig;
                    await config.getConfig?.(mTempSocketIO as ConfigSocketIO);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    logger = winston.createLogger({
                        format: winston.format.combine(
                            winston.format.label({label: `SOCKET.IO_SERVER`}),
                            timestamp({format: "DD-MM-YYYY | HH:mm:ss:SS"}),
                            printf(({message, timestamp, label, separatorNewProccess}) => {
                                if (separatorNewProccess !== undefined && separatorNewProccess === true) {
                                    return ``;
                                } else {
                                    return `DKA | ${timestamp} | ${mTempSocketIO.state?.toLocaleUpperCase()} | V.${BaseFramework.Options.Information.version} | ${label} | ${message}`;
                                }

                            })
                        ),
                        transports: (mTempSocketIO.logger?.enabled === true) ? [
                            new winston.transports.File({filename: mTempSocketIO.logger?.path?.error, level: 'error'}),
                            new winston.transports.File({filename: mTempSocketIO.logger?.path?.info, level: 'info'}),
                            new winston.transports.File({
                                filename: mTempSocketIO.logger?.path?.warning,
                                level: "warning"
                            }),
                            new winston.transports.Console()
                        ] : [new winston.transports.Console()],
                    });
                    logger.info("", {separatorNewProccess: true});
                    //##################################################################
                    logger.info("starting socket.io server engine.")
                    await SOCKET_IO(mTempSocketIO, logger)
                        .then(async (http) => {
                            switch (config.options?.server?.protocol) {
                                case "FASTIFY" :
                                    (http as FastifyInstance).listen({
                                        host: (config.host !== undefined) ? config.host : "localhost",
                                        port: config.port as number,
                                    }, async (error, address) => {
                                        if (!error) {
                                            //logger.warn(`licence key activated by ${licenceInfo.name} until ${moment.unix(licenceInfo.expiresTo).format(`DD-MM-YYYY`)}`)
                                            await resolve({
                                                status: true,
                                                code: 200,
                                                msg: `Server "SOCKET.IO" Running Successfully`,
                                                settings: mTempSocketIO,
                                                metadata: {
                                                    author: Options.Information.author,
                                                    version: Options.Information.version
                                                }
                                            });
                                        } else {
                                            await rejected({
                                                status: false,
                                                code: 500,
                                                msg: `Server Running Failed`,
                                                error: {
                                                    errorNames: "DKA_SERVER_FASTIFY_SOCKET_IO_ERROR",
                                                    raw: error
                                                }
                                            });
                                        }
                                    })
                                    break;
                                case "HTTPS" :
                                    await (http as HTTPSServer).listen(mTempSocketIO.port, async () => {
                                        //logger.warn(`licence key activated by ${licenceInfo.name} until ${moment.unix(licenceInfo.expiresTo).format(`DD-MM-YYYY`)}`)
                                        await resolve({
                                            status: true,
                                            code: 200,
                                            msg: `Server "SOCKET.IO" Running Successfully`,
                                            settings: mTempSocketIO,
                                            metadata: {
                                                author: Options.Information.author,
                                                version: Options.Information.version
                                            }
                                        });
                                    });
                                    break;
                                default :
                                    await (http as HTTPServer).listen(mTempSocketIO.port, async () => {
                                        //logger.warn(`licence key activated by ${licenceInfo.name} until ${moment.unix(licenceInfo.expiresTo).format(`DD-MM-YYYY`)}`)
                                        await resolve({
                                            status: true,
                                            code: 200,
                                            msg: `Server "SOCKET.IO" Running Successfully`,
                                            settings: mTempSocketIO,
                                            metadata: {
                                                author: Options.Information.author,
                                                version: Options.Information.version
                                            }
                                        });
                                    });
                                    break;
                            }

                        }).catch(async (error) => {
                            await rejected({
                                status: false,
                                code: 500,
                                msg: `Server Running Failed`,
                                error: {
                                    errorNames: "DKA_SERVER_HTTP_SOCKET_IO_ERROR",
                                    raw: error
                                }
                            });
                            setTimeout(async () => {
                                await process.exit(0);
                            }, 2000);
                        });
                    break;
                case Options.Server.Engine.REACTJS :
                    //## Set Configuration merger
                    mTempReactJS = await merge(ReactJSConfigurationDefault, config);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempReactJS.getConfig;
                    await config.getConfig?.(mTempReactJS as ConfigReactJS);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    logger = winston.createLogger({
                        format: winston.format.combine(
                            winston.format.label({label: `SOCKET.IO_SERVER`}),
                            timestamp({format: "DD-MM-YYYY | HH:mm:ss:SS"}),
                            printf(({message, timestamp, label, separatorNewProccess}) => {
                                if (separatorNewProccess !== undefined && separatorNewProccess === true) {
                                    return ``;
                                } else {
                                    return `DKA | ${timestamp} | ${mTempSocketIO.state?.toLocaleUpperCase()} | V.${BaseFramework.Options.Information.version} | ${label} | ${message}`;
                                }

                            })
                        ),
                        transports: (mTempSocketIO.logger?.enabled === true) ? [
                            new winston.transports.File({filename: mTempSocketIO.logger?.path?.error, level: 'error'}),
                            new winston.transports.File({filename: mTempSocketIO.logger?.path?.info, level: 'info'}),
                            new winston.transports.File({
                                filename: mTempSocketIO.logger?.path?.warning,
                                level: "warning"
                            })
                        ] : [new winston.transports.Console()],
                    });
                    logger.info("", {separatorNewProccess: true});
                    //##################################################################
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    await REACTJS(mTempReactJS, logger)
                        .then(async (REACTJS_CALLBACK) => {
                            await REACTJS_CALLBACK.WebpackDev.start()
                                .then(async () => {
                                    await resolve({
                                        status: true,
                                        code: 200,
                                        msg: `Server "REACT" Running Successfully`,
                                        settings: mTempReactJS,
                                        metadata: {
                                            author: Options.Information.author,
                                            version: Options.Information.version
                                        }
                                    });
                                })
                                .catch(async (error) => {
                                    await rejected({
                                        status: false,
                                        code: 500,
                                        msg: `Server Listenning Failed`,
                                        error: {
                                            errorNames: "DKA_SERVER_REACT_JS_LISTENING_ERROR",
                                            raw: error
                                        }
                                    });
                                    setTimeout(async () => {
                                        await process.exit(0);
                                    }, 2000);
                                });
                        })
                        .catch(async (error) => {
                            await rejected({
                                status: false,
                                code: 500,
                                msg: `Server Running Failed`,
                                error: {
                                    errorNames: "DKA_SERVER_REACT_JS_ERROR",
                                    raw: error
                                }
                            });
                            setTimeout(async () => {
                                await process.exit(0);
                            }, 2000);
                        });
                    break;
                case Options.Server.Engine.EXPRESSSJS :
                    //## Set Configuration merger
                    mTempExpressJS = await merge(ExpressJSConfigurationDefault, config);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempExpressJS.getConfig;
                    await config.getConfig?.(mTempExpressJS as ConfigExpressJS);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    await EXPRESS(mTempExpressJS)
                        .then(async (server) => {
                            //$$$$$$$$$$$ CHECK PORT USED $$$$$$$$$$$$
                            await tcpPortUsed.check({
                                host: mTempExpressJS.host,
                                port: mTempExpressJS.port as number,
                            }).then(async (inUse: boolean) => {
                                if (!inUse) {
                                    await server.listen(mTempExpressJS.port as number, mTempExpressJS.host as string, async () => {
                                        await resolve({
                                            status: true,
                                            code: 200,
                                            msg: `Server "Express" Running Successfully`,
                                            settings: mTempExpressJS,
                                            metadata: {
                                                author: Options.Information.author,
                                                version: Options.Information.version
                                            }
                                        });
                                    })
                                } else {
                                    await rejected({
                                        status: false,
                                        code: 500,
                                        msg: `Server "FASTIFY" Running Failed`,
                                        error: {errorNames: "DKA_PORT_SERVER_IN_USE"}
                                    });
                                    setTimeout(async () => {
                                        await process.exit(0)
                                    }, 2000)
                                }
                            }).catch(async (error: Error | any) => {
                                await rejected({
                                    status: false,
                                    code: 500,
                                    msg: `Failed, to Check Port Server`,
                                    error: {errorNames: "DKA_PORT_SERVER_FAILED_CHECK", raw: error}
                                });
                                setTimeout(async () => {
                                    await process.exit(0)
                                }, 2000)
                            })
                        })
                        .catch(async (error) => {

                        })
                    break;
                default :
                    await rejected({status: false, code: 500, msg: `illegal method unknown or not available`});
                    //await process.exit(0)
                    break;
            }
        }

        await Runner()
       /* await checkLicence(config)
            .then(async (resultLicence) => {
                await Runner(resultLicence)
            })
            .catch(async (error) => {
                rejected(error)
            });*/


    });
}

export async function Client(config: ConfigSocketIOClient = SocketIOClientConfigurationDefault): Promise<DKAClientCallback> {
    let logger: Logger;
    return new Promise(async (resolve, rejected) => {
        //Runner Apps
        async function Runner(licenceInfo ?: any) {
            switch (config.engine) {
                case Options.Server.Engine.SOCKETIO.Client :
                    //## Set Configuration merger
                    mTempSocketIOClient = await merge(SocketIOClientConfigurationDefault, config);
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    delete mTempSocketIOClient.getConfig;
                    await config.getConfig?.(mTempSocketIOClient as ConfigSocketIOClient);
                    logger = winston.createLogger({
                        format: winston.format.combine(
                            winston.format.label({label: `SOCKET.IO-CLIENT`}),
                            timestamp({format: "DD-MM-YYYY | HH:mm:ss:SS"}),
                            printf(({message, timestamp, label, separatorNewProccess}) => {
                                if (separatorNewProccess !== undefined && separatorNewProccess === true) {
                                    return ``;
                                } else {
                                    return `DKA | ${timestamp} | ${mTempSocketIOClient.state?.toLocaleUpperCase()} | V.${BaseFramework.Options.Information.version} | ${label} | ${message}`;
                                }

                            })
                        ),
                        transports: (mTempFastify.logger?.enabled === true) ? [
                            new winston.transports.File({
                                filename: mTempSocketIOClient.logger?.path?.error,
                                level: 'error'
                            }),
                            new winston.transports.File({
                                filename: mTempSocketIOClient.logger?.path?.info,
                                level: 'info'
                            }),
                            new winston.transports.File({
                                filename: mTempSocketIOClient.logger?.path?.warning,
                                level: "warning"
                            })
                        ] : [new winston.transports.Console()],
                    });
                    //$$$$$$$$$$$ DELETE GET CONFIG FUNCTION FOR GET CONFIG $$$$$$$$$$$$
                    await SOCKET_IO_CLIENT(mTempSocketIOClient, logger)
                        .then(async (io) => {
                            //logger.warn(`licence key activated by ${licenceInfo.name} until ${moment.unix(licenceInfo.expiresTo).format(`DD-MM-YYYY`)}`)
                            let mCallback: DKAClientCallback = {
                                status: true,
                                code: 200,
                                io: io,
                                msg: `Server "SOCKET.IO-CLIENT" Running Successfully`,
                                settings: mTempSocketIOClient,
                                metadata: {
                                    author: Options.Information.author,
                                    version: Options.Information.version
                                }
                            }
                            await resolve(mCallback as DKAClientCallback);
                        })
                        .catch(async (error: Error | any) => {
                            await rejected({
                                status: false,
                                code: 500,
                                msg: `Server Running Failed`,
                                error: {
                                    errorNames: "DKA_SERVER_HTTP_SOCKET_IO_CLIENT_ERROR",
                                    raw: error
                                }
                            });
                            setTimeout(async () => {
                                await process.exit(0);
                            }, 2000);
                        })
                    break;
                default :
                    await rejected({status: false, code: 500, msg: `illegal method unknown or not available`});
                    //await process.exit(0)
                    break;
            }
        }

        //Checking This Licence Program
        await Runner()
        /*await checkLicence(config)
            .then(async (resultLicence) => {
                await Runner(resultLicence)
            })
            .catch(async (error) => {
                await rejected(error)
            });*/

    });
}


const checkLicence = (config: ConfigFastify | ConfigSocketIOClient | ConfigSocketIO | ConfigReactJS | ConfigExpressJS = FastifyConfigurationDefault): Promise<Object> => {

    return new Promise(async (resolve, rejected) => {
        let enc = new Encryption({
            secretKey: `OICJo9eufjg4kjli4gjligj4igj4i`
        });

        if (config?.licence !== undefined) {
            switch (config?.licence.method) {
                case "LICENCE_KEY_OFFLINE" :
                    if (existsSync(path.resolve(`${config?.licence.key}`))) {
                        await dotEnv.config({
                            path: config.licence.key
                        });
                        setInterval(async (config) => {
                            await dotEnv.config({
                                path: config?.licence.key,
                                override: true
                            });
                        }, 2000)
                        if (process.env.LICENCE_KEY !== undefined) {
                            try {
                                let mData = enc.decodeIvSync(process.env.LICENCE_KEY) as any;
                                if (mData !== undefined) {
                                    let mTimeNow = moment().unix();
                                    let mDiffTimeLicence = (mData.expiresTo - mTimeNow);
                                    if (mDiffTimeLicence > 0) {
                                        await resolve(mData)
                                    } else {
                                        await rejected({
                                            status: false,
                                            code: 501,
                                            msg: `Licence Has Expires. please renew licence from developer to used`
                                        })
                                    }
                                } else {
                                    await rejected({
                                        status: false,
                                        code: 502,
                                        msg: `Illegal Licence Key. Please Insert Correct Licence Key`
                                    })
                                }

                            } catch (e) {
                                await rejected({
                                    status: false,
                                    code: 505,
                                    msg: `licence data not valid "LICENCE_KEY" in ${config?.licence.key}. check the licence key !`
                                })
                            }
                        } else {
                            rejected({
                                status: false,
                                code: 500,
                                msg: `field "LICENCE_KEY" in ${config.licence.key} is not exist. please set first `
                            });
                        }

                    } else {
                        try {
                            let mData = enc.decodeIvSync(`${config?.licence.key}`) as any;
                            if (mData !== undefined) {
                                let mTimeNow = moment().unix();
                                let mDiffTimeLicence = (mData.expiresTo - mTimeNow);
                                if (mDiffTimeLicence > 0) {
                                    await resolve(mData);
                                } else {
                                    await rejected({
                                        status: false,
                                        code: 501,
                                        msg: `Licence Has Expires. please renew licence from developer to used`
                                    })
                                }
                            } else {
                                await rejected({
                                    status: false,
                                    code: 502,
                                    msg: `Illegal Licence Key or File Not Exist. Please Insert Correct Licence Key`
                                })
                            }
                        } catch (e) {
                            await rejected({
                                status: false,
                                code: 505,
                                msg: `licence data not valid. check the licence key !`
                            })
                        }

                    }
                    break;
                case "LICENCE_KEY_ONLINE" :
                    await rejected({
                        status: false,
                        code: 500,
                        msg: `licence method via online is a not available. check later for newest update`
                    })
                    break;
                default :
                    await rejected({
                        status: false,
                        code: 500,
                        msg: `licence method invalid. please declare licence from owner developer`
                    })
            }
        }else{
            await rejected({
                status: false,
                code: 500,
                msg: `licence field in server config is require. please contact owner developer for used framework`
            });
            setTimeout(async () => {
                await process.exit(0);
            },2000);
        }
    })

};

export {
    Options,
    DKATypes as Types
}

export default {Server, Client, Options, DKATypes};