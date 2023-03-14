import {EngineFastify, FastifyInstances, FastifyRegistringPlugins, State} from "../../Type/types";
import {ConfigSystemLogger, ConfigSystemMultiTypes, MultiplePluginsServer} from "../Global";
import nodemon from "nodemon";
import http from "http";
import {FastifyBaseLogger} from "fastify/types/logger";
import {GlobalConfig} from "./Global";
import {FastifyServerOptions} from "fastify";

export interface ConfigServerFastifySettingsNodemon {
    enabled?: boolean,
    settings?: nodemon.Settings
}

export interface ConfigServerFastifySettingsElectron {
    enabled?: boolean,

}

export interface ConfigServerFastifySettings extends FastifyServerOptions<http.Server, FastifyBaseLogger> {
    registerModule?: FastifyRegistringPlugins | undefined,
    nodemon?: ConfigServerFastifySettingsNodemon,
    electron?: ConfigServerFastifySettingsElectron,
}

export interface ConfigServerFastifyPluginsPointOfViewSettingsEngine {
    ejs?: any
}


export interface ConfigServerFastifyPluginsPointOfViewSettings {
    engine ?: ConfigServerFastifyPluginsPointOfViewSettingsEngine,
    root ?: string,
    includeViewExtension ?: boolean
}

export interface ConfigServerFastifyPluginsPointOfView {
    enabled ?: boolean,
    settings ?: ConfigServerFastifyPluginsPointOfViewSettings
}


export interface ConfigServerFastifyPluginsStaticSettings {
    root?: string,
    prefix?: string
}

export interface ConfigServerFastifyPluginsStatic {
    enabled?: boolean,
    settings?: ConfigServerFastifyPluginsStaticSettings
}

export interface ConfigServerFastifyPluginsFormBodySettings {

}

export interface ConfigServerFastifyPluginsFormBody {
    enabled?: boolean,
    settings?: ConfigServerFastifyPluginsFormBodySettings
}

export interface ConfigServerFastifyPlugins extends MultiplePluginsServer {
    pointOfView?: ConfigServerFastifyPluginsPointOfView,
    static?: ConfigServerFastifyPluginsStatic,
    formBody?: ConfigServerFastifyPluginsFormBody
}

export interface ConfigFastify extends GlobalConfig {
    /**
     * The State Development or Production
     * **/
    state?: State,
    engine?: EngineFastify | undefined,
    logger?: ConfigSystemLogger | undefined,
    host?: string | undefined,
    port?: number | string | undefined,
    app?: FastifyInstances,
    getConfig?: (config: ConfigFastify) => void | Promise<void>,
    settings?: ConfigServerFastifySettings | undefined,
    plugins?: ConfigServerFastifyPlugins | undefined,
    Constanta?: ConfigSystemMultiTypes | undefined
}