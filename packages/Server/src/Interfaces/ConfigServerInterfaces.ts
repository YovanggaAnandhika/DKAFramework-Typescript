import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";


export interface GlobalConfigInterfaces extends Object {
    host ?: string | undefined,
    port ?: number | undefined
}

export type ConfigServerInterfaces = ConfigSocketIOServer | ConfigFastifyServer