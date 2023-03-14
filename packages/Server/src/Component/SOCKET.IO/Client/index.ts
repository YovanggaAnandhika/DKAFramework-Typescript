import {ConfigSocketIOClient} from "../../../Interfaces/Config/SocketIO/Client";
import {Socket, Manager, io as Sock, ManagerOptions} from "socket.io-client"
import moment from "moment-timezone";
import {MetaDataSocketIOClient, SocketListArray} from "../../../Type/types";
import {attempt, merge, reject, size} from "lodash";
import {Logger} from "winston";
import ping from "ping";

const encryptSocket = require('socket.io-encrypt')

export const SOCKET_IO_CLIENT = async (config: ConfigSocketIOClient, logger: Logger): Promise<Socket> => {

    (config.state === "development") ? await logger.info(`setting moment js locales default`) : null;
    moment.locale("id")

    let mSocket : Socket;
    let mSocketArrayNum : number = 0;
    let metaDataSocketIOClient: MetaDataSocketIOClient = {
        id: undefined
    };

    let mPingTime = moment();

    return new Promise(async (resolve) => {
        (config.logger?.enabled) ? await logger.info(`checked variable costum namespace`) : null;
        let mNameSpace = (config.costumNameSpace !== undefined) ?
            (config.costumNameSpace.charAt(0) !== "/") ? `/${config.costumNameSpace}`
                : `${config.costumNameSpace}`
            : ``;

        (config.state === "development") ? await logger.info(`set Socket Client Host Instance `) : null;
        let mProtocol = (config.settings?.secure) ? "https://" : "http://";
        let mUrl = `${mProtocol}${config.host}:${config.port}${mNameSpace}`;
        mSocket = await Sock(mUrl, config.settings);

        if (config?.settings?.encryption?.enabled) {
            await encryptSocket(config?.settings.encryption.settings?.key)(mSocket);
        }

        await mSocket.on("connect", async () => {
            metaDataSocketIOClient = await merge(metaDataSocketIOClient, {
                id: mSocket.id,
                timestamp: {
                    lastTime: {
                        onConnect: {
                            humanize: moment().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix: moment().unix()
                        }
                    }
                }
            });
            await config.on?.Connect?.(metaDataSocketIOClient);
        });

        await mSocket.on("connect_error", async (error : any) => {
            (config.logger?.enabled) ? await logger.info(`callback on Connect Error ${JSON.stringify(error)}`) : null;
            await config?.on?.ConnectError?.(error);
        });

        await mSocket.io.on("reconnect", async (attempt) => {
            (config.logger?.enabled) ? await logger.info(`callback on Reconnect`) : null;
            await config?.on?.Manager?.Reconnect?.(attempt);
        });


        await mSocket.io.on("reconnect_attempt", async (attempt) => {
            (config.logger?.enabled) ? await logger.info(`callback on Reconnect Attempt ${attempt}`) : null;
            await config?.on?.Manager?.ReconnectAttempt?.(attempt);
        });

        await mSocket.io.on("reconnect_error", async (error : any) => {
            await config?.on?.Manager?.ReconnectError?.(error);
        });

        await mSocket.io.on("reconnect_failed", async () => {
            await config?.on?.Manager?.ReconnectFailed?.();
        });


        await mSocket.io.on("ping", async () => {
            let mTimeNow = await moment();
            let mDifferentsTime = moment.duration(mTimeNow.diff(mPingTime)).milliseconds();
            mPingTime = mTimeNow;
            await config?.on?.Manager?.Ping?.(mDifferentsTime);
        });

        await mSocket.io.on("error", async (error) => {
            (config.logger?.enabled) ? await logger.info(`callback on Error ${JSON.stringify(error)}`) : null;
            await config?.on?.Manager?.Error?.(error);
        });

        await mSocket.io.on("packet", async (packet) => {
            await config?.on?.Manager?.Packet?.(packet);
        })


        await mSocket.on("disconnect", async (reason, description) => {
            (config.logger?.enabled) ? await logger.info(`callback on disconnected ${JSON.stringify({
                reason: reason,
                description: description
            })}`) : null;

            metaDataSocketIOClient = await merge(metaDataSocketIOClient, {
                id: mSocket.id,
                reason: reason,
                description: description,
                timestamp: {
                    lastTime: {
                        onDisconnect: {
                            humanize: moment().format("DD-MM-YYYY HH:mm:ss").toString(),
                            unix: moment().unix()
                        }
                    }
                }
            });
            await config.on?.Disconnect?.(metaDataSocketIOClient);
        });

        await process.on("SIGHUP", function () {
            mSocket.disconnect();
            mSocket.close();
            process.kill(process.pid);
        });
        await process.on("SIGINT", function () {
            mSocket.disconnect();
            mSocket.close();
            process.kill(process.pid);
        })

        if (config.io !== undefined) {
            await config.io(mSocket);
            await resolve(mSocket);
        } else {
            await resolve(mSocket);
        }
    })
}

export default SOCKET_IO_CLIENT;