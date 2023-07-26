import { Server, Options } from "./../src";

import * as process from "process";
import {readFileSync} from "fs";
import * as path from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.SOCKETIO,
        host : "0.0.0.0",
        port : 3821,
        io : async (io) => {
            io.on("connection", async (io) => {
                console.log(io.request.headers);
                io.emit("test",{ halo : "test"})
            })
        }
    }).then(async (resultServ) => {
        // @ts-ignore
    }).catch(async (error) => {
        console.error(error)
    })


    /*Server({
        engine : Options.ENGINE.FASTIFY,
        port : 2811
    }).then(async (server) => {
        console.log(server)
        //await server.engine.server.listen({ port : server.getConfig.port, host : server.getConfig.host})
    }).catch(async (error) => {
        console.error(error)
    });*/



    //mServer.engine.server.listen
})();
