import {io, Socket, Manager} from "socket.io-client";
import {
    ConfigSocketIOClient,
    ConfigSocketIOClientInstanceEventsLatencyType
} from "./Interfaces/ConfigSocketIOClient";
import {ConfigDefaultSocketIOClient, ConfigDefaultSocketIOClientHTTPS} from "./Config";
import moment, {Moment} from "moment-timezone";
import {ClientSocketIO} from "./Types/TypesSocketIOClient";
import * as process from "process";
let PingObserver : NodeJS.Timeout | undefined = undefined;
let socket : Socket | undefined = undefined;
let manager : Manager | undefined = undefined;

/**
 *
 * @param config ConfigSocketIOClient
 * @constructor
 */
export function SocketIO(config : ConfigSocketIOClient) : ClientSocketIO {

    moment.locale("id");
    let showError : Boolean = true;
    //#####################################################################
    config = (config.settings?.manager?.secure) ? {
        ... ConfigDefaultSocketIOClientHTTPS,
        ... config
    } : {
        ... ConfigDefaultSocketIOClient,
        ... config
    };
    //#####################################################################
    config.ns = (config.ns?.charAt(0) !== "/") ? `/${config.ns}` : config.ns;

    manager = new Manager({
        host : config.host,
        port : config.port,
        secure : config.settings?.manager?.secure,
        ... config.settings?.manager
    });

    socket  = manager.socket(config.ns, config.settings?.socket);

    if (config.io !== undefined) config.io(socket);

    if (config.events !== undefined) {
        socket.on("connect", () => {
            //########
            PingObserver = setInterval(() => {
                let timeNow = moment(moment.now());
                // volatile, so the packet will be discarded if the socket is not connected
                socket?.volatile.emit("_ping", timeNow, (startTime: Moment) => {
                    let timeNowDiff = moment(moment.now());
                    let duration = moment.duration(timeNowDiff.diff(startTime));
                    let typeLatency: ConfigSocketIOClientInstanceEventsLatencyType = (duration.milliseconds() < 20) ? "GREAT" :
                        (duration.milliseconds() >= 20 && duration.milliseconds() <= 40) ? "GOOD" :
                            (duration.milliseconds() > 40 && duration.milliseconds() <= 100) ? "ACCEPTABLE" :
                                "BAD";
                    //console.log(`DKA Delay ${latency}`)
                    config.events?.onLatency?.({
                        delay : duration.milliseconds(),
                        type : typeLatency,
                        time : {
                            duration : duration,
                            startTime : {
                                Iso : timeNow.toISOString(),
                                Humanize : timeNow.format("HH:mm:ss DD-MM-YYYY"),
                                unix : timeNow.unix()
                            },
                            endTime : {
                                Iso : timeNowDiff.toISOString(),
                                Humanize : timeNowDiff.format("HH:mm:ss DD-MM-YYYY"),
                                unix : timeNowDiff.unix()
                            }
                        }
                    });
                });
                //
            }, config.settings?.socket?.pingDelay)
            //###############################################################################
            if (config.events?.onConnect !== undefined){
                config.events?.onConnect?.();
            }
            showError = true;
            //#############################################################################################
        });

        socket.on("disconnect", (reason, description) => {
            if (config.events?.onDisconnect !== undefined) config.events?.onDisconnect(reason, description);
            if (config.events?.onLatency !== undefined) clearInterval(PingObserver);
        });


        if (config.events.onConnectError !== undefined)
            socket.on("connect_error", config.events.onConnectError);

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

            if (config.events?.Manager?.onError !== undefined){
                if (showError){
                    socket.io.on("error",config.events.Manager.onError);
                    showError = false;
                }
            }

            if (config.events.Manager?.onClose !== undefined)
                socket.io.on("close", config.events.Manager.onClose);
        }

    }

    return socket;

}

export default SocketIO;