import { Server, Options} from "../src";

(async () => {
    await Server({
        engine : Options.ENGINE.SOCKETIO,
    }).then(async (result) => {
        result
    })
})();