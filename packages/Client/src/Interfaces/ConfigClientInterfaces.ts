import {ConfigUDPClient} from "../Component/UDP/Interfaces/ConfigUDPClient";
import {ConfigSocketIOClient} from "../Component/SocketIO/Interfaces/ConfigSocketIOClient";


export interface GlobalClientConfigInterfaces extends Object {

}

export type ConfigClientInterfaces = ConfigUDPClient | ConfigSocketIOClient;