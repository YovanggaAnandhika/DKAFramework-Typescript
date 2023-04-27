import { io, Socket } from "socket.io-client";
import {ConfigSocketIOClient} from "./Interfaces/ConfigSocketIOClient";


export function SocketIOInstance(config : ConfigSocketIOClient) : Socket {
    let socket : Socket;

    socket = io(`${config.host}`, config.settings?.socket);

    socket.on("connect", async () => {

    });

    socket.on("connect_error", async (error) => {

    });

    socket.on("disconnect", async (reason, description) => {

    });

    socket.io.on("ping", async () => {

    });

    socket.io.on("error", async (error) => {

    });
    return socket;

}

export default SocketIOInstance;