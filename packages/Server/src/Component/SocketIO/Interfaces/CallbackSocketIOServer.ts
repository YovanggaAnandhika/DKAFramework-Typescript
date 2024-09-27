import {Server as HTTPServer} from "http";
import {Server as HTTPSServer} from "https";
import {Http2Server as HTTP2Server} from "http2";
import {
    SOCKET_TYPE_FASTIFY,
    SOCKET_TYPE_HTTP,
    SOCKET_TYPE_HTTP2,
    SOCKET_TYPE_HTTPS
} from "../Types/TypesSocketIOServer";
import {Server} from "socket.io";
import {FastifyInstance} from "fastify";
import {ConfigSocketIOServer} from "./ConfigSocketIOServer";

export type CallbackSocketIOServerChecked<Config> =
    Config extends { settings : { engine : { protocol : SOCKET_TYPE_HTTP }}} ? HTTPServer :
        Config extends { settings : { engine : { protocol : SOCKET_TYPE_HTTPS }}} ? HTTPSServer :
            Config extends { settings : { engine : { protocol : SOCKET_TYPE_HTTP2 }}} ? HTTP2Server :
                Config extends { settings : { engine : { protocol : SOCKET_TYPE_FASTIFY }}} ? FastifyInstance :
        never;

export interface CallbackSocketIOServer<Config> {
    status : boolean,
    code : number,
    msg : string,
    getConfig : ConfigSocketIOServer,
    engine : {
        socket : Server
        server : CallbackSocketIOServerChecked<Config>
    }
}