import {
    FastifyPluginOptions, FastifyRequest, RawServerDefault,
} from "fastify";
import { mFastify } from "../index";
import {RouteGenericInterface} from "fastify/types/route";
import {RawServerBase} from "fastify/types/utils";
export type FASTIFY_ENGINE = "FASTIFY"
export const FASTIFY_ENGINE : FASTIFY_ENGINE = "FASTIFY"

export type ConfigFastifyServerRegisterConstructorNext = (error ?: Error) => void | Promise<void>;
//export type ConfigFastifyServerRegister = typeof mFastify.register.arguments;
export type ConfigFastifyServerMain = (app : typeof mFastify, opts : FastifyPluginOptions, next: ConfigFastifyServerRegisterConstructorNext) => Promise<void> | void;
export type ConfigFastifyServerRegister = (app : typeof mFastify, opts : FastifyPluginOptions, next: ConfigFastifyServerRegisterConstructorNext) => Promise<void> | void;
export type DKAFastifyRequestWithRouteGeneric<Routes extends RouteGenericInterface = RouteGenericInterface> = FastifyRequest<Routes>;
export type DKAFastifyRequest<R extends RouteGenericInterface = RouteGenericInterface> = FastifyRequest<R>;
export type DKAFastifyRawServer<RawServer extends RawServerBase = RawServerDefault> = RawServer;