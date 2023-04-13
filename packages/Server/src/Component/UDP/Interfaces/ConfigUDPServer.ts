import {GlobalServerConfigInterfaces} from "../../../Interfaces/ConfigServerInterfaces";
import {UDP_ENGINE} from "../Types/TypesUDPServer";
import { Socket, RemoteInfo } from "dgram";

export interface ConfigUDPServerOn {
    Listening : () => void,
    Message : (message : Buffer, info ?: RemoteInfo | undefined) => void
}
export interface ConfigUDPServer extends GlobalServerConfigInterfaces {
    engine ?: UDP_ENGINE | undefined,
    on ?: ConfigUDPServerOn | undefined
}

export interface UDPList {
    [ name : string ] : Socket
}