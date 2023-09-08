import {io, Socket} from "socket.io-client";
import {ConfigSocketIOClient, ConfigSocketIOClientInstanceEventsLatency} from "./Interfaces/ConfigSocketIOClient";
import {ConfigDefaultSocketIOClient, ConfigDefaultSocketIOClientHTTPS} from "./Config";
import _ from "lodash";
import moment, {Moment} from "moment-timezone";

let PingObserver : NodeJS.Timer | undefined = undefined;
/**
 *
 * @param config ConfigSocketIOClient
 * @constructor
 */
export function SocketIO(config : ConfigSocketIOClient) : Socket {
    //#####################################################################
    config = (config.settings?.socket?.secure) ?
        _.merge(ConfigDefaultSocketIOClientHTTPS,config) :
    _.merge(ConfigDefaultSocketIOClient, config);
    //#####################################################################
    config.ns = (config.ns?.charAt(0) !== "/") ? `/${config.ns}` : config.ns;

    let protocol = (config.settings?.socket?.secure) ? "https://" : "http://";
    let urlHost = `${protocol}${config.host}:${config.port}${config.ns}`;
    let socket : Socket = io(urlHost, config.settings?.socket);

    if (config.io !== undefined)
        config.io(socket);


    if (config.events?.onLatency !== undefined && config.settings?.socket?.pingMode === "ON_EVENT"){
        socket.onAny(async () => {
            let timeNow = moment(moment.now());
            // volatile, so the packet will be discarded if the socket is not connected
            socket.volatile.emit("ping", timeNow, async (starTime: Moment) => {
                if (socket.connected){
                    let timeNowDiff = moment(moment.now());
                    let latency = timeNowDiff.diff(starTime, 'millisecond');
                    let typeLatency: ConfigSocketIOClientInstanceEventsLatency = (latency < 20) ? "GREAT" :
                        (latency >= 20 && latency <= 40) ? "GOOD" :
                            (latency > 40 && latency <= 100) ? "ACCEPTABLE" :
                                "BAD";
                    await config.events?.onLatency?.(latency, typeLatency);
                }
            });
        });
    }

    if (config.events !== undefined) {
        if (config.events.onConnect !== undefined){
            socket.on("connect", async () => {
                config.events?.onConnect?.();

                if (config.events?.onLatency !== undefined && config.settings?.socket?.pingMode === "INTERVAL"){
                    PingObserver = setInterval(() => {
                        let timeNow = moment(moment.now());
                        // volatile, so the packet will be discarded if the socket is not connected
                        socket.volatile.emit("ping", timeNow, async (starTime : Moment) => {
                            let timeNowDiff = moment(moment.now());
                            let latency = timeNowDiff.diff(starTime, 'millisecond');
                            let typeLatency : ConfigSocketIOClientInstanceEventsLatency =
                                (latency < 20) ? "GREAT" :
                                    (latency >= 20 && latency <= 40) ? "GOOD" :
                                        (latency > 40 && latency <= 100) ? "ACCEPTABLE" :
                                            "BAD";
                            await config.events?.onLatency?.(latency, typeLatency);
                        });
                    }, config.settings?.socket?.pingDelay);
                }
            });
        }

        if (config.events.onDisconnect !== undefined){
            socket.on("disconnect", config.events.onDisconnect);
            if (config.events?.onLatency !== undefined && PingObserver !== undefined && config.settings?.socket?.pingMode === "INTERVAL")
                clearInterval(PingObserver)
        }

        if (config.events.onConnectError !== undefined){
            socket.on("connect_error", config.events.onConnectError);
        }

        if (config.events.Manager !== undefined){

            if (config.events.Manager.onOpen !== undefined)
                socket.io.on("open", config.events.Manager.onOpen);

            if (config.events.Manager.onPing !== undefined)
                socket.io.on("ping", config.events.Manager.onPing);

            if (config.events.Manager.onPacket !== undefined)
                socket.io.on("packet", config.events.Manager.onPacket);

            if (config.events.Manager.onReconnect !== undefined)
                socket.io.on("reconnect", config.events.Manager.onReconnect);

            if (config.events.Manager.onReconnectAttempt !== undefined)
                socket.io.on("reconnect_attempt", config.events.Manager.onReconnectAttempt);

            if (config.events.Manager.onReconnectError !== undefined)
                socket.io.on("reconnect_error", config.events.Manager.onReconnectError);

            if (config.events.Manager.onReconnectFailed !== undefined)
                socket.io.on("reconnect_failed", config.events.Manager.onReconnectFailed);
        }

    }

    return socket;

}