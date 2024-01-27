import {ConfigSocketIOClient} from "../Interfaces/ConfigSocketIOClient";


export const ConfigDefaultSocketIOClient : ConfigSocketIOClient = {
    host : "localhost",
    port : 53310,
    ns : "/",
    settings : {
        manager : {
            secure : false,
            timeout : 8000,
            autoConnect : false,
            transports : ["websocket", "polling"]
        },
        socket : {
            pingMode : "INTERVAL",
            pingDelay : 8000,
        }
    }
}

export const ConfigDefaultSocketIOClientHTTPS : ConfigSocketIOClient = {
    host : "localhost",
    port : 53310,
    ns : "/",
    settings : {
        manager : {
            secure : true,
            timeout : 8000,
            autoConnect : false,
            transports : ["websocket", "polling"],
            rejectUnauthorized : false,
        },
        socket : {
            pingMode : "INTERVAL",
            pingDelay : 8000,
        },
    }
}