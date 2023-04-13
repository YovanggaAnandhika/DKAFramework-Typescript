import {SOCKET_ENGINE} from "../Component/SocketIO/Types/TypesSocketIOClient";
import {CallbackSocketIOClient} from "../Component/SocketIO/Interfaces/CallbackSocketIOClient";


export type ClientSelector<Config> = Config extends { engine : SOCKET_ENGINE } ? CallbackSocketIOClient : never;