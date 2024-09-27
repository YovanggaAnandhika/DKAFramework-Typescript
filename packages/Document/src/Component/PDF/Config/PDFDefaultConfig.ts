import {PDFConfig, OUTPUT_BASE64} from "../Interfaces/PDFConfigFunction";


export const PDFDefaultConfig : PDFConfig = {
    doc : async (doc) => {

    },
    outputType : OUTPUT_BASE64,
    settings : {
        pdfVersion : "1.7",
        autoDelete : false,
        autoFirstPage : true,
        layout : "portrait",
        size : "A4",
    }
}