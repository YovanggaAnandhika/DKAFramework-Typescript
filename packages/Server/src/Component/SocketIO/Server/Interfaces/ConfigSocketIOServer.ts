import {ConfigServerInterfaces, GlobalConfigInterfaces} from "../../../../Interfaces/ConfigServerInterfaces";
import {SOCKET_ENGINE} from "../Types/TypesSocketIOServer";

export interface ConfigSocketIOServer extends GlobalConfigInterfaces {
    engine ?: SOCKET_ENGINE | undefined
}