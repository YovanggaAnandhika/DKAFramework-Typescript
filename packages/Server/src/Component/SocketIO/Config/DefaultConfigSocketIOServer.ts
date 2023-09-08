import {readFileSync} from "fs";
import path from "path"
import {ConfigSocketIOServer} from "../Interfaces/ConfigSocketIOServer";
import {Options} from "../../../index";

export const DefaultConfigSocketIOHTTPServer : ConfigSocketIOServer = {
    engine : Options.ENGINE.SOCKETIO,
    host : Options.HOST.LOCALHOST,
    port : Options.PORT.DEFAULT,
    settings : {
        engine : {
            protocol : Options.SETTINGS.ENGINE.PROTOCOL.HTTP,
            autoListen : true,
        },
        socket : {
            allowEIO3 : true,
            transports : ['websocket','polling'],
            maxHttpBufferSize : 1e8,
            cors : {
                origin : "*",
            },
            pingProtocol : "UDP",
            pingInterval : 1000,
            pingTimeout : 5000,
            connectTimeout : 8000
        }
    }
}

export const DefaultConfigSocketIOHTTPSServer : ConfigSocketIOServer = {
    engine : Options.ENGINE.SOCKETIO,
    host : Options.HOST.LOCALHOST,
    port : Options.PORT.DEFAULT,
    settings : {
        engine : {
            protocol : Options.SETTINGS.ENGINE.PROTOCOL.HTTPS,
            cert : readFileSync(path.join(__dirname,"./Cert/Server/localhost.crt")),
            key : readFileSync(path.join(__dirname,"./Cert/Server/localhost.key")),
            ca : [
                readFileSync(path.join(__dirname,"./Cert/CA/localhost.crt"))
            ],
            rejectUnauthorized : false,
            requestCert : false,
            autoListen : true,
        },
        socket : {
            allowEIO3 : true,
            transports : ['websocket','polling'],
            cors : {
                origin : "*"
            },
            pingProtocol : "UDP",
            maxHttpBufferSize : 1e8,
            pingInterval : 1000,
            pingTimeout : 5000,
            connectTimeout : 8000
        }
    }
}

export const DefaultConfigSocketIOHTTP2Server : ConfigSocketIOServer = {
    engine : Options.ENGINE.SOCKETIO,
    host : Options.HOST.LOCALHOST,
    port : Options.PORT.DEFAULT,
    settings : {
        engine : {
            protocol : Options.SETTINGS.ENGINE.PROTOCOL.HTTP2,
            allowHTTP1 : true,
            cert : readFileSync(path.join(__dirname,"./Cert/Server/localhost.crt")),
            key : readFileSync(path.join(__dirname,"./Cert/Server/localhost.key")),
            ca : [
                readFileSync(path.join(__dirname,"./Cert/CA/localhost.crt"))
            ],
            rejectUnauthorized : false,
            autoListen : true,
        },
        socket : {
            allowEIO3 : true,
            transports : ['websocket','polling'],
            maxHttpBufferSize : 1e8,
            cors : {
                origin : "*"
            },
            pingProtocol : "UDP",
            pingInterval : 1000,
            pingTimeout : 5000,
            connectTimeout : 8000
        }
    }
}
