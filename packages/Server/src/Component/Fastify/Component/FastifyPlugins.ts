import {FastifyInstance} from "fastify";
import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import {merge} from "lodash";
import {readFileSync} from "fs";
import FastifyFormBody from "@fastify/formbody"
import FastifyCors from "@fastify/cors"
import FastifySocket from "fastify-socket.io"
import {mFastify} from "../index";



export function FastifyPlugins(fastify : typeof mFastify, config : ConfigFastifyServer) {
    (config.plugin.formBody.enabled) ? fastify.register(FastifyFormBody,config.plugin.formBody.options) : null;
    (config.plugin.cors.enabled) ? fastify.register(FastifyCors, config.plugin.cors.options) : null;
    (config.plugin.socketIO.enabled) ? fastify.register(FastifySocket, config.plugin.socketIO.options) : null;
    //fastify.register(FastifySocket, config.plugin.socketIO.options)
}