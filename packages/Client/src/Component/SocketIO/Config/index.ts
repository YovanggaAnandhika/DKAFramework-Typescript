import {ConfigSocketIOClient} from "../Interfaces/ConfigSocketIOClient";


export const ConfigDefaultSocketIOClient : ConfigSocketIOClient = {
    host : "localhost",
    port : 3821,
    ns : "/",
    settings : {
        socket : {
            secure : false,
            timeout : 8000,
            pingMode : "INTERVAL",
            pingDelay : 8000,
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
            pingMode : "INTERVAL",
            pingDelay : 8000,
            transports : ["websocket", "polling"],
            rejectUnauthorized : false
        }
    }
}