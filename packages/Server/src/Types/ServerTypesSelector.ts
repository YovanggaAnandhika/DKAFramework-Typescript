import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";
import {CallbackSocketIOServer} from "../Component/SocketIO/Server/Interfaces/CallbackSocketIOServer";
import {FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {CallbackFastifyServer} from "../Component/Fastify/Interfaces/CallbackFastifyServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {CallbackUDPServer} from "../Component/UDP/Interfaces/CallbackUDPServer";


export type ServerSelectorObject<Config> = Config extends { engine : SOCKET_ENGINE } ? CallbackSocketIOServer<Config> :
    Config extends { engine : FASTIFY_ENGINE } ? CallbackFastifyServer :
        Config extends { engine : UDP_ENGINE } ? CallbackUDPServer : never;
export type ServerSelector<Config> = Config extends Object ?  ServerSelectorObject<Config> : never ;