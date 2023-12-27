import {Options, Server} from "./../src";
import {SocketIOFunctionNamespace, SocketIONamespace} from "../src/Component/SocketIO/Types/TypesSocketIOServer";

(async () => {

    Server({
        engine : Options.ENGINE.FASTIFY,
        plugin : {
            mongoDB : [
                {

                }
            ]
        },
        app : (app, opts, next) => {
            app.get("/", (request, response) => {
                app.mongo.db.collection("")
            })
            next();
        }
    }).then(async (res) => {
        console.log(res)
    }).catch(async (error) => {
        console.log(error)
    });




})();
