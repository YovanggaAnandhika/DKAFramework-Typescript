import {SocketIOConfig} from "./index.tsx";


export const SocketIOConfigDefault : SocketIOConfig = {
    host : "127.0.0.1",
    port : 3000,
    settings : {
        secure : false,
        reconnection : true,
        reconnectionAttempts : 10,
        reconnectionDelay : 1000,
        reconnectionDelayMax : 1800,
        autoConnect : false,
        timeout : 1000,
        requestTimeout : 8000,
        ackTimeout : 3000
    }
}