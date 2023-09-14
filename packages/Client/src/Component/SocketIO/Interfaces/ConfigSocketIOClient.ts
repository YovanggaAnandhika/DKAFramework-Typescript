import {Packet} from "socket.io-parser";
import {SOCKET_ENGINE, SOCKET_TYPE_HTTP, SOCKET_TYPE_HTTPS} from "../Types/TypesSocketIOClient";
import {GlobalClientConfigInterfaces} from "../../../Interfaces/ConfigClientInterfaces";
import {ManagerOptions, Socket, SocketOptions} from "socket.io-client";
import {DisconnectDescription} from "socket.io-client/build/esm-debug/socket";
import moment from "moment-timezone";

export interface ConfigSocketIOClientInstanceSettingsEngineHTTP {
    protocol : SOCKET_TYPE_HTTP
}

export interface ConfigSocketIOClientInstanceSettingsEngineHTTPS {
    protocol : SOCKET_TYPE_HTTPS
}

export type ConfigSocketIOClientInstanceSettingsPingMode = "INTERVAL";
export type ConfigSocketIOClientInstanceSettingsPingProtocol = "UDP" | "TCP";
export interface ConfigSocketIOClientInstanceSettingsSocket extends Partial<ManagerOptions & SocketOptions>{
    pingMode ?: ConfigSocketIOClientInstanceSettingsPingMode;
    pingDelay ?: number | undefined;
}

export interface ConfigSocketIOClientInstanceSettings {
    socket ?: ConfigSocketIOClientInstanceSettingsSocket
}

export interface ConfigSocketIOClientInstanceEventsManager {
    onOpen ?: () => void | undefined | Promise<void>,
    onPing ?: () =>  void | undefined | Promise<void>,
    onPacket ?: (packet : Packet) => void | undefined | Promise<void>,
    onReconnect ?: (attempt ?: number | undefined) => void | undefined | Promise<void>,
    onReconnectAttempt ?: (attempt ?: number | undefined) => void | undefined | Promise<void>,
    onReconnectError ?: (error ?: Error | undefined) => void | undefined | Promise<void>,
    onReconnectFailed ?: () => void | undefined | Promise<void>

}

export type ConfigSocketIOClientInstanceEventsLatencyType = "GREAT" | "GOOD" | "ACCEPTABLE" | "BAD" | "TIMEOUT";

export interface ConfigSocketIOClientInstanceEventsLatencyTime {
    duration : moment.Duration,
    endTime : {
        Iso : string,
        Humanize : string,
        unix : number
    },
    startTime : {
        Iso : string,
        Humanize : string,
        unix : number
    },
}
export interface ConfigSocketIOClientInstanceEventsLatency {
    delay : number,
    type : ConfigSocketIOClientInstanceEventsLatencyType,
    time : ConfigSocketIOClientInstanceEventsLatencyTime
}
export interface ConfigSocketIOClientInstanceEvents {
    onConnect ?: () => void | undefined | Promise<void>,
    onDisconnect ?: (reason ?: Socket.DisconnectReason | undefined, description ?: DisconnectDescription | undefined) => void | undefined | Promise<void>,
    onConnectError ?: (error ?: Error | undefined) => void | undefined | Promise<void>,
    onLatency ?: (responseLatency : ConfigSocketIOClientInstanceEventsLatency) => Promise<void> | void | undefined;
    Manager ?: ConfigSocketIOClientInstanceEventsManager | undefined
}
export interface ConfigSocketIOClientInstance {
    engine ?: SOCKET_ENGINE | undefined,
    io ?: (io : Socket) => void | Promise<void> | undefined,
    ns ?: string | undefined;
    events ?: ConfigSocketIOClientInstanceEvents | undefined
    settings ?: ConfigSocketIOClientInstanceSettings
}

export type ConfigSocketIOClient = ConfigSocketIOClientInstance & GlobalClientConfigInterfaces;