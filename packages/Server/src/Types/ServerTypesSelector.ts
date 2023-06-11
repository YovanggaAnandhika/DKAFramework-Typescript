import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";
import {CallbackSocketIOServer} from "../Component/SocketIO/Server/Interfaces/CallbackSocketIOServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {CallbackFastifyServer} from "../Component/Fastify/Interfaces/CallbackFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {CallbackUDPServer} from "../Component/UDP/Interfaces/CallbackUDPServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";
import {CallbackWebpackServer} from "../Component/Webpack/Interfaces/CallbackWebpackServer";


export type ServerSelector<Config> = Config extends { engine : typeof SOCKET_ENGINE } ? CallbackSocketIOServer<Config> :
    Config extends { engine : typeof FASTIFY_ENGINE } ? CallbackFastifyServer :
        Config extends { engine : typeof UDP_ENGINE } ? CallbackUDPServer :
            Config extends { engine : typeof WEBPACK_ENGINE } ? CallbackWebpackServer
            : Config;