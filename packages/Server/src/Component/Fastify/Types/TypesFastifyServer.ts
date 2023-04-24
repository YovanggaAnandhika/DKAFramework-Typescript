import {FastifyInstance, FastifyPluginOptions} from "fastify";


export type FASTIFY_ENGINE = "FASTIFY"
export const FASTIFY_ENGINE : FASTIFY_ENGINE = "FASTIFY"

export type ConfigFastifyServerRegisterConstructorNext = (error ?: Error) => void | Promise<void>
export type ConfigFastifyServerRegister = (app : FastifyInstance, opts : FastifyPluginOptions, next: ConfigFastifyServerRegisterConstructorNext) => Promise<void> | void | undefined;