import IoT from "../src";
import nodeMCU from "../src/Component/Arduino/NodeMCU";
import {result} from "lodash";


(async () => {

    let Node = await IoT.Arduino.NodeMCU({
        mode : "WIFI_MODE",
        host : "192.168.137.101",
        port : 58888,
        debug : false,
        repl : false,
        onReady : async () => {

        }
    });

    await Node.Relay({ state : true })
        .then(async (res) => {
            console.log(res)
        })
        .catch(async (error) => {
            console.error(error)
        });








})();