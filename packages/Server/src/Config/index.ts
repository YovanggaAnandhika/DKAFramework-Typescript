import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {
    SOCKET_ENGINE,
    SOCKET_TYPE_HTTP, SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS
} from "../Component/SocketIO/Types/TypesSocketIOServer";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigServerTypes";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";


export const ConfigServerEngineFastify : FASTIFY_ENGINE = "FASTIFY"
export const ConfigServerEngineSocketIO : SOCKET_ENGINE = "SOCKET.IO"
export const ConfigServerEngineUDP : UDP_ENGINE = "USER_DATA_PROTOCOL"
export const ConfigServerEngineWebpack : WEBPACK_ENGINE = "WEBPACK";

export const ConfigServerEngine = {
    FASTIFY : ConfigServerEngineFastify,
    SOCKETIO : ConfigServerEngineSocketIO,
    UDP : ConfigServerEngineUDP,
    WEBPACK : ConfigServerEngineWebpack
}

export const ConfigServerState = {
    DEVELOPMENT : DEVELOPMENT,
    PRODUCTION : PRODUCTION
}

export const ConfigServerHost = {
    LOCALHOST : "127.0.0.1",
    WILDCARD : "0.0.0.0"
}

export const ConfigServerPort = {
    DEFAULT : 51397
}


export const ConfigServerSettingsProtocol = {
    HTTP : SOCKET_TYPE_HTTP,
    HTTPS : SOCKET_TYPE_HTTPS,
    HTTP2 : SOCKET_TYPE_HTTP2
}
export const ConfigServerSettingsEngine = {
    PROTOCOL : ConfigServerSettingsProtocol
}

export const ConfigServerSettings = {
    ENGINE : ConfigServerSettingsEngine
}
export const ConfigServer = {
    STATE : ConfigServerState,
    HOST : ConfigServerHost,
    PORT : ConfigServerPort,
    ENGINE : ConfigServerEngine,
    SETTINGS : ConfigServerSettings
}

export default ConfigServer;