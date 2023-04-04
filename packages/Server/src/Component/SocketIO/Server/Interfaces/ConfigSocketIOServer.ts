import {ConfigServerInterfaces} from "../../../../Interfaces/ConfigServerInterfaces";
import {SOCKET_ENGINE} from "../Types/TypesSocketIOServer";


export interface ConfigSocketIOServer extends ConfigServerInterfaces {
    engine ?: SOCKET_ENGINE | undefined
}