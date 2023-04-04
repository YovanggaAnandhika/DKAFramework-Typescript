import {ConfigServerInterfaces, GlobalConfigInterfaces} from "../../../../Interfaces/ConfigServerInterfaces";
import {SOCKET_ENGINE, SOCKET_TYPE_FASTIFY, SOCKET_TYPE_HTTP} from "../Types/TypesSocketIOServer";

export interface ConfigSocketIOServerSettingsHTTP {
    protocol ?: SOCKET_TYPE_HTTP,
    autoListen ?: boolean
}

export interface ConfigSocketIOServerSettingsFastify {
    protocol ?: SOCKET_TYPE_FASTIFY,
    autoListen ?: boolean
}
export interface ConfigSocketIOServer extends GlobalConfigInterfaces {
    engine ?: SOCKET_ENGINE | undefined,
    settings ?: ConfigSocketIOServerSettingsFastify | ConfigSocketIOServerSettingsHTTP
}