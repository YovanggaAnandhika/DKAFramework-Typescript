import {PDF} from "../src";


PDF({
    doc: async (doc) => {
        await doc.text("PT. TUZA MANDIRI");
    },
    outputType: "PDF_OUTPUT_BASE64",
}).then((res) => {
    console.log(res)
}).catch((error) => {
    console.error(error)
})