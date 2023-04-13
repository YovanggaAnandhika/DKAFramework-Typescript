import {ConfigClientInterfaces} from "./Interfaces/ConfigClientInterfaces";
import {ClientSelector} from "./Types/ClientTypesSelector";
import {SOCKET_ENGINE} from "./Component/SocketIO/Types/TypesSocketIOClient";
import {UDP_ENGINE} from "./Component/UDP/Types/TypesUDPClient";


export async function Client<Config extends ConfigClientInterfaces> (clientConfig : Config) : Promise<ClientSelector<Config>> {
    return new Promise(async (resolve, rejected) => {
        switch (clientConfig.engine) {
            case SOCKET_ENGINE :
                //
                break;
            case UDP_ENGINE :

                break;
        }
    })
}

export default Client;