import {FastifyPluginOptions} from "fastify";
import {mFastify} from "../index";


export type FASTIFY_ENGINE = "FASTIFY"
export const FASTIFY_ENGINE : FASTIFY_ENGINE = "FASTIFY"

export type ConfigFastifyServerRegisterConstructorNext = (error ?: Error) => void | Promise<void>;
//export type ConfigFastifyServerRegister = typeof mFastify.register.arguments;
export type ConfigFastifyServerMain = (app : typeof mFastify, opts : FastifyPluginOptions, next: ConfigFastifyServerRegisterConstructorNext) => Promise<void> | void;
export type ConfigFastifyServerRegister = (app : typeof mFastify, opts : FastifyPluginOptions, next: ConfigFastifyServerRegisterConstructorNext) => Promise<void> | void;