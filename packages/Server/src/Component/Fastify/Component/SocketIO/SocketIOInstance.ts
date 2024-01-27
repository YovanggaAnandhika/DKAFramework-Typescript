import {ConfigFastifyServerMain} from "../../Types/TypesFastifyServer";
import FastifySocket from "fastify-socket.io";
import {mFastify} from "../../index";
import {ConfigFastifyServer} from "../../Interfaces/ConfigFastifyServer";
import moment, {Moment} from "moment-timezone";
import {ConfigSocketIOInstanceEventsLatencyType} from "../../../SocketIO/Types/TypesSocketIOServer";


export const SocketIOInstance = async (fastify : typeof mFastify, config : ConfigFastifyServer) => {
    await fastify.register(FastifySocket, config.plugin?.socketIO?.options);

    fastify.io.on("connection", (io) => {
        io.on("_ping", (startTime : Moment, cb) => {
            if (typeof cb === "function") {
                cb(startTime);
                startTime = moment(startTime);
                if (config.plugin.socketIO.options.onLatency !== undefined){
                    let timeNowDiff = moment(moment.now());
                    let duration = moment.duration(timeNowDiff.diff(startTime));
                    let typeLatency: ConfigSocketIOInstanceEventsLatencyType =
                        (duration.milliseconds() < 20) ? "GREAT" :
                            (duration.milliseconds() >= 20 && duration.milliseconds() <= 40) ? "GOOD" :
                                (duration.milliseconds() > 40 && duration.milliseconds() <= 100) ? "ACCEPTABLE" :
                                    "BAD";
                    config.plugin.socketIO.options.onLatency?.({
                        delay : duration.milliseconds(),
                        type : typeLatency,
                        time : {
                            duration : duration,
                            startTime : {
                                Iso : startTime.toISOString(),
                                Humanize : startTime.format("HH:mm:ss DD-MM-YYYY"),
                                unix : startTime.unix()
                            },
                            endTime : {
                                Iso : timeNowDiff.toISOString(),
                                Humanize : timeNowDiff.format("HH:mm:ss DD-MM-YYYY"),
                                unix : timeNowDiff.unix()
                            }
                        }
                    });
                }
            }
        });
        io.on("disconnect",(reason, desc) => {
            io.removeAllListeners("_ping");
            io.removeAllListeners("disconnect");
        });
    });
    fastify.io.on("new_namespace", (namespace) => {
        namespace.on("connection", (io) => {
            io.on("_ping", (startTime : Moment, cb) => {
                if (typeof cb === "function") {
                    cb(startTime);
                    startTime = moment(startTime);
                    if (config.plugin.socketIO.options.onLatency !== undefined){
                        let timeNowDiff = moment(moment.now());
                        let duration = moment.duration(timeNowDiff.diff(startTime));
                        let typeLatency: ConfigSocketIOInstanceEventsLatencyType =
                            (duration.milliseconds() < 20) ? "GREAT" :
                                (duration.milliseconds() >= 20 && duration.milliseconds() <= 40) ? "GOOD" :
                                    (duration.milliseconds() > 40 && duration.milliseconds() <= 100) ? "ACCEPTABLE" :
                                        "BAD";
                        config.plugin.socketIO.options.onLatency?.({
                            delay : duration.milliseconds(),
                            type : typeLatency,
                            time : {
                                duration : duration,
                                startTime : {
                                    Iso : startTime.toISOString(),
                                    Humanize : startTime.format("HH:mm:ss DD-MM-YYYY"),
                                    unix : startTime.unix()
                                },
                                endTime : {
                                    Iso : timeNowDiff.toISOString(),
                                    Humanize : timeNowDiff.format("HH:mm:ss DD-MM-YYYY"),
                                    unix : timeNowDiff.unix()
                                }
                            }
                        });
                    }

                }
            });
            io.on("disconnect",(reason, desc) => {
                io.removeAllListeners("_ping");
                io.removeAllListeners("disconnect");
            });
        });
    })
}

export default SocketIOInstance;