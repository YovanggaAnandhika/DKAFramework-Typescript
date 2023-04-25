import {GlobalServerConfigInterfaces} from "../../../../Interfaces/ConfigServerInterfaces";
import {
    SOCKET_ENGINE,
    SOCKET_TYPE_FASTIFY,
    SOCKET_TYPE_HTTP,
    SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS
} from "../Types/TypesSocketIOServer";
import {ServerOptions as SocketServerOptions, Socket} from "socket.io";
import {RequestListener, ServerOptions as HTTPServerOptions} from "http";
import {Http2SecureServer, SecureServerOptions as HTTP2SecureServerOptions} from "http2"
import {ServerOptions as HTTPSServerOptions} from "https"
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {FastifyHttp2SecureOptions} from "fastify";
import {SocketIOMiddlewareUse, SocketIOSocketIO} from "../../../../Types/ConfigServerTypes";

export interface ConfigSocketIOServerSettingsHTTP extends HTTPServerOptions {
    protocol ?: SOCKET_TYPE_HTTP,
    autoListen ?: boolean | undefined,
    requestListeners ?: RequestListener
}

export interface ConfigSocketIOServerSettingsHTTPS extends HTTPSServerOptions {
    protocol ?: SOCKET_TYPE_HTTPS,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsFastify extends FastifyHttp2SecureOptions<Http2SecureServer> {
    protocol ?: SOCKET_TYPE_FASTIFY,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsHTTP2 extends HTTP2SecureServerOptions {
    protocol ?: SOCKET_TYPE_HTTP2,
    autoListen ?: boolean | undefined
}

export interface ConfigSocketIOServerSettingsSocket extends Partial<SocketServerOptions> {

}

export interface ConfigSocketIOServerSettingsCluster {
    enabled ?: boolean,
    useCore ?: number | undefined
}

export interface ConfigSocketIOServerSettings {
    socket ?: ConfigSocketIOServerSettingsSocket,
    cluster ?: ConfigSocketIOServerSettingsCluster,
    engine ?: ConfigSocketIOServerSettingsFastify | ConfigSocketIOServerSettingsHTTP | ConfigSocketIOServerSettingsHTTP2 | ConfigSocketIOServerSettingsHTTPS
}

export interface ConfigSocketIOServerEventsSocket {
    onConnection ?: (io : Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => Promise<void> | void,
    onDisconnection ?: (reason : any) => Promise<void> | void,
}

export interface ConfigSocketIOServerEventsServer {
    onListening ?: (error ?: Error) => Promise<void> | void
}
export interface ConfigSocketIOServerEvents {
    socket ?: ConfigSocketIOServerEventsSocket,
    server ?: ConfigSocketIOServerEventsServer
}


export interface ConfigSocketIOServerInstances {
    engine ?: SOCKET_ENGINE | undefined,
    events ?: ConfigSocketIOServerEvents,
    io ?: SocketIOSocketIO,
    use ?: SocketIOMiddlewareUse,
    settings ?: ConfigSocketIOServerSettings
}

export type ConfigSocketIOServer = ConfigSocketIOServerInstances & GlobalServerConfigInterfaces