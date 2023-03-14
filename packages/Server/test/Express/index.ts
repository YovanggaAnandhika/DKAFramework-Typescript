import {Options, Server} from "../../src";

(async () => {
    await Server({
        engine : Options.Server.Engine.EXPRESSSJS,
        port : 82,
        routes : async (app) => {
            app.get('/', (req, res) => {
                res.send("test")
            })

        }
    }).then(async (res)=> {
        console.log(res)
    })
})();