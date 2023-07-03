import { Server as HTTPServer } from "http"
import { Server as SocketIOServer } from "socket.io"
export interface CallbackSocketIOServerInstance {
    HTTP : HTTPServer,
    IO : SocketIOServer
}