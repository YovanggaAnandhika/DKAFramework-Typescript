import {GlobalServerConfigInterfacesSettingsLogger} from "../../../Interfaces/ConfigServerInterfaces";
import {
    ConfigSocketIOInstanceEventsLatencyType,
    SOCKET_ENGINE,
    SOCKET_TYPE_HTTP,
    SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS,
    SocketIOMiddlewareUse,
    SocketIOSocketIO
} from "../Types/TypesSocketIOServer";
import {Namespace, Server, ServerOptions as SocketServerOptions, Socket} from "socket.io";
import {RequestListener, ServerOptions as HTTPServerOptions} from "http";
import {SecureServerOptions as HTTP2SecureServerOptions} from "http2"
import {ServerOptions as HTTPSServerOptions} from "https"
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {DEVELOPMENT, PRODUCTION} from "../../../Types/ConfigServerTypes";

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

export interface ConfigSocketIOServerSettingsSocketJWT {

}

export interface ConfigSocketIOServerSettingsSocketKey {

}

export interface ConfigSocketIOServerSettingsSocket extends Partial<SocketServerOptions> {
    jwt ?: ConfigSocketIOServerSettingsSocketJWT;
    pingProtocol ?: "UDP" | "TCP"
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


export interface ConfigSocketIOServerInstanceEventsLatencyTime {
    duration : moment.Duration,
    endTime : {
        Iso : string,
        Humanize : string,
        unix : number
    },
    startTime : {
        Iso : string,
        Humanize : string,
        unix : number
    },
}
export interface ConfigSocketIOServerInstanceEventsLatency {
    delay : number,
    type : ConfigSocketIOInstanceEventsLatencyType,
    time : ConfigSocketIOServerInstanceEventsLatencyTime
}


export interface ConfigSocketIOServerEventsSocket {
    onConnection ?: (io : Socket<DefaultEventsMap, DefaultEventsMap, any>, server : Server<DefaultEventsMap, DefaultEventsMap, any>) => Promise<void>,
    onLatency ?: (responseLatency : ConfigSocketIOServerInstanceEventsLatency) => Promise<void> | void | undefined;
    onDisconnection ?: (reason : any) => Promise<void> | void,
}

export interface ConfigSocketIOServerEventsServer {
    onListening ?: (error ?: Error) => Promise<void> | void
}
export interface ConfigSocketIOServerEvents {
    socket ?: ConfigSocketIOServerEventsSocket;
    server ?: ConfigSocketIOServerEventsServer;
}


export interface ConfigSocketIOServerEventsNamespace {
    use ?: SocketIOMiddlewareUse | undefined;
    onConnection ?: (io : Socket<DefaultEventsMap, DefaultEventsMap, any>, namespace : Namespace<DefaultEventsMap, DefaultEventsMap, any>) => Promise<void> | void | undefined,
    onLatency ?: (responseLatency : ConfigSocketIOServerInstanceEventsLatency) => Promise<void> | void | undefined;
    onDisconnection ?: (reason : any) => Promise<void> | void,
}
export interface ConfigSocketIOServerInstancesNamespaces {
    [ name : string ] : ConfigSocketIOServerEventsNamespace,
}
//HTTPServer | HTTP2SecureServer | HTTPSServer
export interface ConfigSocketIOServerInstances {
    engine ?: SOCKET_ENGINE | undefined,
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    io ?: SocketIOSocketIO | undefined,
    namespaces ?: ConfigSocketIOServerInstancesNamespaces;
    events ?: ConfigSocketIOServerEvents | undefined,
    use ?: SocketIOMiddlewareUse | undefined,
    settings ?: ConfigSocketIOServerSettings
}

export type ConfigSocketIOServer = ConfigSocketIOServerInstances