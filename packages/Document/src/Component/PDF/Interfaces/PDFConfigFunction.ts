import PDFDocumentWithTables from "pdfkit-table";


export type PDFClassesType = PDFDocumentWithTables & PDFKit.PDFDocument;
export type PDFConfigDoc = (doc : PDFClassesType) => void | Promise<void> | undefined;

export type OUTPUT_BASE64 = "PDF_OUTPUT_BASE64";
export type OUTPUT_FILE = "PDF_OUTPUT_FILE";
export type OUTPUT_BLOB = "PDF_OUTPUT_BLOB";

export const OUTPUT_BASE64 : OUTPUT_BASE64 = "PDF_OUTPUT_BASE64";
export const OUTPUT_FILE : OUTPUT_FILE = "PDF_OUTPUT_FILE";
export const OUTPUT_BLOB : OUTPUT_BLOB = "PDF_OUTPUT_BLOB";

export type OUTPUT_ALL_TYPE = OUTPUT_BASE64 | OUTPUT_FILE | OUTPUT_BLOB;

export interface PDFConfigBase64Settings extends PDFKit.PDFDocumentOptions {
    autoDelete ?: boolean | undefined
}
export interface PDFConfigBase64 {
    doc ?: PDFConfigDoc,
    outputType ?: OUTPUT_BASE64
    settings ?: PDFConfigBase64Settings
}


export interface PDFConfigFileSettings extends PDFKit.PDFDocumentOptions {
    nameFile ?: string,
    autoDelete ?: boolean | undefined
}
export interface PDFConfigFile {
    doc ?: PDFConfigDoc,
    outputType ?: OUTPUT_FILE,
    settings ?: PDFConfigFileSettings
}

export interface PDFCallbackFile {
    status : boolean,
    code : number,
    msg : string,
    data : {
        filename : string,
        size : number,
        sizeExt : string
    }
}

export interface PDFCallbackBase64 {
    status : boolean,
    code : number,
    msg : string,
    data : {
        filename : string,
        base64 : string,
        size : number,
        sizeExt : string
    }
}
export type PDFCallback<Config> = Config extends { outputType : OUTPUT_BASE64 } ? PDFCallbackBase64 :
    Config extends { outputType : OUTPUT_FILE } ? PDFCallbackFile : false;

export type PDFConfig = PDFConfigBase64 | PDFConfigFile