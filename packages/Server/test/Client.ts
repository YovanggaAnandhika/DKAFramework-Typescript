import io from "socket.io-client";
import {readFileSync} from "fs";
import {join} from "path";
import errorToJSON from "error-to-json";
import moment = require("moment-timezone");

(async () => {
    moment.locale("id")
    let mPingTime = moment();
    let mSocket = io("https://127.0.0.1:8888",{
        reconnection : true,
        transports : [ "websocket" ],
        key: readFileSync(join(__dirname, "./Cert/Client/localhost.key")).toString(),
        cert: readFileSync(join(__dirname, "./Cert/Client/localhost.crt")).toString(),
        passphrase : "Cyberhack2010",
        ca : readFileSync(join(__dirname, "./Cert/CA/localhost.crt")).toString(),
    });

    mSocket.on("connect", async () => {
        console.log('terhubung', mSocket.id)
    });

    mSocket.io.on("ping", async () => {
        let mTimeNow = await moment();
        let mDifferentsTime = moment.duration(mTimeNow.diff(mPingTime)).milliseconds();
        mPingTime = mTimeNow;
        console.log(`${mDifferentsTime} ms`)
    });


    mSocket.connect()

})();