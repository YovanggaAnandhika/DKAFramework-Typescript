import { Socket } from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";


export type SOCKET_ENGINE = "SOCKET.IO";
//#######################################################
export const SOCKET_ENGINE : SOCKET_ENGINE = "SOCKET.IO";
export type SOCKET_TYPE_HTTP = "HTTP";
export type SOCKET_TYPE_HTTPS = "HTTPS";
export const SOCKET_TYPE_HTTP : SOCKET_TYPE_HTTP = "HTTP";
export const SOCKET_TYPE_HTTPS : SOCKET_TYPE_HTTPS = "HTTPS";

export type ClientSocketIO = Socket<DefaultEventsMap,DefaultEventsMap>;