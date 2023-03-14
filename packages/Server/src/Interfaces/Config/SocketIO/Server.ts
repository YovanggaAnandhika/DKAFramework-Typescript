import {
    EngineSocketIO,
    FastifyInstances,
    SocketIOInstances,
    SocketIOInstancesMiddleware,
    SocketIOInstanceSocket,
    SocketIOInstanceSocketRemote,
    State
} from "../../../Type/types";
import {Namespace, Server, ServerOptions} from "socket.io";
import {ConfigSystemLogger, ConfigSystemMultiTypes, MultiplePluginsServer} from "../../Global";
import {ServerOptions as ServerOptionsHttps} from "https";
import {Server as HTTPServer, ServerOptions as ServerOptionsHttp} from "http";
import {GlobalConfig} from "../Global";
import {FastifyBaseLogger} from "fastify/types/logger";
import {FastifyServerOptions} from "fastify";
import {ConfigServerFastifyPlugins} from "../Fastify";


export interface ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth {
    secret_id?: string | undefined,
    secret_key?: string | undefined,
    redirect_uri?: string | undefined
}

export interface ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic {
    token?: string;
}


export interface ConfigServerSocketIOOptionsSocket extends Partial<ServerOptions> {

}

export interface ConfigSocketIOHTTPSSettings {
    protocol?: "HTTPS",
    settings?: ServerOptionsHttps | undefined
}

export interface ConfigSocketIOHTTPSettings {
    protocol?: "HTTP",
    settings?: ServerOptionsHttp | undefined
}


export interface ConfigSocketIOFastifySettingsPlugins extends MultiplePluginsServer {

}

export interface ConfigSocketIOFastifySettings {
    protocol?: "FASTIFY",
    app?: FastifyInstances | undefined,
    settings?: {
        plugin: ConfigSocketIOFastifySettingsPlugins | ConfigServerFastifyPlugins | undefined
        server: FastifyServerOptions<HTTPServer, FastifyBaseLogger> | undefined
    }
}

export interface ConfigSocketIOSettingsEncryptionSettings {
    key?: string
}

export interface ConfigSocketIOSettingsEncryption {
    enabled?: boolean,
    settings?: ConfigSocketIOSettingsEncryptionSettings
}

export interface ConfigServerSocketIOOptions {
    socket?: ConfigServerSocketIOOptionsSocket | undefined,
    server?: ConfigSocketIOHTTPSettings | ConfigSocketIOHTTPSSettings | ConfigSocketIOFastifySettings | undefined,
    encryption?: ConfigSocketIOSettingsEncryption
}

export interface ConfigSocketIOGetClientConnected {
    ClientList?: Array<SocketIOInstanceSocket>,
    CurrentClient?: SocketIOInstanceSocket,
    TotalClientConnected?: number
}

export interface ConfigSocketIONamespaceGetClientConnectedClientList {
    CurrentClient?: Namespace<SocketIOInstanceSocket>,
    TotalClientConnected?: number,
}

export interface ConfigSocketIONamespaceGetClientConnected {
    [name: string]: ConfigSocketIONamespaceGetClientConnectedClientList | number,
}

export interface ConfigsocketIONamespaceListOptions {
    onConnection?: (io: SocketIOInstanceSocket) => Promise<void> | void | undefined,
    onDisconnect?: (reason: string) => Promise<void> | void | undefined,
}

export interface ConfigsocketIONamespaceList {
    [name: string]: ConfigsocketIONamespaceListOptions
}

export interface ConfigSocketIOGetClientConnectedFetch {
    ClientList?: Array<SocketIOInstanceSocketRemote>,
    TotalClientConnected?: number
}

export interface ConfigSocketIOPlugins extends MultiplePluginsServer {

}

export interface ConfigSocketIO extends GlobalConfig {
    /**
     * @description
     * The State Development or Production
     */
    state?: State,
    engine?: EngineSocketIO | undefined,
    logger?: ConfigSystemLogger | undefined,
    host?: string | undefined,
    port?: number | Server,
    use?: SocketIOInstancesMiddleware,
    io?: SocketIOInstances,
    onConnection?: (io: SocketIOInstanceSocket) => Promise<void> | void | undefined,
    onDisconnect?: (reason: string) => Promise<void> | void | undefined,
    /**
     * @deprecated
     * Move to onNamespace
     */
    onAllClient?: (io: ConfigSocketIONamespaceGetClientConnected) => Promise<void> | void | undefined,
    onClient?: (io: ConfigSocketIOGetClientConnected) => Promise<void> | undefined,
    onNamespace?: ConfigsocketIONamespaceList | undefined,
    onError?: (error: Error | any) => Promise<void> | void | undefined,
    getConfig?: (config: ConfigSocketIO) => void | Promise<void>,
    options?: ConfigServerSocketIOOptions,
    plugins?: ConfigSocketIOPlugins | undefined,
    Constanta?: ConfigSystemMultiTypes | undefined
}