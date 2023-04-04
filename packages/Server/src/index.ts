import {ConfigServerInterfaces} from "./Interfaces/ConfigServerInterfaces";
import {ServerSelector} from "./Types/ServerTypesSelector";
import { default as Options } from "./Config";
import {FASTIFY_ENGINE} from "./Component/Fastify/Types/TypesFastifyServer";
import {SOCKET_ENGINE} from "./Component/SocketIO/Server/Types/TypesSocketIOServer";
import {result} from "lodash";
import {CallbackSocketIOServer} from "./Component/SocketIO/Server/Interfaces/CallbackSocketIOServer";


export async function Server<Config extends ConfigServerInterfaces> (serverConfig : Config) : Promise<ServerSelector<Config>> {
    return new Promise(async (resolve, rejected) => {

        switch (serverConfig.engine) {
            case FASTIFY_ENGINE :

                break;
            case SOCKET_ENGINE :
                let { SERVER } = await import("./Component/SocketIO/Server");
                await SERVER(serverConfig)
                    .then(async (mServerCallbackInstance) => {
                        //################################################################
                        await resolve({ status : true, code : 200, msg : `Server Berhasil Dijalankan` } as ServerSelector<Config>);
                        //################################################################
                    })
                    .catch(async (error) => {
                        await rejected(error)
                    })
                break;
            default :
                await rejected({ status : false, code : 500, msg : `server config unknown. you must declaration engine in config`})
        }
    });
}

export {
    Options
}