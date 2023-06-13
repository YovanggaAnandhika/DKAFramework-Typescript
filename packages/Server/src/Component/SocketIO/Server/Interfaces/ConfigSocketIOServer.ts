import {
    GlobalServerConfigInterfaces,
    GlobalServerConfigInterfacesSettingsLogger
} from "../../../../Interfaces/ConfigServerInterfaces";
import {
    SOCKET_ENGINE,
    SOCKET_TYPE_FASTIFY,
    SOCKET_TYPE_HTTP,
    SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS, SocketIOEngineCore, SocketIOEngineTypes, SocketIOMiddlewareUse, SocketIOSocketIO
} from "../Types/TypesSocketIOServer";
import {ServerOptions as SocketServerOptions, Socket} from "socket.io";
import {RequestListener, ServerOptions as HTTPServerOptions, Server as HTTPServer} from "http";
import { Server as HTTPSServer } from "https"
import {
    Http2SecureServer as HTTP2SecureServer,
    Http2SecureServer,
    SecureServerOptions as HTTP2SecureServerOptions
} from "http2"
import {ServerOptions as HTTPSServerOptions} from "https"
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {
    FastifyHttp2SecureOptions,
    FastifyHttpOptions,
    FastifyHttpsOptions,
    FastifyInstance,
    FastifyServerOptions
} from "fastify";
import {ConfigFastifyServerRegister} from "../../../Fastify/Types/TypesFastifyServer";
import {DEVELOPMENT, PRODUCTION} from "../../../../Types/ConfigServerTypes";

export interface ConfigSocketIOServerSettingsHTTP extends HTTPServerOptions {
    protocol ?: SOCKET_TYPE_HTTP,
    autoListen ?: boolean | undefined,
    requestListeners ?: RequestListener
}

export interface ConfigSocketIOServerSettingsHTTPS extends HTTPSServerOptions {
    protocol ?: SOCKET_TYPE_HTTPS,
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
    engine ?: ConfigSocketIOServerSettingsHTTP | ConfigSocketIOServerSettingsHTTP2 | ConfigSocketIOServerSettingsHTTPS,
    logger ?: GlobalServerConfigInterfacesSettingsLogger
}

export interface ConfigSocketIOServerEventsSocket {
    onConnection ?: (io : Socket<DefaultEventsMap, DefaultEventsMap, any>) => Promise<void>,
    onDisconnection ?: (reason : any) => Promise<void> | void,
}

export interface ConfigSocketIOServerEventsServer {
    onListening ?: (error ?: Error) => Promise<void> | void
}
export interface ConfigSocketIOServerEvents {
    socket ?: ConfigSocketIOServerEventsSocket,
    server ?: ConfigSocketIOServerEventsServer
}
//HTTPServer | HTTP2SecureServer | HTTPSServer
export interface ConfigSocketIOServerInstances {
    engine : SOCKET_ENGINE,
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    io ?: SocketIOSocketIO | undefined,
    events ?: ConfigSocketIOServerEvents | undefined,
    use ?: SocketIOMiddlewareUse | undefined,
    settings ?: ConfigSocketIOServerSettings
}

export type ConfigSocketIOServer = ConfigSocketIOServerInstances