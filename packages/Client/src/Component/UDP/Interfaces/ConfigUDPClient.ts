import {UDP_ENGINE} from "../Types/TypesUDPClient";
import {GlobalClientConfigInterfaces} from "../../../Interfaces/ConfigClientInterfaces";


export interface ConfigUDPClient extends GlobalClientConfigInterfaces {
    engine ?: UDP_ENGINE | undefined
}