import {Server} from "socket.io";
import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {Http2Server as HTTP2Server} from "http2";
import {Server as HTTPServer} from "http";
import {Server as HTTPSServer} from "https";
import {FastifyInstance} from "fastify";

export interface CallbackServerSocketIOComponent {
    socket : Server,
    config : ConfigSocketIOServer,
    server : HTTP2Server | HTTPServer | HTTPSServer | FastifyInstance
}