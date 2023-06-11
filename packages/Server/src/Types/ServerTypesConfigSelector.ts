import {
    SOCKET_ENGINE
} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {ConfigUDPServer} from "../Component/UDP/Interfaces/ConfigUDPServer";
import {ConfigWebpackServer} from "../Component/Webpack/Interfaces/WebpackConfigServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";
import {ConfigServerInterfaces} from "../Interfaces/ConfigServerInterfaces";



export type ServerConfigSelector<Config> = Config extends { engine ?: SOCKET_ENGINE | undefined } ? ConfigSocketIOServer :
    Config extends { engine ?: FASTIFY_ENGINE | undefined } ? ConfigFastifyServer :
        Config extends { engine ?: UDP_ENGINE | undefined } ? ConfigUDPServer :
            Config extends { engine ?: WEBPACK_ENGINE | undefined } ? ConfigWebpackServer :
                never;