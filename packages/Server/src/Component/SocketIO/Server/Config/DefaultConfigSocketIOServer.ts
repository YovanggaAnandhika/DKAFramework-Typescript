import {ConfigSocketIOServer} from "../Interfaces/ConfigSocketIOServer";
import {SOCKET_ENGINE} from "../Types/TypesSocketIOServer";

export const DefaultConfigSocketIOServer : ConfigSocketIOServer = {
    engine : SOCKET_ENGINE,
    host : "127.0.0.1",
    port : 8832,
    settings : {
        protocol : "HTTP",
        autoListen : true
    }
}

export default DefaultConfigSocketIOServer;