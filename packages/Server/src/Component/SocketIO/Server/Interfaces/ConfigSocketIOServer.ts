import {ConfigServerInterfaces, GlobalConfigInterfaces} from "../../../../Interfaces/ConfigServerInterfaces";
import {SOCKET_ENGINE, SOCKET_TYPE_FASTIFY, SOCKET_TYPE_HTTP} from "../Types/TypesSocketIOServer";
import {ServerOptions as SocketServerOptions } from "socket.io";
import {ClientRequestArgs, ServerOptions} from "http";

export interface ConfigSocketIOServerSettingsHTTP extends ServerOptions {
    protocol ?: SOCKET_TYPE_HTTP,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsFastify {
    protocol ?: SOCKET_TYPE_FASTIFY,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsSocket extends Partial<SocketServerOptions> {

}

export interface ConfigSocketIOServerSettings {
    socket ?: ConfigSocketIOServerSettingsSocket,
    engine ?: ConfigSocketIOServerSettingsFastify | ConfigSocketIOServerSettingsHTTP
}

export interface ConfigSocketIOServer extends GlobalConfigInterfaces {
    engine ?: SOCKET_ENGINE | undefined,
    settings ?: ConfigSocketIOServerSettings
}