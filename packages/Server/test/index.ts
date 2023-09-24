import {Options, Server} from "./../src";
import * as fs from "fs";
import * as path from "path";

(async () => {

    /*await Server({
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
    });*/

    function commafy(num) {
        let str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }
    console.log(commafy(6000200))
})();
