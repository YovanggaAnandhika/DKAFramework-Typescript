import {Options} from "../../../index";
import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import {readFileSync} from "fs";
import path from "path";


export const DefaultConfigSocketIOHTTPServer : ConfigFastifyServer = {
    engine : Options.ENGINE.FASTIFY,
    host : Options.HOST.LOCALHOST,
    port : 3000,
    app : async (app, opts, next) => {
      await next();
    },
    settings : {
        engine : {
            http2 : true,
            https : {
                allowHTTP1 : true,
                key : readFileSync(path.join(__dirname, "./Cert/Server/localhost.key")),
                cert : readFileSync(path.join(__dirname, "./Cert/Server/localhost.crt")),
                ca : [
                    readFileSync(path.join(__dirname, "./Cert/CA/localhost.key"))
                ],
                rejectUnauthorized : false,
                requestCert : false
            }
        }
    }
}

export default DefaultConfigSocketIOHTTPServer;