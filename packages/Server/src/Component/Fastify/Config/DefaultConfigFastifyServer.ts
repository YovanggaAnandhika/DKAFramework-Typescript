import {Options} from "../../../index";
import {
    ConfigFastifyServer,
    ConfigFastifyServerSettingsEngineHttp,
    ConfigFastifyServerSettingsEngineHttp2,
    ConfigFastifyServerSettingsEngineHttps
} from "../Interfaces/ConfigFastifyServer";
import {readFileSync} from "fs";
import path from "path";
import ejs from "ejs";


export const DefaultConfigFastifyServer : ConfigFastifyServer = {
    engine : Options.ENGINE.FASTIFY,
    host : Options.HOST.LOCALHOST,
    port : 3000,
    app : undefined,
    plugin : {
        cors : {
            enabled : true,
            options : {
                origin : "*",
            }
        },
        view : [
            {
                engine : {
                    ejs : ejs
                }
            }
        ],
        socketIO : {
            enabled : true,
            options : {
                transports : ['websocket','polling'],
                maxHttpBufferSize : 1e8,
                cors : {
                    origin : "*",
                },
                perMessageDeflate : false,
                pingInterval : 1000,
                pingTimeout : 5000,
                connectTimeout : 8000
            }
        },
        formBody : {
            enabled : true,
            options : {
                bodyLimit : 1e10
            }
        },
        cookie : {
            enabled : true,
            options : {
                secret : "@qdj392jd39jje0302jjjsaa",
                hook : "onRequest",
                parseOptions : {}
            }
        }
    },
    settings : {
        engine : {
            type : "HTTP"
        },
        ngrok : {
            enabled : false
        }
    }
}

export const fastifyEngineSettingsDefaultHTTP : ConfigFastifyServerSettingsEngineHttp = {
    type : "HTTP",
    options : {
        
    }
}

export const fastifyEngineSettingsDefaultHTTPS : ConfigFastifyServerSettingsEngineHttps = {
    type : "HTTPS",
    options : {
        https : {
            key : readFileSync(path.join(__dirname, "./Cert/Server/localhost.key")),
            cert : readFileSync(path.join(__dirname, "./Cert/Server/localhost.crt")),
            ca : [
                readFileSync(path.join(__dirname, "./Cert/CA/localhost.crt"))
            ],

            rejectUnauthorized : true,
            requestCert : false
        }
    }
}

export const fastifyEngineSettingsDefaultHTTP2 : ConfigFastifyServerSettingsEngineHttp2 = {
    type: "HTTP2",
    options: {
        http2: true,
        https: {
            allowHTTP1: true,
            key: readFileSync(path.join(__dirname, "./Cert/Server/localhost.key")),
            cert: readFileSync(path.join(__dirname, "./Cert/Server/localhost.crt")),
            ca: [
                readFileSync(path.join(__dirname, "./Cert/CA/localhost.crt"))
            ],
            rejectUnauthorized: true,
            requestCert: false
        }
    }
}


export default DefaultConfigFastifyServer;