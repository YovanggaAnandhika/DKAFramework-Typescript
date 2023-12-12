import {Options, Server} from "./../src";

(async () => {

    Server({
        engine : Options.ENGINE.FASTIFY,
        host : Options.HOST.WILDCARD,
        port : 2814,
        app : (apps, opts, next) => {

            apps.get("/", (req, res) => {
                res.send("halo")
            });

            next();
        }
    }).then(async (res) => {
        console.log(res)
    }).catch(async (error) => {
        console.log(error)
    });




})();
