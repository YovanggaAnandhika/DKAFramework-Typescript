import {mFastify} from "../index";
import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import {Server} from "socket.io";


export function FastifyDecorator(fastify : typeof mFastify, config : ConfigFastifyServer) {
    if (config.decorator !== undefined){
        Object.keys(config.decorator).forEach((name) => {
            fastify.decorate(name, config.decorator[name]);
        });
    }

    if (config.decoratorRequest !== undefined) {
        Object.keys(config.decoratorRequest).forEach((name) => {
            fastify.decorateRequest(name, config.decoratorRequest[name]);
        });
    }

    if (config.decoratorReply !== undefined) {
        Object.keys(config.decoratorReply).forEach((name) => {
            fastify.decorateReply(name, config.decoratorReply[name]);
        });
    }
}