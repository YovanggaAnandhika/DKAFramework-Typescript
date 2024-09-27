import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";
import {SOCKET_ENGINE} from "../Component/SocketIO/Types/TypesSocketIOServer";


export type DEVELOPMENT = "DEVELOPMENT";
export type PRODUCTION = "PRODUCTION";
//###################################################
export type ALL_ENGINE = FASTIFY_ENGINE | UDP_ENGINE | WEBPACK_ENGINE | SOCKET_ENGINE;
//####################################################
export const DEVELOPMENT : DEVELOPMENT = "DEVELOPMENT";
export const PRODUCTION : PRODUCTION = "PRODUCTION";
//#################################
