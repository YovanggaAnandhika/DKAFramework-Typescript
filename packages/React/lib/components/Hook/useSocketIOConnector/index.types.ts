import {Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";

export type SocketIOConnectorCallback = Socket<DefaultEventsMap, DefaultEventsMap>;