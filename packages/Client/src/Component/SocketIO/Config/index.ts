import {ConfigSocketIOClient} from "../Interfaces/ConfigSocketIOClient";


export const ConfigDefaultSocketIOClient : ConfigSocketIOClient = {
    host : "localhost",
    port : 53310,
    ns : "/",
    settings : {
        socket : {
            secure : false,
            timeout : 8000,
            autoConnect : false,
            pingMode : "INTERVAL",
            pingDelay : 4000,
            transports : ["websocket", "polling"]
        }
    }
}

export const ConfigDefaultSocketIOClientHTTPS : ConfigSocketIOClient = {
    host : "localhost",
    port : 53310,
    ns : "/",
    settings : {
        socket : {
            secure : true,
            timeout : 8000,
            pingMode : "INTERVAL",
            autoConnect : false,
            pingDelay : 4000,
            transports : ["websocket", "polling"],
            rejectUnauthorized : false,
        },
    }
}