import {SOCKET_ENGINE} from "../Component/SocketIO/Types/TypesSocketIOClient";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPClient";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigClientTypes";


export const ConfigClientOptionsEngine = {
    SOCKETIO : SOCKET_ENGINE,
    UDP : UDP_ENGINE
}

export const ConfigClientOptionsState = {
    DEVELOPMENT : DEVELOPMENT,
    PRODUCTION : PRODUCTION
}
export const ConfigClientOptions = {
    STATE : ConfigClientOptionsState,
    ENGINE : ConfigClientOptionsEngine
}

export default ConfigClientOptions;