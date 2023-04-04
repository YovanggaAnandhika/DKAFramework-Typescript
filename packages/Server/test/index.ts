import { Server, Options} from "../src";

(async () => {
    await Server({
        engine : Options.ENGINE.SOCKETIO,
        port : 3822,
        settings : {
            protocol : "FASTIFY"
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.error(error)
    })
})();