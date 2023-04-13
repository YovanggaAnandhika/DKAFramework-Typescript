import {SOCKET_ENGINE} from "../Types/TypesSocketIOClient";
import {GlobalClientConfigInterfaces} from "../../../Interfaces/ConfigClientInterfaces";

export interface ConfigSocketIOClient extends GlobalClientConfigInterfaces {
    engine ?: SOCKET_ENGINE | undefined
}