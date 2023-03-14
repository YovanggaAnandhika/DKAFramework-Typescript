import {ConfigReactJS} from "./Config/ReactJS";
import {ConfigExpressJS} from "./Config/Express";
import {ConfigFastify} from "./Config/Fastify";
import {ConfigSocketIO} from "./Config/SocketIO/Server";
import {ConfigSocketIOClient} from "./Config/SocketIO/Client";
import {Socket} from "socket.io-client";
import {FastifyInstance} from "fastify";

export interface DKACallback {
    status: boolean,
    code: 200 | 202 | 404 | 500 | 501
    msg: string
}

export interface DKAServerCallbackMetadata {
    author: string | undefined,
    version: string | undefined
}

export interface DKAClientCallbackMetadata {
    author: string | undefined,
    version: string | undefined
}

export interface DKAServerCallbackSettings {
    author: string | undefined,
    version: string | undefined
}

export interface DKAServerCallback extends DKACallback {
    status: boolean,
    code: 200 | 202 | 404 | 500 | 501
    msg: string,
    settings: ConfigReactJS | ConfigExpressJS | ConfigFastify | ConfigSocketIO | ConfigSocketIOClient,
    metadata: DKAServerCallbackMetadata
}

export interface DKAServerFastifyCallback extends DKACallback {
    status: boolean,
    code: 200 | 202 | 404 | 500 | 501
    msg: string,
    app: FastifyInstance,
    settings: ConfigFastify,
    metadata: DKAServerCallbackMetadata
}

export interface DKAServerSocketIOCallback extends DKACallback {
    status: boolean,
    code: 200 | 202 | 404 | 500 | 501
    msg: string,
    settings: ConfigSocketIO,
    metadata: DKAServerCallbackMetadata
}

export interface DKAClientCallback extends DKACallback {
    status: boolean,
    code: 200 | 202 | 404 | 500 | 501
    msg: string,
    io: Socket,
    settings: ConfigSocketIOClient,
    metadata: DKAClientCallbackMetadata
}

export interface CallbackError {
    status: false,
    code: 404 | 500 | 502 | 503
    msg: string,
    error: object
}