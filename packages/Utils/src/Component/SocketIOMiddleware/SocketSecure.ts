import { ExtendedError } from "socket.io/dist/namespace";
import {SocketIOInstanceSocket} from "../../Types/SocketSecure";



export const SocketSecure = async (socket : SocketIOInstanceSocket, next: (err?: ExtendedError) => void) => {
    const handlers = new WeakMap();
    const reservedEvents = ['error', 'connect', 'disconnect', 'disconnecting', 'newListener', 'removeListener', 'ping', 'pong'];

    socket.on = (event, handler) => {
        if (reservedEvents.includes(event)) return socket.on(event, handler);
        const newHandler : any = async (... args) => {
            if (args[0] && args[0].encrypted) {

            }
            return handler.call(this, ...args);
        };
        handlers.set(handler, newHandler);
        return socket.on(event, newHandler);
    }
}

export default SocketSecure;