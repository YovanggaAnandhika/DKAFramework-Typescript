import {ConfigSocketIOClient} from "../Component/SocketIO/Interfaces/ConfigSocketIOClient";
import {ConfigUDPClient} from "../Component/UDP/Interfaces/ConfigUDPClient";


export type ClientSelectorConfig<Config> = Config extends ConfigSocketIOClient ? ConfigSocketIOClient :
    Config extends ConfigUDPClient ? ConfigUDPClient : never;