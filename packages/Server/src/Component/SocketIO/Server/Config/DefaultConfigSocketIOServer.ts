import { readFileSync } from "fs";
import path from "path"
import {ConfigSocketIOServer} from "../Interfaces/ConfigSocketIOServer";
import {Options} from "../../../../index";

export const DefaultConfigSocketIOServer : ConfigSocketIOServer = {
    engine : Options.ENGINE.SOCKETIO,
    host : Options.HOST.LOCALHOST,
    port : Options.PORT.DEFAULT,
    settings : {
        engine : {
            protocol : "HTTP",
            autoListen : true,
        },
        socket : {
            transports : ['websocket','polling']
        }
    }
}

export default DefaultConfigSocketIOServer;