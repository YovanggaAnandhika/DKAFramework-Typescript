import {ConfigSocketIOServer} from "./Interfaces/ConfigSocketIOServer";
import {SOCKET_TYPE_FASTIFY, SOCKET_TYPE_HTTP, SOCKET_TYPE_HTTP2, SOCKET_TYPE_HTTPS} from "./Types/TypesSocketIOServer";
import { Server } from "socket.io";
import { createServer as createServerHTTP, Server as HTTPServer, ServerOptions as HTTPServerOptions } from "http";
import { createServer as createServerHTTPS, Server as HTTPSServer, ServerOptions as HTTPSServerOptions } from "https";
import { createServer as createServerHTTP2, createSecureServer as createSecureServerHTTP2, Http2Server as HTTP2Server, Http2SecureServer as HTTP2SecureServer, SecureServerOptions as HTTP2SecureServerOptions, ServerOptions as HTTP2ServerOptions } from "http2";
import errorToJSON from 'error-to-json'
import DefaultConfigSocketIOServer from "./Config/DefaultConfigSocketIOServer";
import {merge} from "lodash";
import Fastify, { FastifyInstance } from "fastify";
import {PRODUCTION} from "../../../Types/ConfigServerTypes";
import {Options} from "../../../index";

export async function SERVER(config : ConfigSocketIOServer) : Promise<Server> {
    //################ Declaration Variable ###########################
    let SocketIO : Server;
    let FastifyServer : FastifyInstance;
    let mHTTP : HTTPServer;
    let mHTTP2 : HTTP2SecureServer;
    let mHTTPS : HTTPSServer;
    //################ Declaration Variable ###########################
    return new Promise(async (resolve, rejected) => {
        let mConfig = merge(DefaultConfigSocketIOServer, config);
        //#######################################################
        switch (mConfig.settings?.engine?.protocol) {
            case SOCKET_TYPE_HTTP :
                mHTTP = createServerHTTP(mConfig.settings?.engine)
                SocketIO = await new Server(mHTTP, mConfig.settings?.socket);

                await mHTTP.on("listening", async () => {
                    await resolve(SocketIO)
                })

                await mHTTP.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(errorToJSON(err))
                });

                //** force Set host to Wildcard if state production **/
                mConfig.host = (mConfig.state == PRODUCTION) ? Options.HOST.WILDCARD : mConfig.host;

                if (mConfig.settings?.engine?.autoListen){
                    await mHTTP.listen(mConfig.port, mConfig.host);
                }
                break;
            case SOCKET_TYPE_HTTP2 :
                mHTTP2 = createSecureServerHTTP2(mConfig.settings?.engine)
                SocketIO = await new Server(mHTTP2, mConfig.settings?.socket);

                await mHTTP2.on("listening", async () => {
                    await resolve(SocketIO)
                })

                await mHTTP2.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(errorToJSON(err))
                });

                //** force Set host to Wildcard if state production **/
                mConfig.host = (mConfig.state == PRODUCTION) ? Options.HOST.WILDCARD : mConfig.host;

                if (mConfig.settings?.engine?.autoListen){
                    await mHTTP2.listen(mConfig.port, mConfig.host);
                }
                break;
            case SOCKET_TYPE_HTTPS :
                mHTTPS = createServerHTTPS(mConfig.settings?.engine)
                SocketIO = await new Server(mHTTPS, mConfig.settings?.socket);

                await mHTTPS.on("listening", async () => {
                    SocketIO.engine.on("connection", (rawSocket) => {
                        // if you need the certificate details (it is no longer available once the handshake is completed)
                        rawSocket.peerCertificate = rawSocket.request.client.getPeerCertificate();
                    });
                    SocketIO.on("connection", async (io) => {
                        // @ts-ignore
                        console.log(io.conn.peerCertificate);
                    })
                    await resolve(SocketIO)
                })

                //Error handler
                process.on('uncaughtException', function (exception) {
                    // handle or ignore error
                    console.log(exception);
                });

                await mHTTPS.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(errorToJSON(err))
                });

                //** force Set host to Wildcard if state production **/
                mConfig.host = (mConfig.state == PRODUCTION) ? Options.HOST.WILDCARD : mConfig.host;

                if (mConfig.settings?.engine?.autoListen){
                    await mHTTPS.listen(mConfig.port, mConfig.host, async () => {

                    });
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
                mHTTP = createServerHTTP(mConfig.settings?.engine as HTTPServerOptions)
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