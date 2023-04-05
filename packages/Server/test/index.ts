import { Server, Options} from "../src";

(async () => {
    await Server({
        engine : Options.ENGINE.SOCKETIO,
        port : 3822,
        settings : {
            engine : {
                protocol : "HTTP",
                autoListen : true,
            },
            socket : {

            }
        }
    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.error(error)
    })
})();