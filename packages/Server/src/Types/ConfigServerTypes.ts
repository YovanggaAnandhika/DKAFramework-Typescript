import {Server, Socket} from "socket.io";
import { Server as HTTPServer } from "http";
import { Server as HTTPSServer } from "https";
import { Http2Server as HTTP2Server } from "http2";
import {FastifyInstance} from "fastify";
import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {ExtendedError} from "../Interfaces/ConfigServerInterfaces";


export type DEVELOPMENT = "DEVELOPMENT";
export type PRODUCTION = "PRODUCTION";
//####################################################
export const DEVELOPMENT : DEVELOPMENT = "DEVELOPMENT";
export const PRODUCTION : PRODUCTION = "PRODUCTION";
//#################################