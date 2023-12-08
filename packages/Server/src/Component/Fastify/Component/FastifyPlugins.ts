import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import FastifyFormBody from "@fastify/formbody"
import FastifyCors from "@fastify/cors"
import FastifySocket from "fastify-socket.io";
import FastifyCookie from "@fastify/cookie";
import FastifyView from "@fastify/view";
import {mFastify} from "../index";
import _ from "lodash";
import ejs from "ejs";

export function FastifyPlugins(fastify : typeof mFastify, config : ConfigFastifyServer) {
    (config.plugin?.formBody?.enabled) ? fastify.register(FastifyFormBody,config.plugin?.formBody?.options) : null;
    (config.plugin?.cors?.enabled) ? fastify.register(FastifyCors, config.plugin?.cors?.options) : null;
    (config.plugin?.socketIO?.enabled) ? fastify.register(FastifySocket, config.plugin?.socketIO?.options) : null;
    (config.plugin?.cookie?.enabled) ? fastify.register(FastifyCookie, config.plugin?.cookie?.options) : null;
   /* config.plugin?.view?.map(async (viewPlugins) => {
        await _.merge(viewPlugins, { engine : { ejs : ejs }} as typeof viewPlugins)
        await fastify.register(FastifyView, viewPlugins);
    });*/
    //(config.plugin?.view?.enabled) ? fastify.register(FastifyView, config.plugin?.view?.options) : null;

}