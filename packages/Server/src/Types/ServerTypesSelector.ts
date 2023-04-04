import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";
import {CallbackSocketIOServer} from "../Component/SocketIO/Server/Interfaces/CallbackSocketIOServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {CallbackFastifyServer} from "../Component/Fastify/Interfaces/CallbackFastifyServer";

export type ServerSelector<Config> = Config extends { engine : SOCKET_ENGINE } ? CallbackSocketIOServer :
    Config extends { engine : FASTIFY_ENGINE } ? CallbackFastifyServer : never;