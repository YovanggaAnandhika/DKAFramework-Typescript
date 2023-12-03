import {Options, Server} from "./../src";
import * as fs from "fs";
import * as path from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.FASTIFY,
        host : Options.HOST.WILDCARD,
        port : 53310,
        decorator : {
            scopes : "halo"
        },
        app : (app, opts, next) => {
            next();
        }
    }).then(async (resultServ) => {
        console.log("server berhasil dijalankan")
        // @ts-ignore
    }).catch(async (error) => {
        console.error(error)
    });
})();
