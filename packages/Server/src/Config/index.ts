import Const from "../Const";
import path from "path";
import {ConfigFastify} from "../Interfaces/Config/Fastify";
import {ConfigSocketIO} from "../Interfaces/Config/SocketIO/Server";
import {ConfigSocketIOClient} from "../Interfaces/Config/SocketIO/Client";
import {ConfigReactJS} from "../Interfaces/Config/ReactJS";
import {ConfigExpressJS} from "../Interfaces/Config/Express";

function checkModuleExist(name : string){
    try {
        require.resolve(name);
        return true;
    }catch (e) {
        return false;
    }
}

/**
 * @typedef { Config.Config }
 */
export const FastifyConfigurationDefault : ConfigFastify = {
    state: Const.Server.State.SERVER_STATE_DEVELOPMENT,
    logger: {
        enabled: false,
        path: {
            error: path.join(require.main?.path!, "./Logs/error.log"),
            info: path.join(require.main?.path!, "./Logs/info.log"),
            warning: path.join(require.main?.path!, "./Logs/warning.log")
        }
    },
    engine: Const.Server.Engine.FASTIFY,
    host: Const.Server.Host.LOCALHOST,
    port: 70,
    app: async (app, opts, next) => {
        next();
    },
    plugins: {
        pointOfView: {
            enabled: false,
            settings: {
                engine: {
                    ejs: (checkModuleExist("ejs")) ? require("ejs") : null
                },
                root: path.join(require?.main?.filename!, "./../Layout"),
                /*viewExt: 'html'*/
                includeViewExtension: true
            }
        },
        static: {
            enabled: false,
        }
    },
    Constanta : {
        DEFAULT_DELAY_PROGRESS : 0
    }
}
export const SocketIOConfigurationDefault : ConfigSocketIO = {
    state: Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const.Server.Engine.SOCKETIO.Server,
    logger: {
        enabled: true,
        path: {
            error: path.join(require.main?.path!, "./Logs/error.log"),
            info: path.join(require.main?.path!, "./Logs/info.log"),
            warning: path.join(require.main?.path!, "./Logs/warning.log")
        }
    },
    options: {
        socket: {
            perMessageDeflate: false,
            pingInterval : 1000,
            pingTimeout : 3000,
            allowEIO3 : true,
            cors : {
                origin: '*',
            },
            connectTimeout : 5000
        },
        server: {
            protocol: "HTTP"
        },
        encryption: {
            enabled: false,
            settings: {
                key: `@#&fh3332b3b38dh3h3h4@kkk38832fbb5vj50psd281ndhe93982828`
            }
        }
    },
    port: Const.Server.Port.DEFAULT
}
export const SocketIOClientConfigurationDefault : ConfigSocketIOClient = {
    state: Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const.Server.Engine.SOCKETIO.Client,
    settings: {
        reconnection : true,
        reconnectionAttempts : 3,
        reconnectionDelay : 1000,
        reconnectionDelayMax : 2000,
        timeout : 5000,
        encryption: {
            enabled: false,
            settings: {
                key: `@#&fh3332b3b38dh3h3h4@kkk38832fbb5vj50psd281ndhe93982828`
            }
        }
    },
}

export const ReactJSConfigurationDefault : ConfigReactJS = {
    state: Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const.Server.Engine.REACTJS,
    host: Const.Server.Host.LOCALHOST,
    logger: {
        enabled: true,
        level: "none",
        path: {
            error: path.join(require.main?.path!, "./Logs/error.log"),
            info: path.join(require.main?.path!, "./Logs/info.log"),
            warning: path.join(require.main?.path!, "./Logs/warning.log")
        }
    },
    port: 72,
    plugins: {
        HtmlWebpackPlugin: {
            enabled: true,
            options: {
                inject: false
            }
        }
    },
    settings: {
        buildOutputFile: {
            enabled: false
        }
    },
    options: {
        Webpack: {
            configuration: {
                output: {
                    publicPath: "/",
                    filename: "DKAFramework.js"
                }
            }
        },
        WebpackDev: {
            open: false,
            hot: true,
            historyApiFallback: true
        }
    },
}

export const ExpressJSConfigurationDefault : ConfigExpressJS = {
    state: Const.Server.State.SERVER_STATE_DEVELOPMENT,
    engine: Const.Server.Engine.EXPRESSSJS,
    host: Const.Server.Host.LOCALHOST,
    port: 72,
}
