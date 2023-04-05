import {ConfigSocketIOServer} from "./Interfaces/ConfigSocketIOServer";
import {SOCKET_TYPE_FASTIFY, SOCKET_TYPE_HTTP} from "./Types/TypesSocketIOServer";
import { Server } from "socket.io";
import { Server as HTTPServer, ServerOptions as HTTPServerOptions } from "http";
import errorToJSON from 'error-to-json'
import DefaultConfigSocketIOServer from "./Config/DefaultConfigSocketIOServer";
import {merge} from "lodash";
import Fastify, { FastifyInstance } from "fastify";
import {PRODUCTION} from "../../../Types/ConfigServerTypes";

export async function SERVER(config : ConfigSocketIOServer) : Promise<Server> {
    let SocketIO : Server;
    let FastifyServer : FastifyInstance;
    let mHTTP : HTTPServer;
    return new Promise(async (resolve, rejected) => {
        let mConfig = merge(DefaultConfigSocketIOServer, config);
        //#######################################################
        let { createServer } = await import("http");

        //#######################################################
        switch (mConfig.settings?.engine?.protocol) {
            case SOCKET_TYPE_HTTP :
                mHTTP = createServer(mConfig.settings?.engine)
                SocketIO = await new Server(mHTTP, mConfig.settings?.socket);

                await mHTTP.on("listening", async () => {
                    await resolve(SocketIO)
                })

                await mHTTP.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(errorToJSON(err))
                });

                //** force Set host to Wildcard if state production **/
                mConfig.host = (mConfig.state == PRODUCTION) ? "0.0.0.0" : mConfig.host;

                if (mConfig.settings?.engine?.autoListen){
                    await mHTTP.listen(mConfig.port, mConfig.host);
                }
                break;
            case SOCKET_TYPE_FASTIFY :
                FastifyServer = await Fastify();
                SocketIO = await new Server(FastifyServer.server)

                FastifyServer.ready(async (error) => {
                    if (!error){
                        await resolve(SocketIO)
                    }else{
                        delete error.stack;
                        await rejected(errorToJSON(error))
                    }
                })
                FastifyServer.listen({ port : mConfig.port, host : mConfig.host })
                break;
            default :
                mHTTP = createServer(mConfig.settings?.engine as HTTPServerOptions)
                SocketIO = await new Server(mHTTP,mConfig.settings?.socket)

                await mHTTP.on("listening", async () => {
                    await resolve(SocketIO)
                })

                await mHTTP.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(errorToJSON(err))
                });

                //** force Set host to Wildcard if state production **/
                mConfig.host = (mConfig.state == PRODUCTION) ? "0.0.0.0" : mConfig.host;

                if (mConfig.settings?.engine?.autoListen){
                    await mHTTP.listen(mConfig.port, mConfig.host)
                }
                break;
        }
    })

}