import {SocketIOMiddlewareUse} from "../../../../Types/ConfigServerTypes";


export const SocketIOMiddleware : SocketIOMiddlewareUse = async (io, next) => {


    await next();
}