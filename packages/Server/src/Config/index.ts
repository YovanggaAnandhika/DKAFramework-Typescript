import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigServerTypes";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";


export const ConfigServerEngineFastify : FASTIFY_ENGINE = "FASTIFY"
export const ConfigServerEngineSocketIO : SOCKET_ENGINE = "SOCKET.IO"
export const ConfigServerEngineUDP : UDP_ENGINE = "USER_DATA_PROTOCOL"

export const ConfigServerEngine = {
    FASTIFY : ConfigServerEngineFastify,
    SOCKETIO : ConfigServerEngineSocketIO,
    UDP : ConfigServerEngineUDP
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
export const ConfigServer = {
    STATE : ConfigServerState,
    HOST : ConfigServerHost,
    PORT : ConfigServerPort,
    ENGINE : ConfigServerEngine
}

export default ConfigServer;