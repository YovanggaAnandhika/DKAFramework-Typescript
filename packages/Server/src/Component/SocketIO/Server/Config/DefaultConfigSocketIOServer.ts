import {ConfigSocketIOServer} from "../Interfaces/ConfigSocketIOServer";
import {SOCKET_ENGINE} from "../Types/TypesSocketIOServer";
import {Options} from "../../../../index";

export const DefaultConfigSocketIOServer : ConfigSocketIOServer = {
    engine : Options.ENGINE.SOCKETIO,
    host : "127.0.0.1",
    port : 8832,
    settings : {
        engine : {
            protocol : "HTTP",
            autoListen : true
        }
    }
}

export default DefaultConfigSocketIOServer;