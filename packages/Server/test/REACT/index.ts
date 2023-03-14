import {Options, Server} from "../../dist";
import path from "path";

(async () => {

    await Server({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.REACTJS,
        logger: {
            enabled: true
        },
        entry : path.join(__dirname,"./app.tsx"),
        port: 213,
        licence: {
            method: "LICENCE_KEY_OFFLINE",
            key: "./dka.env"
        },
        options: {
            WebpackDev: {
                open: true
            }
        },
        Constanta: {
            PUBLIC_URL: "http://localhost:213"
        }
    })
        .then(async () => {

        })
        .catch(async (error) => {
            console.log(error)
        })



})();