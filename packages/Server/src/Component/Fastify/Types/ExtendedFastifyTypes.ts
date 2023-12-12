import { Server } from "socket.io";

declare module "fastify" {

    interface FastifyInstance {
        io : Server
    }

    interface DKAFastifyRequestDecoratorData {
        session : any,
        extras : any,
        [ name : string ] : any
    }

    interface FastifyRequest {
        data : DKAFastifyRequestDecoratorData
    }
}