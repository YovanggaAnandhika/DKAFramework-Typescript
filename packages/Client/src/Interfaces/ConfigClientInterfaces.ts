import {ConfigUDPClient} from "../Component/UDP/Interfaces/ConfigUDPClient";
import {ConfigSocketIOClient} from "../Component/SocketIO/Interfaces/ConfigSocketIOClient";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigClientTypes";


export interface GlobalClientConfigInterfaces {
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string,
    port ?: number
}

export type ConfigClientInterfaces = ConfigUDPClient | ConfigSocketIOClient;