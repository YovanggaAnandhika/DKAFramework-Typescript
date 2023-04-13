import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigServerTypes";
import {ConfigUDPServer} from "../Component/UDP/Interfaces/ConfigUDPServer";


export interface GlobalServerConfigInterfaces extends Object {
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string,
    port ?: number
}

export type ConfigServerInterfaces = ConfigSocketIOServer | ConfigFastifyServer | ConfigUDPServer