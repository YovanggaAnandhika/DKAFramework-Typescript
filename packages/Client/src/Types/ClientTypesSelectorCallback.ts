import {CallbackSocketIOClient} from "../Component/SocketIO/Interfaces/CallbackSocketIOClient";
import {ConfigSocketIOClient} from "../Component/SocketIO/Interfaces/ConfigSocketIOClient";
import {ConfigUDPClient} from "../Component/UDP/Interfaces/ConfigUDPClient";
import {CallbackUDPClient} from "../Component/UDP/Interfaces/CallbackUDPClient";
import {SOCKET_ENGINE} from "../Component/SocketIO/Types/TypesSocketIOClient";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPClient";


export type ClientSelectorCallback<Config> = Config extends { engine : SOCKET_ENGINE } ? CallbackSocketIOClient :
    Config extends { engine : UDP_ENGINE} ? CallbackUDPClient : never;