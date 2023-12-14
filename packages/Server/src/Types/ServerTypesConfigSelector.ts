import {SOCKET_ENGINE} from "../Component/SocketIO/Types/TypesSocketIOServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {ConfigSocketIOServer} from "../Component/SocketIO/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {ConfigUDPServer} from "../Component/UDP/Interfaces/ConfigUDPServer";
import {ConfigWebpackServer} from "../Component/Webpack/Interfaces/WebpackConfigServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";
import {ESCPOS_ENGINE} from "../Component/Escpos/Types/EscposTypes";
import {EscposConfig} from "../Component/Escpos/interfaces/EscposConfig";


export type ServerConfigSelector<Config> = Config extends { engine ?: SOCKET_ENGINE | undefined } ? ConfigSocketIOServer :
    Config extends { engine ?: FASTIFY_ENGINE | undefined } ? ConfigFastifyServer :
        Config extends { engine ?: UDP_ENGINE | undefined } ? ConfigUDPServer :
            Config extends { engine ?: ESCPOS_ENGINE | undefined } ? EscposConfig :
                Config extends { engine ?: WEBPACK_ENGINE | undefined } ? ConfigWebpackServer :
                    never;