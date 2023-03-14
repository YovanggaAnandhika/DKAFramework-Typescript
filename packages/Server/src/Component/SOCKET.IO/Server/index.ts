import {ConfigSocketIO, ConfigSocketIONamespaceGetClientConnected} from "../../../Interfaces/Config/SocketIO/Server";
import {Server, Socket} from "socket.io";
import {createServer, Server as mServerHTTP, ServerOptions as mHTTPServerOptions} from "http";
import {createServer as createSecureServer, Server as mServerHTTPS} from "https";
import {SocketIOInstances} from "../../../Type/types";
import Middleware from "./Middleware";
// @ts-ignore
import {setupMaster, setupWorker} from "@socket.io/sticky";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Logger} from "winston";
import {FastifyInstance} from "fastify";
import FastifySocketIOEngine from "./Component/FASTIFY";

const encryptSocket = require('socket.io-encrypt')


/**
 * @constructor
 * @param { ConfigSocketIO } config
 * @param { SocketIOInstances } config.app
 * @return Promise<mServerHTTP>
 *
 */

let mClientList: Array<Socket<DefaultEventsMap, DefaultEventsMap, any>> = [];
let mAllClientListTotal: number = 0;
let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
let mScopeSocket: ConfigSocketIONamespaceGetClientConnected = {};

export const SOCKET_IO = async (config: ConfigSocketIO, logger: Logger): Promise<mServerHTTP | mServerHTTPS | FastifyInstance> => {
    let mHttp: mServerHTTP | mServerHTTPS | FastifyInstance;
    logger.info("checking server protocol")
    switch (config.options?.server?.protocol) {
        case "FASTIFY" :
            //@deprecated
            /*mHttp = (config.options?.server?.settings !== undefined) ?
                fastify(config.options?.server?.settings.server) : fastify();
            logger.info(`socket.io server binding to protocol server http or https`)
            if (config?.options?.server?.app !== undefined) {
                if (config.options?.server?.settings?.plugin !== undefined){
                    let numPlugins = 0
                    do {
                        await mHttp.register(config.options?.server?.settings?.plugin[numPlugins])
                        numPlugins += 1;
                    }while (numPlugins < config.options?.server?.settings?.plugin.length)
                }
                await mHttp.register(config?.options?.server?.app)
            }*/
            let mFastify = await FastifySocketIOEngine(config.options?.server, logger)
            io = new Server(mFastify.server, config.options?.socket);
            break;
        case "HTTPS" :
            logger.info(`server socket io with https protocol is selected`)
            mHttp = (config.options?.server?.settings !== undefined) ?
                createSecureServer(config.options?.server?.settings) : createSecureServer();
            logger.info(`socket.io server binding to protocol server http or https`)
            io = new Server(mHttp, config.options?.socket);
            break;
        default :
            logger.info(`server socket io with http protocol is selected`)
            mHttp = (config.options?.server?.settings !== undefined) ?
                createServer(config.options?.server?.settings as mHTTPServerOptions) : createServer();
            logger.info(`socket.io server binding to protocol server http or https`)
            io = new Server(mHttp, config.options?.socket);

    }

    if (config?.options?.encryption?.enabled) {
        await io.use(encryptSocket(config?.options?.encryption?.settings?.key))
    }
    return new Promise(async (resolve, rejected) => {
        try {
            logger.info(`server socket io checking costum middleware`)
            if (config.use !== undefined) {
                logger.info(`server socket io costumMiddleware is defined`);
                await io.use(await Middleware(config, logger));
                await io.use(config.use);
            } else {
                logger.info(`server socket io costumMiddleware default config`)
                await io.use(await Middleware(config, logger));
            }
            logger.info(`server socket io create event connection`);

            await io.on("connection", async (socket) => {
                logger.info(`server socket io become event "connected" with id ${socket.id}`);
                (config.onConnection !== undefined) ? config.onConnection(socket) : null;
                (config.onClient !== undefined) ? config.onClient({
                    ClientList: mClientList,
                    CurrentClient: socket,
                    TotalClientConnected: mClientList.length
                }) : null;
                mClientList.push(socket);

                await socket.on("error", async (error) => {
                    (config.onError !== undefined) ? config.onError(error) : null;
                });

                await socket.on("disconnect", async (reason) => {
                    logger.info(`server socket io become event "disconnected" ${socket.id}`);
                    (config.onDisconnect !== undefined) ? config.onDisconnect(reason) : null;
                    mClientList = mClientList.filter(item => item !== socket);
                    (config.onClient !== undefined) ? config.onClient({
                        ClientList: mClientList,
                        CurrentClient: socket,
                        TotalClientConnected: mClientList.length
                    }) : null;
                });
            });

            await io.on("new_namespace", async (namespace) => {
                if (config?.onNamespace !== undefined) {
                    let mNameSpace = (namespace.name.charAt(0) === "/") ? namespace.name.substring(1, namespace.name.length) : namespace.name;
                    await namespace.on("connection", async (socket) => {
                        await (config.onNamespace?.[mNameSpace].onConnection !== undefined) ? config.onNamespace?.[mNameSpace].onConnection?.(socket) : null;
                        await namespace.on("disconnect", async (reason) => {
                            await (config.onNamespace?.[mNameSpace].onDisconnect !== undefined) ? config.onNamespace?.[mNameSpace].onDisconnect?.(reason) : null;
                        });
                    });
                }

            })

            //End @@ Detect IO Callback
            logger.info(`proccess binding SIGHUP registering ...`)
            process.on("SIGHUP", function () {
                logger.info(`proccess event sighup is detected. kill proccess.`)
                io.close();
                mHttp.close();
                process.kill(process.pid);
            })

            //@@ Detect IO Callback
            logger.info(`server socket io checking pointing defined or not`)
            if (config.io !== undefined) {
                logger.info(`server socket io pointing io is exist. binding ...`)
                await config.io(io);
            }
            await io._nsps.forEach(function (io, namespaceName, array) {
                io.on("connection", async (socket) => {
                    mAllClientListTotal += 1;
                    if (config.onAllClient !== undefined) {
                        let fetchSocket = await io.fetchSockets();
                        mScopeSocket[`${namespaceName}`] = {
                            CurrentClient: io,
                            TotalClientConnected: fetchSocket.length
                        }
                        mScopeSocket["AllClientConnected"] = mAllClientListTotal;
                        await config.onAllClient(mScopeSocket);
                    }
                    socket.on("disconnect", async () => {
                        mAllClientListTotal -= 1;
                        if (config.onAllClient !== undefined) {
                            let fetchSocket = await io.fetchSockets();
                            mScopeSocket[`${namespaceName}`] = {
                                CurrentClient: io,
                                TotalClientConnected: fetchSocket.length
                            }
                            mScopeSocket["AllClientConnected"] = mAllClientListTotal;
                            await config.onAllClient(mScopeSocket);
                        }
                    })
                })
            });

            await resolve(mHttp);

        } catch (e) {
            await rejected(e);
        }
    })
};

export default SOCKET_IO;