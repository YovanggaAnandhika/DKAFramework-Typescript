import {Options, Server} from "./../src";

(async () => {

    Server({
        engine : Options.ENGINE.ESCPOS,
        connection : Options.CONNECTION.USB
    }).then(async (res) => {
        console.log(res)
    }).catch(async (error) => {
        console.log(error)
    });




})();
