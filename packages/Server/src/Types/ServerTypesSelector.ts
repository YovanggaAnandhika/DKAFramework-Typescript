import {SOCKET_ENGINE} from "../Component/SocketIO/Types/TypesSocketIOServer";
import {CallbackSocketIOServer} from "../Component/SocketIO/Interfaces/CallbackSocketIOServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {CallbackFastifyServer} from "../Component/Fastify/Interfaces/CallbackFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {CallbackUDPServer} from "../Component/UDP/Interfaces/CallbackUDPServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";
import {CallbackWebpackServer} from "../Component/Webpack/Interfaces/CallbackWebpackServer";


export type ServerSelector<Config> = Config extends { engine ?: typeof SOCKET_ENGINE | undefined } ? CallbackSocketIOServer<Config> :
    Config extends { engine ?: typeof FASTIFY_ENGINE | undefined } ? CallbackFastifyServer :
        Config extends { engine ?: typeof UDP_ENGINE | undefined } ? CallbackUDPServer :
            Config extends { engine ?: typeof WEBPACK_ENGINE | undefined } ? CallbackWebpackServer
            : Config;