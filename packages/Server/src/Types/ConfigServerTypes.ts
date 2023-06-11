import {Server, Socket} from "socket.io";
import { Server as HTTPServer } from "http";
import { Server as HTTPSServer } from "https";
import { Http2Server as HTTP2Server } from "http2";
import {FastifyInstance} from "fastify";
import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {ExtendedError} from "../Interfaces/ConfigServerInterfaces";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";
import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";


export type DEVELOPMENT = "DEVELOPMENT";
export type PRODUCTION = "PRODUCTION";
//###################################################
export type ALL_ENGINE = FASTIFY_ENGINE | UDP_ENGINE | WEBPACK_ENGINE | SOCKET_ENGINE;
//####################################################
export const DEVELOPMENT : DEVELOPMENT = "DEVELOPMENT";
export const PRODUCTION : PRODUCTION = "PRODUCTION";
//#################################
