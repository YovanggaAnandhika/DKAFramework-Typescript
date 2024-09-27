import {Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export type SocketIOInstanceSocket = Socket<DefaultEventsMap, DefaultEventsMap, any>;