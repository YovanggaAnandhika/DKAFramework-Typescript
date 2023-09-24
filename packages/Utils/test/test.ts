import utils from "../src";
import {MessageMedia} from "whatsapp-web.js";


(async () => {
    await utils.Functions.Component.PDF({
        doc : async (doc) => {
            await doc.text("Hallo")
        },
        outputType : "PDF_OUTPUT_BASE64",
        settings : {

        }
    }).then(async (res) => {
        console.log(res)
    }).catch(async (error) => {
        console.error(error)
    });
})();