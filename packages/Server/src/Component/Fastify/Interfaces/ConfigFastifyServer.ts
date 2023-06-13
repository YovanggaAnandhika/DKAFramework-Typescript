import {ConfigFastifyServerMain, ConfigFastifyServerRegister, FASTIFY_ENGINE} from "../Types/TypesFastifyServer";
import {
    ConfigServerInterfaces,
    GlobalServerConfigInterfaces,
    GlobalServerConfigInterfacesSettingsLogger
} from "../../../Interfaces/ConfigServerInterfaces";
import {
    FastifyHttp2Options, FastifyHttp2SecureOptions,
    FastifyHttpOptions, FastifyHttpsOptions,
    FastifyInstance, FastifyPluginAsync, FastifyPluginCallback, FastifyPluginOptions, onRequestHookHandler,
} from "fastify";
import {DEVELOPMENT, PRODUCTION} from "../../../Types/ConfigServerTypes";


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

export interface ConfigFastifyServerSettings {
    engine ?: ConfigFastifyServerSettingsEngineHttp | ConfigFastifyServerSettingsEngineHttps | ConfigFastifyServerSettingsEngineHttp2,
    logger ?: GlobalServerConfigInterfacesSettingsLogger
}

export interface ConfigFastifyServerHooks {
    onRequest : (req : onRequestHookHandler) => Promise<void>
}


export interface ConfigFastifyServerInstancesPluginOptions {
    enabled ?: boolean | undefined,
    options ?: FastifyPluginOptions | undefined
}

export interface ConfigFastifyServerInstancesPlugin {
    formBody ?: ConfigFastifyServerInstancesPluginOptions | undefined,
    cors ?: ConfigFastifyServerInstancesPluginOptions | undefined,
    socketIO ?: ConfigFastifyServerInstancesPluginOptions | undefined
}


export type ConfigFastifyServerInstances = {
    engine : FASTIFY_ENGINE
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    /**
     * @type ConfigFastifyServerMain
     */
    app ?: ConfigFastifyServerMain | undefined,
    hooks ?: ConfigFastifyServerHooks | undefined,
    plugin ?: ConfigFastifyServerInstancesPlugin | undefined,
    getConfig ?: (config : ConfigFastifyServer) => Promise<void> | void
    settings ?: ConfigFastifyServerSettings | undefined,
}

export type ConfigFastifyServer = ConfigFastifyServerInstances