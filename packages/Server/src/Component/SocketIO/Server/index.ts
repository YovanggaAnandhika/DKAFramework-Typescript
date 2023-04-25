import {
    ConfigSocketIOServer,
    ConfigSocketIOServerSettingsCluster, ConfigSocketIOServerSettingsFastify,
    ConfigSocketIOServerSettingsHTTP, ConfigSocketIOServerSettingsHTTPS
} from "./Interfaces/ConfigSocketIOServer";
import {SOCKET_TYPE_FASTIFY, SOCKET_TYPE_HTTP, SOCKET_TYPE_HTTP2, SOCKET_TYPE_HTTPS} from "./Types/TypesSocketIOServer";
import { Server } from "socket.io";
import os from "node:os";
import cluster from "node:cluster";
import {
    createServer as createServerHTTP,
    IncomingMessage,
    Server as HTTPServer,
    ServerOptions as HTTPServerOptions, ServerResponse
} from "http";
import { createServer as createServerHTTPS, Server as HTTPSServer, ServerOptions as HTTPSServerOptions } from "https";
import { createServer as createServerHTTP2, createSecureServer as createSecureServerHTTP2, Http2Server as HTTP2Server, Http2SecureServer as HTTP2SecureServer, SecureServerOptions as HTTP2SecureServerOptions, ServerOptions as HTTP2ServerOptions } from "http2";
import {
    DefaultConfigSocketIOHTTP2Server,
    DefaultConfigSocketIOHTTPServer,
    DefaultConfigSocketIOHTTPSServer
} from "./Config/DefaultConfigSocketIOServer";
import {merge} from "lodash";
import Fastify, { FastifyInstance } from "fastify";
import {PRODUCTION} from "../../../Types/ConfigServerTypes";
import {Options} from "../../../index";
import {CallbackServerSocketIOComponent} from "../../../Interfaces/CallbackServerInterfaces";
import SocketIOEngineHeaders from "./Component/SocketIOEngineHeaders";
import {SocketIOMiddleware} from "./Component/SocketIOMiddleware";
import tcpPortUsed from "tcp-port-used";

async function ServerSelectedSocketIO<Config extends ConfigSocketIOServer>(config : Config) : Promise<CallbackServerSocketIOComponent> {
    //################ Declaration Variable ###########################
    let SocketIO : Server;
    let FastifyServer : FastifyInstance;
    let mHTTP : HTTPServer;
    let mHTTP2 : HTTP2SecureServer;
    let mHTTPS : HTTPSServer;
    //################ Declaration Variable ###########################
    return new Promise(async (resolve, rejected) => {
        switch (config.settings?.engine?.protocol) {
            case SOCKET_TYPE_HTTP :
                config = await merge(DefaultConfigSocketIOHTTPServer, config);
                mHTTP = createServerHTTP(config.settings?.engine as HTTPServerOptions, (config.settings?.engine as ConfigSocketIOServerSettingsHTTP)?.requestListeners);
                SocketIO = await new Server(mHTTP, config.settings?.socket);
                //** Header Set
                SocketIO = SocketIOEngineHeaders(SocketIO);
                SocketIO.use(SocketIOMiddleware);
                if (config.use !== undefined){
                    await SocketIO.use(config.use)
                }
                /** Event on Connection Data **/
                if (config.events?.socket?.onConnection !== undefined){
                    await SocketIO.on("connection", async (io) => {
                        await config.events?.socket?.onConnection?.(io);
                        //** Event On Disconnection Data **/
                        if (config.events?.socket?.onDisconnection !== undefined){
                            await io.on("disconnect", async (reason) => {
                                await config.events?.socket?.onDisconnection?.(reason);
                            });
                        }
                        //** End Event On Disconnection Data **/
                    });
                }
                /** Event on Connection Data **/
                if (config.io !== undefined){
                    await config.io?.(SocketIO)
                }

                await mHTTP.on("listening", async () => {
                    await config.events?.server?.onListening?.();
                })

                await mHTTP.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(require("error-to-json")(err))
                });

                //** force Set host to Wildcard if state production **/
                config.host = (config.state == PRODUCTION) ? Options.HOST.WILDCARD : config.host;

                if (config.settings?.engine?.autoListen){
                    await mHTTP.listen(config.port, config.host, async () => {
                        await resolve({ socket : SocketIO, server : mHTTP, config : config });
                    });
                }else{
                    await resolve({ socket : SocketIO, server : mHTTP, config : config })
                }
                break;
            case SOCKET_TYPE_HTTP2 :
                config = await merge(DefaultConfigSocketIOHTTP2Server, config);
                mHTTP2 = createSecureServerHTTP2(config.settings?.engine  as HTTP2ServerOptions)
                SocketIO = await new Server(mHTTP2, config.settings?.socket);
                //** Header Set
                SocketIO = SocketIOEngineHeaders(SocketIO);
                SocketIO.use(SocketIOMiddleware);
                if (config.use !== undefined){
                    await SocketIO.use(config.use)
                }
                /** Event on Connection Data **/
                if (config.events?.socket?.onConnection !== undefined){
                    await SocketIO.on("connection", async (io) => {
                        await config.events?.socket?.onConnection?.(io);
                        //** Event On Disconnection Data **/
                        if (config.events?.socket?.onDisconnection !== undefined){
                            await io.on("disconnect", async (reason) => {
                                await config.events?.socket?.onDisconnection?.(reason);
                            });
                        }
                        //** End Event On Disconnection Data **/
                    });
                }
                /** Event on Connection Data **/
                if (config.io !== undefined){
                    await config.io?.(SocketIO)
                }
                await mHTTP2.on("listening", async () => {
                    await config.events?.server?.onListening?.();

                })

                await mHTTP2.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(require("error-to-json")(err))
                });

                //** force Set host to Wildcard if state production **/
                config.host = (config.state == PRODUCTION) ? Options.HOST.WILDCARD : config.host;

                if (config.settings?.engine?.autoListen){
                    await mHTTP2.listen(config.port, config.host, async () => {
                        await resolve({ socket : SocketIO, server : mHTTP2, config : config })
                    });
                }else{
                    await resolve({ socket : SocketIO, server : mHTTP2, config : config })
                }
                break;
            case SOCKET_TYPE_HTTPS :
                config = await merge(DefaultConfigSocketIOHTTPSServer, config);
                mHTTPS = createServerHTTPS(config.settings?.engine  as HTTPSServerOptions);
                SocketIO = await new Server(mHTTPS, config.settings?.socket);
                //** Header Set
                SocketIO = SocketIOEngineHeaders(SocketIO);
                SocketIO.use(SocketIOMiddleware);
                if (config.use !== undefined){
                    await SocketIO.use(config.use)
                }
                SocketIO.engine.on("connection", (rawSocket) => {
                    // if you need the certificate details (it is no longer available once the handshake is completed)
                    rawSocket.peerCertificate = rawSocket.request.client.getPeerCertificate();
                });
                await process.on("SIGINT", async () => {
                    mHTTPS.close();
                    SocketIO.close();
                    process.exit();
                    process.kill(process.pid)
                });
                /** Event on Connection Data **/
                if (config.events?.socket?.onConnection !== undefined){
                    await SocketIO.on("connection", async (io) => {
                        await config.events?.socket?.onConnection?.(io);
                        //** Event On Disconnection Data **/
                        if (config.events?.socket?.onDisconnection !== undefined){
                            await io.on("disconnect", async (reason) => {
                                await config.events?.socket?.onDisconnection?.(reason);
                            });
                        }
                        //** End Event On Disconnection Data **/
                    });
                }
                /** Event on Connection Data **/
                if (config.io !== undefined){
                    await config.io?.(SocketIO)
                }
                await mHTTPS.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(require("error-to-json")(err))
                });

                //** force Set host to Wildcard if state production **/
                config.host = (config.state == PRODUCTION) ? Options.HOST.WILDCARD : config.host;

                if (config.settings?.engine?.autoListen){
                    await mHTTPS.on("listening", async () => {
                        await config.events?.server?.onListening?.();
                    })
                    await mHTTPS.listen(config.port, config.host, async () => {
                        await resolve({ socket : SocketIO, server : mHTTPS, config : config as ConfigSocketIOServer })
                    });
                }else{
                    await resolve({ socket : SocketIO, server : mHTTPS, config : config as ConfigSocketIOServer })
                }
                break;
            case SOCKET_TYPE_FASTIFY :
                FastifyServer = await Fastify();
                SocketIO = await new Server(FastifyServer.server)
                //** Header Set
                SocketIO = SocketIOEngineHeaders(SocketIO);
                SocketIO.use(SocketIOMiddleware);
                if (config.use !== undefined){
                    await SocketIO.use(config.use)
                }
                /** Event on Connection Data **/
                if (config.events?.socket?.onConnection !== undefined){
                    await SocketIO.on("connection", async (io) => {
                        await config.events?.socket?.onConnection?.(io);
                        //** Event On Disconnection Data **/
                        if (config.events?.socket?.onDisconnection !== undefined){
                            await io.on("disconnect", async (reason) => {
                                await config.events?.socket?.onDisconnection?.(reason);
                            });
                        }
                        //** End Event On Disconnection Data **/
                    });
                }
                /** Event on Connection Data **/
                if (config.io !== undefined){
                    await config.io?.(SocketIO)
                }
                if (config.settings?.engine?.autoListen){
                    await FastifyServer.ready(async (error) => {
                        await config.events?.server?.onListening?.(error);
                    });
                    await FastifyServer.listen({ port : config.port, host : config.host }, async (error, address) => {
                        if (!error){
                            await resolve({ socket : SocketIO, server : FastifyServer, config : config})
                        }else{
                            delete error.stack;
                            await rejected(require("error-to-json")(error))
                        }
                    })
                }else{
                    await resolve({ socket : SocketIO, server : FastifyServer as FastifyInstance, config : config })
                }

                break;
            default :
                config = await merge(DefaultConfigSocketIOHTTPServer, config);
                mHTTP = createServerHTTP(config.settings?.engine as HTTPServerOptions);
                SocketIO = await new Server(mHTTP,config.settings?.socket);
                //** Header Set
                SocketIO = SocketIOEngineHeaders(SocketIO);
                SocketIO.use(SocketIOMiddleware);
                if (config.use !== undefined){
                    await SocketIO.use(config.use)
                }
                /** Event on Connection Data **/
                if (config.events?.socket?.onConnection !== undefined){
                    await SocketIO.on("connection", async (io) => {
                        await config.events?.socket?.onConnection?.(io);
                        //** Event On Disconnection Data **/
                        if (config.events?.socket?.onDisconnection !== undefined){
                            await io.on("disconnect", async (reason) => {
                                await config.events?.socket?.onDisconnection?.(reason);
                            });
                        }
                        //** End Event On Disconnection Data **/
                    });
                }

                if (config.io !== undefined){
                    await config.io?.(SocketIO)
                }
                await mHTTP.on("listening", async () => {
                    await config.events?.server?.onListening?.();
                })
                /** Event on Connection Data **/
                await mHTTP.on("error", async (err : Error) => {
                    delete err.stack;
                    await rejected(require("error-to-json")(err))
                });

                //** force Set host to Wildcard if state production **/
                config.host = (config.state == PRODUCTION) ? "0.0.0.0" : config.host;

                if (config.settings?.engine?.autoListen){
                    await mHTTP.listen(config.port, config.host, async () => {
                        await resolve({ socket : SocketIO, server : mHTTP, config : config});
                    })
                }else{
                    await resolve({ socket : SocketIO, server : mHTTP, config : config })
                }
                break;
        }
    })
}
export async function SocketIOServerInstances<Config extends ConfigSocketIOServer>(config : Config) : Promise<CallbackServerSocketIOComponent> {
    return new Promise(async (resolve, rejected) => {
        config = await merge(DefaultConfigSocketIOHTTPServer, config);
        //#######################################################
        await tcpPortUsed.check(config.port as number,config.host)
            .then(async (inUse) => {
                if (!inUse){
                    await ServerSelectedSocketIO<Config>(config)
                        .then(async (result) => {
                            await resolve(result)
                        })
                        .catch(async (error) => {
                            await rejected(error)
                        })
                }else{
                    await rejected({ status : false, code : 502, msg : `Port in Used. Try another port. or kill process ${config.port} on this machine`})
                }
            })
            .catch(async (error) => {
                await rejected({ status : false, code : 500, msg : `error Check TCP Port Used`, error : error})
            })
    })

}