import {SOCKET_ENGINE} from "../Types/TypesSocketIOClient";
import {GlobalClientConfigInterfaces} from "../../../Interfaces/ConfigClientInterfaces";
import {ManagerOptions, SocketOptions} from "socket.io-client";


export interface ConfigSocketIOClientInstanceSettings {
    socket ?: Partial<ManagerOptions & SocketOptions>
}

export interface ConfigSocketIOClientInstance {
    engine ?: SOCKET_ENGINE | undefined,
    settings ?: ConfigSocketIOClientInstanceSettings
}

export type ConfigSocketIOClient = ConfigSocketIOClientInstance & GlobalClientConfigInterfaces;