import {SocketIOSocketIO} from "../Component/SocketIO/Types/TypesSocketIOServer";
import {Server} from "socket.io";

declare module 'fastify' {
    export interface FastifyInstance {
        io : Server
    }
}