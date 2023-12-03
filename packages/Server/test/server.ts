import {Options, Server} from "./../src";
import * as fs from "fs";
import * as path from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.FASTIFY,
        host : Options.HOST.WILDCARD,
        port : 53319,
        app : (app, opts, next) => {

            app.io.of("/class")
                .on("connection", (io) => {
                    console.log(`connected class ${io.id}`);
                    io.on("disconnect", (reason) => {
                        console.error(`disconnected class ${io.id}`)
                    });
                })
            app.io.on("connection", (io) => {
                console.log(`connected ${io.id}`);
                io.on("disconnect", (reason) => {
                    console.error(`disconnected ${io.id}`)
                });


            })
            next();
        },
        plugin : {
          cors : {
              enabled : true
          }
        },
        settings : {
            engine : {
                type : Options.SETTINGS.ENGINE.PROTOCOL.HTTP
            }
        }
    }).then(async (resultServ) => {
        console.log("server berhasil dijalankan")
        // @ts-ignore
    }).catch(async (error) => {
        console.error(error)
    });
})();
