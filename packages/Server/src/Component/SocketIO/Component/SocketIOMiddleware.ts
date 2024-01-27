import {SocketIOMiddlewareUse} from "../Types/TypesSocketIOServer";


export const SocketIOMiddleware : SocketIOMiddlewareUse = (io, next) => {


    next();
}