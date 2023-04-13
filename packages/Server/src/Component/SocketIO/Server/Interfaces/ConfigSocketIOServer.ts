import {ConfigServerInterfaces, GlobalServerConfigInterfaces} from "../../../../Interfaces/ConfigServerInterfaces";
import {
    SOCKET_ENGINE,
    SOCKET_TYPE_FASTIFY,
    SOCKET_TYPE_HTTP,
    SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS
} from "../Types/TypesSocketIOServer";
import {ServerOptions as SocketServerOptions } from "socket.io";
import {ServerOptions as HTTPServerOptions} from "http";
import {SecureServerOptions as HTTP2SecureServerOptions}from "http2"
import {ServerOptions as HTTPSServerOptions}from "https"

export interface ConfigSocketIOServerSettingsHTTP extends HTTPServerOptions {
    protocol ?: SOCKET_TYPE_HTTP,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsHTTPS extends HTTPSServerOptions {
    protocol ?: SOCKET_TYPE_HTTPS,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsFastify {
    protocol ?: SOCKET_TYPE_FASTIFY,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsHTTP2 extends HTTP2SecureServerOptions {
    protocol ?: SOCKET_TYPE_HTTP2,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsSocket extends Partial<SocketServerOptions> {

}

export interface ConfigSocketIOServerSettings {
    socket ?: ConfigSocketIOServerSettingsSocket,
    engine ?: ConfigSocketIOServerSettingsFastify | ConfigSocketIOServerSettingsHTTP | ConfigSocketIOServerSettingsHTTP2 | ConfigSocketIOServerSettingsHTTPS
}

export interface ConfigSocketIOServer extends GlobalServerConfigInterfaces {
    engine ?: SOCKET_ENGINE | undefined,
    settings ?: ConfigSocketIOServerSettings
}