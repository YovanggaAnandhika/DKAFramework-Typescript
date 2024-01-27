import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {
    SOCKET_ENGINE,
    SOCKET_TYPE_HTTP,
    SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS
} from "../Component/SocketIO/Types/TypesSocketIOServer";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigServerTypes";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {MODE_COMPILE, MODE_SERVER, WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";
import {ESCPOS_ENGINE, ESCPOS_NETWORK, ESCPOS_SERIAL, ESCPOS_USB} from "../Component/Escpos/Types/EscposTypes";


export const ConfigServerEngineFastify : FASTIFY_ENGINE = "FASTIFY"
export const ConfigServerEngineSocketIO : SOCKET_ENGINE = "SOCKET.IO"
export const ConfigServerEngineUDP : UDP_ENGINE = "USER_DATA_PROTOCOL"
export const ConfigServerEngineWebpack : WEBPACK_ENGINE = "WEBPACK";

export const ConfigServerEngineEscpos : ESCPOS_ENGINE = "ESCPOS";

export const ConfigServerEngine = {
    FASTIFY : ConfigServerEngineFastify,
    SOCKETIO : ConfigServerEngineSocketIO,
    UDP : ConfigServerEngineUDP,
    ESCPOS : ConfigServerEngineEscpos,
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
    DEFAULT : 53310
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

export const ConfigServerConnection = {
    USB : ESCPOS_USB,
    NETWORK : ESCPOS_NETWORK,
    SERIAL : ESCPOS_SERIAL
}

export const ConfigServerMode = {
    MODE_COMPILE : MODE_COMPILE,
    MODE_SERVER : MODE_SERVER
}
export const ConfigServer = {
    STATE : ConfigServerState,
    HOST : ConfigServerHost,
    PORT : ConfigServerPort,
    MODE : ConfigServerMode,
    CONNECTION : ConfigServerConnection,
    ENGINE : ConfigServerEngine,
    SETTINGS : ConfigServerSettings
}

export default ConfigServer;