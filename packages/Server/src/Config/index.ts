import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";


export const ConfigServerEngineFastify : FASTIFY_ENGINE = "FASTIFY"
export const ConfigServerEngineSocketIO : SOCKET_ENGINE = "SOCKET.IO"

export const ConfigServerEngine = {
    FASTIFY : ConfigServerEngineFastify,
    SOCKETIO : ConfigServerEngineSocketIO
}

export const ConfigServer = {
    ENGINE : ConfigServerEngine
}

export default ConfigServer;