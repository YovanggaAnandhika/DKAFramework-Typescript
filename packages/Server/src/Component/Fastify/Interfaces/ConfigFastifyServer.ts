import {ConfigFastifyServerRegister, FASTIFY_ENGINE} from "../Types/TypesFastifyServer";
import {ConfigServerInterfaces, GlobalServerConfigInterfaces } from "../../../Interfaces/ConfigServerInterfaces";
import {
    FastifyHttp2Options, FastifyHttp2SecureOptions,
    FastifyHttpOptions, FastifyHttpsOptions,
    FastifyInstance, FastifyPluginOptions,
    FastifyRegister,
} from "fastify";

export interface ConfigFastifyServerSettings {
    engine : FastifyHttpsOptions<any> | FastifyHttpOptions<any> | FastifyHttp2Options<any> | FastifyHttp2SecureOptions<any>
}
export interface ConfigFastifyServer extends GlobalServerConfigInterfaces {
    engine ?: FASTIFY_ENGINE | undefined,
    app ?: ConfigFastifyServerRegister,
    getConfig ?: (config : ConfigFastifyServer) => Promise<void> | void
    settings ?: ConfigFastifyServerSettings
}