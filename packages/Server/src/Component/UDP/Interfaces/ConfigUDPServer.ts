import {GlobalServerConfigInterfaces} from "../../../Interfaces/ConfigServerInterfaces";
import {ConfigUDPServerOnMessage, UDP_ENGINE} from "../Types/TypesUDPServer";
import { Socket, RemoteInfo } from "dgram";


export interface ConfigUDPServerOn {
    Listening ?: () => void,
    Message ?: ConfigUDPServerOnMessage | undefined
}
export interface ConfigUDPServerInstance {
    engine ?: UDP_ENGINE | undefined,
    on ?: ConfigUDPServerOn | undefined
}

export type ConfigUDPServer = ConfigUDPServerInstance & GlobalServerConfigInterfaces

export interface UDPList {
    [ name : string ] : Socket
}