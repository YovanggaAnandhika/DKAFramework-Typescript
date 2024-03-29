import {ConfigServerInterfaces} from "./Interfaces/ConfigServerInterfaces";
import {ServerSelector} from "./Types/ServerTypesSelector";
import {default as Options} from "./Config";
import {FASTIFY_ENGINE} from "./Component/Fastify/Types/TypesFastifyServer";
import {SOCKET_ENGINE} from "./Component/SocketIO/Types/TypesSocketIOServer";
import {UDP_ENGINE} from "./Component/UDP/Types/TypesUDPServer";
import {ServerConfigSelector} from "./Types/ServerTypesConfigSelector";
import {WEBPACK_ENGINE} from "./Component/Webpack/Types/WebpackTypesServer";
import {DefaultServerConfiguration} from "./Config/DefaultServerConfiguration";
import {ESCPOS_ENGINE} from "./Component/Escpos/Types/EscposTypes";

async function Server<Config extends ConfigServerInterfaces> (serverConfig ?: ServerConfigSelector<Config>) : Promise<ServerSelector<Config>> {
    serverConfig = { ... { engine : FASTIFY_ENGINE }, ... serverConfig}
    return new Promise(async (resolve, rejected) => {
        switch (serverConfig?.engine) {
            case FASTIFY_ENGINE :
                serverConfig = { ... DefaultServerConfiguration, ... serverConfig}
                await require("./Component/Fastify").default(serverConfig)
                    .then(async (mFastifyCallback) => {
                        await resolve(mFastifyCallback as ServerSelector<Config>)
                    })
                    .catch(async (error) => {
                        await rejected(error)
                    });
                break;
            case SOCKET_ENGINE :
                serverConfig = { ... DefaultServerConfiguration, ... serverConfig}
                await require("./Component/SocketIO").default(serverConfig)
                    .then(async (mServerCallbackInstance) => {
                        //################################################################
                        await resolve({
                            status : true,
                            code : 200,
                            msg : `Server Berhasil Dijalankan`,
                            getConfig : mServerCallbackInstance.config,
                            engine : {
                                socket : mServerCallbackInstance.socket,
                                server : mServerCallbackInstance.server
                            }
                        } as ServerSelector<Config>);
                        //################################################################
                    })
                    .catch(async (error) => {
                        await rejected(error)
                    });
                break;
            case UDP_ENGINE :
                serverConfig = { ... DefaultServerConfiguration, ... serverConfig}
                await require("./Component/UDP").default(serverConfig)
                    .then(async (udpSocket) => {
                        await resolve({ status : true, code : 200, msg : `Server Berhasil Dijalankan` } as ServerSelector<Config>);
                    })
                    .catch((error) => {
                        rejected(error);
                    });
                break;
            case WEBPACK_ENGINE :
                serverConfig = { ... DefaultServerConfiguration, ... serverConfig}
                await require("./Component/Webpack").default(serverConfig)
                    .then(async (webpackServer) => {
                        await resolve(webpackServer as ServerSelector<Config>);
                    })
                    .catch(async (error) => {
                        await rejected(error)
                    });
                break;
            case ESCPOS_ENGINE :
                await require("./Component/Escpos").default(serverConfig)
                    .then(async (result) => {
                        await resolve(result as ServerSelector<Config>)
                    })
                    .catch(async (error) => {
                        await rejected(error)
                    });
                break;
            default :
                await rejected({ status : false, code : 500, msg : `server config unknown. you must declaration engine in config`})
        }
    });
}

export { Options, Server };
export default Server;