import {SOCKET_ENGINE} from "./Component/SocketIO/Server/Types/TypesSocketIOServer";
import {ConfigServerInterfaces} from "./Interfaces/ConfigServerInterfaces";
import {ServerSelector} from "./Types/ServerTypesSelector";


export async function Server<Config extends ConfigServerInterfaces> (serverConfig : Config) : Promise<ServerSelector<Config>> {
    return new Promise(async (resolve, rejected) => {

    });
}