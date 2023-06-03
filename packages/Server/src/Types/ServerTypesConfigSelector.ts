import {
    SOCKET_ENGINE, SOCKET_TYPE_HTTP,
    SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS
} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";
import {CallbackSocketIOServer} from "../Component/SocketIO/Server/Interfaces/CallbackSocketIOServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {CallbackFastifyServer} from "../Component/Fastify/Interfaces/CallbackFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {CallbackUDPServer} from "../Component/UDP/Interfaces/CallbackUDPServer";
import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {ConfigUDPServer} from "../Component/UDP/Interfaces/ConfigUDPServer";
import {ConfigServerInterfaces} from "../Interfaces/ConfigServerInterfaces";
import {ConfigWebpackServer} from "../Component/Webpack/Interfaces/WebpackConfigServer";
import {Server as HTTPServer} from "http";
import {Server as HTTPSServer} from "https";
import {Http2SecureServer as HTTP2SecureServer} from "http2";

export type ServerConfigSelector<Config> = Config extends ConfigSocketIOServer ? ConfigSocketIOServer:
    Config extends ConfigFastifyServer ? ConfigFastifyServer :
        Config extends ConfigUDPServer ? ConfigUDPServer :
            Config extends ConfigWebpackServer ? ConfigWebpackServer :
                never;