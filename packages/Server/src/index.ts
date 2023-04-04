import {SOCKET_ENGINE} from "./Component/SocketIO/Server/Types/TypesSocketIOServer";
import {CallbackSocketIOServer} from "./Component/SocketIO/Server/Interfaces/CallbackSocketIOServer";
import {ConfigServerInterfaces} from "./Interfaces/ConfigServerInterfaces";

export type ServerSelector<Config> = Config extends { engine : SOCKET_ENGINE } ? CallbackSocketIOServer : never;

export async function Server<Config extends ConfigServerInterfaces> (serverConfig : Config) : Promise<ServerSelector<Config>> {
    return new Promise(async (resolve, rejected) => {

    });
}