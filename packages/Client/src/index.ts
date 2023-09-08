import {ConfigClientInterfaces} from "./Interfaces/ConfigClientInterfaces";
import {ClientSelectorCallback} from "./Types/ClientTypesSelectorCallback";
import {SOCKET_ENGINE} from "./Component/SocketIO/Types/TypesSocketIOClient";
import {UDP_ENGINE} from "./Component/UDP/Types/TypesUDPClient";
import {ClientSelectorConfig} from "./Types/ClientTypesSelectorConfig";
import SocketIOInstance from "./Component/SocketIO";


export async function Client(clientConfig : ConfigClientInterfaces) : Promise<ClientSelectorCallback<typeof clientConfig>> {
    return new Promise(async (resolve, rejected) => {
        switch (clientConfig.engine) {
            case SOCKET_ENGINE :
                let socket = SocketIOInstance(clientConfig);
                resolve({ socket : socket } as ClientSelectorCallback<typeof clientConfig>);
                break;
            case UDP_ENGINE :

                break;
        }
    })
}
export default Client;