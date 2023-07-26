import Apis from "../src";
import * as qrcode from "qrcode-terminal";
import * as moment from "moment-timezone";

(async () => {
    let wa = Apis.Chat.WhatsApps();
    moment.locale("id")
    wa.on("qr", async (qr) => {
        qrcode.generate(qr, {small: true});
    });

    wa.on("ready", async () => {
        console.log("ready terhubung")
    });

    wa.on("message", async (message) => {
        let chat = await wa.getChats();
        let senderChatContainer = chat.find((chat) => chat.id._serialized === message.from);

        if (senderChatContainer !== undefined){
            let allMsg = await senderChatContainer.fetchMessages({ limit : 2 });
            let timeNow = moment(moment.now());
            console.log(allMsg[0].body);
            let previousMsgTime = moment.unix(allMsg[0].timestamp);
            let comparisonTimeFromNow = moment.duration(timeNow.diff(previousMsgTime));
            console.log(comparisonTimeFromNow.asHours());
        }

    })

    await wa.initialize();
})();