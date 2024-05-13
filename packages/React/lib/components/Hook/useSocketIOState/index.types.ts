import {Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";

export enum SocketIOStates {
    ON_CONNECT = "CONNECT",
    ON_CONNECT_ERROR = "CONNECT_ERROR",
    ON_DISCONNECT = "DISCONNECT",
    IDLE = "IDLE"
}

export interface SocketIOState {
    state ?: SocketIOStates,
    message ?: string | Error
}

export interface SocketIOStateCallback {
    socket ?: Socket<DefaultEventsMap, DefaultEventsMap> | undefined
    state ?: SocketIOState | undefined
}