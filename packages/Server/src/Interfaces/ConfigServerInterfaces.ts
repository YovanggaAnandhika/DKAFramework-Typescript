import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigServerTypes";
import {ConfigUDPServer} from "../Component/UDP/Interfaces/ConfigUDPServer";


export interface GlobalServerConfigInterfacesSettingsLogger {
    enabled ?: boolean,
    saveLogFile ?: boolean,
    viewConsoleLog ?: boolean
}
export interface GlobalServerConfigInterfacesSettings {
    logger ?: GlobalServerConfigInterfacesSettingsLogger
}

export interface GlobalServerConfigInterfaces extends Object {
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    settings ?: GlobalServerConfigInterfacesSettings
}

export type ConfigServerInterfaces = ConfigSocketIOServer | ConfigFastifyServer | ConfigUDPServer

export interface ExtendedError extends Error {
    data?: any;
}