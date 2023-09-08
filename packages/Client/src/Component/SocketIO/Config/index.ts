import {ConfigSocketIOClient} from "../Interfaces/ConfigSocketIOClient";
import {SOCKET_TYPE_HTTP, SOCKET_TYPE_HTTPS} from "../Types/TypesSocketIOClient";


export const ConfigDefaultSocketIOClient : ConfigSocketIOClient = {
    host : "localhost",
    port : 3821,
    ns : "/",
    settings : {
        socket : {
            secure : false,
            timeout : 8000,
            pingIntervalToServer : 4000,
            transports : ["websocket", "polling"]
        }
    }
}

export const ConfigDefaultSocketIOClientHTTPS : ConfigSocketIOClient = {
    host : "localhost",
    port : 3821,
    ns : "/",
    settings : {
        socket : {
            secure : true,
            timeout : 8000,
            pingIntervalToServer : 4000,
            transports : ["websocket", "polling"],
            rejectUnauthorized : false
        }
    }
}