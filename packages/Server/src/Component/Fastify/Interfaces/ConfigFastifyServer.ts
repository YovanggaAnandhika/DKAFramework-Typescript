import {ConfigFastifyServerMain, FASTIFY_ENGINE} from "../Types/TypesFastifyServer";
import {GlobalServerConfigInterfacesSettingsLogger} from "../../../Interfaces/ConfigServerInterfaces";
import {
    FastifyHttp2Options,
    FastifyHttp2SecureOptions,
    FastifyHttpOptions,
    FastifyHttpsOptions,
    FastifyPluginOptions,
    onRequestHookHandler,
} from "fastify";
import { ServerOptions as SocketServerOptions } from "socket.io"
import {DEVELOPMENT, PRODUCTION} from "../../../Types/ConfigServerTypes";
import {FastifyCorsOptions} from "@fastify/cors";
import {FastifyFormbodyOptions} from "@fastify/formbody";
import {FastifyCookieOptions} from "@fastify/cookie";


export interface ConfigFastifyServerSettingsEngineHttp {
    type ?: "HTTP",
    options ?: FastifyHttpOptions<any>
}

export interface ConfigFastifyServerSettingsEngineHttps {
    type ?: "HTTPS",
    options ?: FastifyHttpsOptions<any>
}

export interface ConfigFastifyServerSettingsEngineHttp2 {
    type ?: "HTTP2",
    options ?: FastifyHttp2SecureOptions<any> | FastifyHttp2Options<any> | FastifyHttpOptions<any>
}

export interface ConfigFastifyServerInstancesPluginNgrok {
    enabled ?: boolean | undefined,
    authToken ?: string | undefined,
    onStatusChange ?: (status: "connected" | "closed") => any;
}

export interface ConfigFastifyServerSettings {
    engine ?: ConfigFastifyServerSettingsEngineHttp | ConfigFastifyServerSettingsEngineHttps | ConfigFastifyServerSettingsEngineHttp2,
    logger ?: GlobalServerConfigInterfacesSettingsLogger,
    ngrok ?: ConfigFastifyServerInstancesPluginNgrok | undefined
}

export interface ConfigFastifyServerHooks {
    onRequest ?: (req : onRequestHookHandler) => Promise<void>
}

export interface ConfigFastifyDecorator {
    [ name : string ] : any
}

export interface ConfigFastifyDecoratorRequest {
    [ name : string ] : any
}

export interface ConfigFastifyDecoratorReply {
    [ name : string ] : any
}

export interface ConfigFastifyServerInstancesPluginOptionsFormBody {
    enabled ?: boolean | undefined,
    options ?: FastifyPluginOptions & FastifyFormbodyOptions | undefined
}
export interface ConfigFastifyServerInstancesPluginOptionsCors {
    enabled ?: boolean | undefined,
    options ?: FastifyPluginOptions & FastifyCorsOptions | undefined
}
//Partial<SocketServerOptions>
export interface ConfigFastifyServerInstancesPluginOptionsSocketIO {
    enabled ?: boolean | undefined,
    options ?: FastifyPluginOptions & Partial<SocketServerOptions> | undefined
}

export interface ConfigFastifyServerInstancesPluginOptionsCookie {
    enabled ?: boolean | undefined,
    options ?: FastifyPluginOptions & FastifyCookieOptions | undefined
}

export interface ConfigFastifyServerInstancesPlugin {
    formBody ?: ConfigFastifyServerInstancesPluginOptionsFormBody | undefined,
    cors ?: ConfigFastifyServerInstancesPluginOptionsCors | undefined,
    socketIO ?: ConfigFastifyServerInstancesPluginOptionsSocketIO | undefined,
    cookie ?: ConfigFastifyServerInstancesPluginOptionsCookie | undefined
}


export type ConfigFastifyServerInstances = {
    engine ?: FASTIFY_ENGINE | undefined
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    /**
     * @type ConfigFastifyServerMain
     */
    app ?: ConfigFastifyServerMain | undefined,
    decorator ?: ConfigFastifyDecorator | undefined,
    decoratorRequest ?: ConfigFastifyDecoratorRequest | undefined,
    decoratorReply ?: ConfigFastifyDecoratorReply | undefined,
    hooks ?: ConfigFastifyServerHooks | undefined,
    plugin ?: ConfigFastifyServerInstancesPlugin | undefined,
    getConfig ?: (config : ConfigFastifyServer) => Promise<void> | void
    settings ?: ConfigFastifyServerSettings | undefined,
}

export type ConfigFastifyServer = ConfigFastifyServerInstances