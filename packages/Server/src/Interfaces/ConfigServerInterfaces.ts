import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";


export interface GlobalConfigInterfaces extends Object {

    host ?: string | undefined,
    port ?: number | undefined
}

export type ConfigServerInterfaces = ConfigSocketIOServer