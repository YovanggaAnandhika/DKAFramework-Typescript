import {SocketIOMiddlewareUse} from "../Types/TypesSocketIOServer";


export const SocketIOMiddleware : SocketIOMiddlewareUse = async (io, next) => {



    await next();
}