import {
    GlobalServerConfigInterfaces,
    GlobalServerConfigInterfacesSettingsLogger
} from "../../../Interfaces/ConfigServerInterfaces";
import {ConfigUDPServerOnMessage, UDP_ENGINE} from "../Types/TypesUDPServer";
import { Socket, RemoteInfo } from "dgram";
import {DEVELOPMENT, PRODUCTION} from "../../../Types/ConfigServerTypes";


export interface ConfigUDPServerOn {
    Listening ?: () => void,
    Message ?: ConfigUDPServerOnMessage | undefined
}

export interface ConfigUDPServerInstanceSettings {
    logger ?: GlobalServerConfigInterfacesSettingsLogger
}
export interface ConfigUDPServerInstance {
    engine ?: UDP_ENGINE | undefined,
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    on ?: ConfigUDPServerOn | undefined,
    settings ?: ConfigUDPServerInstanceSettings

}

export type ConfigUDPServer = ConfigUDPServerInstance

export interface UDPList {
    [ name : string ] : Socket
}