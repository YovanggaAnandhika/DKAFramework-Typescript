import {ExtendedError} from "../../../../Interfaces/ConfigServerInterfaces";
import {Namespace, Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {FastifyInstance} from "fastify";
import {Server as HTTPServer} from "http";
import {Http2SecureServer as HTTP2SecureServer} from "http2";
import {Server as HTTPSServer} from "https";


export type SOCKET_ENGINE = "SOCKET.IO";
export type SOCKET_TYPE_HTTP = "HTTP";
export type SOCKET_TYPE_HTTP2 = "HTTP2";
export type SOCKET_TYPE_HTTPS = "HTTPS";
export type SOCKET_TYPE_FASTIFY = "FASTIFY";
//#######################################################
export const SOCKET_ENGINE : SOCKET_ENGINE = "SOCKET.IO";
export const SOCKET_TYPE_HTTP : SOCKET_TYPE_HTTP = "HTTP";
export const SOCKET_TYPE_HTTP2 : SOCKET_TYPE_HTTP2 = "HTTP2";
export const SOCKET_TYPE_HTTPS : SOCKET_TYPE_HTTPS = "HTTPS";
export const SOCKET_TYPE_FASTIFY : SOCKET_TYPE_FASTIFY = "FASTIFY";

export type SocketIOError = (error ?: ExtendedError) => void | undefined;
export type SocketIOSocketServer = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOSocketNamespace = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOSocketMiddlewareSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOMiddlewareUse = (socket : SocketIOSocketMiddlewareSocket, next : SocketIOError) => void | undefined;
export type SocketIOEngineTypes = HTTPServer | HTTP2SecureServer | HTTPSServer;
export type SocketIOEngineCore<Engine extends SocketIOEngineTypes = HTTPServer> = (engineInstance : Engine) => Promise<void> | void | undefined;
export type SocketIOSocketIO = (io : SocketIOSocketServer) => Promise<void> | void