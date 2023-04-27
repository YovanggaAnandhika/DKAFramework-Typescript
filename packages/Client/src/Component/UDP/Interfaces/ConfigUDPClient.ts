import {UDP_ENGINE} from "../Types/TypesUDPClient";
import {GlobalClientConfigInterfaces} from "../../../Interfaces/ConfigClientInterfaces";


export interface ConfigUDPClientInstance {
    engine ?: UDP_ENGINE | undefined
}

export type ConfigUDPClient = ConfigUDPClientInstance & GlobalClientConfigInterfaces;