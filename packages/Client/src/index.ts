import {ConfigClientInterfaces} from "./Interfaces/ConfigClientInterfaces";
import {ClientSelectorCallback} from "./Types/ClientTypesSelectorCallback";
import {SOCKET_ENGINE} from "./Component/SocketIO/Types/TypesSocketIOClient";
import {UDP_ENGINE} from "./Component/UDP/Types/TypesUDPClient";
import {ClientSelectorConfig} from "./Types/ClientTypesSelectorConfig";


export async function Client<Config extends ConfigClientInterfaces> (clientConfig : ClientSelectorConfig<Config>) : Promise<ClientSelectorCallback<Config>> {
    return new Promise(async (resolve) => {

    })
}
export default Client;