import {Options, Server} from "./../src";
import * as fs from "fs";
import * as path from "path";

(async () => {

    await Server({
        engine : Options.ENGINE.WEBPACK,
        host : Options.HOST.WILDCARD,
        port : 53310,
        webpack : {
            entry : path.join(__dirname, "./app.tsx")
        },
        webpackDev : {
            open : true
        }
    }).then(async (resultServ) => {
        console.log("server berhasil dijalankan")
        // @ts-ignore
    }).catch(async (error) => {
        console.error(error)
    });
})();
