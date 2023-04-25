import {ConfigFastifyServerRegister, FASTIFY_ENGINE} from "../Types/TypesFastifyServer";
import {ConfigServerInterfaces, GlobalServerConfigInterfaces } from "../../../Interfaces/ConfigServerInterfaces";
import {
    FastifyHttp2Options, FastifyHttp2SecureOptions,
    FastifyHttpOptions, FastifyHttpsOptions,
    FastifyInstance, FastifyPluginOptions,
    FastifyRegister, onRequestHookHandler,
} from "fastify";

export interface ConfigFastifyServerSettings {
    engine ?: FastifyHttpsOptions<any> | FastifyHttpOptions<any> | FastifyHttp2Options<any> | FastifyHttp2SecureOptions<any>
}

export interface ConfigFastifyServerHooks {
    onRequest : (req : onRequestHookHandler) => Promise<void>
}
export interface ConfigFastifyServer extends GlobalServerConfigInterfaces {
    engine ?: FASTIFY_ENGINE | undefined,
    app ?: ConfigFastifyServerRegister,
    hooks ?: ConfigFastifyServerHooks
    getConfig ?: (config : ConfigFastifyServer) => Promise<void> | void
    settings ?: ConfigFastifyServerSettings | undefined
}