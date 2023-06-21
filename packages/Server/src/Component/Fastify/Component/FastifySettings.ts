import {mFastify} from "../index";
import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import * as ngrok from "ngrok";

export async function FastifySettings(fastify : typeof mFastify, config : ConfigFastifyServer) {
    return new Promise(async (resolve, rejected) => {
        if (config.settings.ngrok.enabled){
            let NgrokConfig : ngrok.Ngrok.Options = {
                authtoken : config.settings.ngrok.authToken,
            }
            if (config.settings.ngrok.onStatusChange !== undefined){
                NgrokConfig.onStatusChange = config.settings.ngrok.onStatusChange
            }

            NgrokConfig.addr = config.port;

            switch (config.settings.engine.type) {
                case "HTTP":
                    NgrokConfig.proto = "http";
                    break;
                case "HTTP2" || "HTTPS" :
                    NgrokConfig.proto = "tls";
                    break;
            }
            await ngrok.connect(NgrokConfig).then(async (data) => {
                const api = ngrok.getApi();
                let tunel = await api.listTunnels();
                resolve(data)
            }).catch(async (error) => {
                console.log(error)
            })
        }else{
            resolve({ status : true, code : 201, msg : `fastify Setting ngrok skipped`})
        }
    })
}