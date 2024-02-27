import * as PDFDocument from "pdfkit-table";
import {
    OUTPUT_BASE64,
    OUTPUT_FILE,
    PDFCallback,
    PDFClassesType,
    PDFConfig
} from "./Interfaces/PDFConfigFunction";
import * as fs from "fs";
import path from "path";
import moment from "moment-timezone";
import {merge} from "lodash";
import {PDFDefaultConfig} from "./Config/PDFDefaultConfig";


function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 B'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
export async function PDF<Config extends PDFConfig>(pdfConfig : Config) : Promise<PDFCallback<Config>> {
    pdfConfig = await merge(PDFDefaultConfig, pdfConfig);
    //#########################################
    const doc : PDFClassesType = await new PDFDocument.default(pdfConfig.settings);
    //#########################################
    moment.locale("id");
    //#########################################
    let pathFolder = path.join(require.main.filename, `./../Temp/`);
    //#########################################
    if (!fs.existsSync(pathFolder))
        //#########################################
        fs.mkdirSync(pathFolder,{ mode : "0777", recursive : true});
    //############################################################
    let filename = moment.now().toString();
    let filePath = path.join(pathFolder,`${filename}.pdf`);
    //############################################################
    return new Promise(async (resolve, rejected) => {
        switch (pdfConfig.outputType) {
            case OUTPUT_BASE64 :
                //#########################################
                let streamFile64 = await doc.pipe(fs.createWriteStream(filePath));
                let chunkData = [];
                //#############################################
                if (pdfConfig.doc !== undefined){
                    //#########################################
                    await pdfConfig.doc(doc);
                    //#########################################
                }
                //#########################################
                streamFile64.on("finish", async () => {
                    //#########################################
                    if (fs.existsSync(filePath)){
                        //#########################################
                        let fileStats = fs.statSync(filePath);
                        let readFileStream = fs.createReadStream(filePath);
                        //#########################################
                        readFileStream.on("data", (chunk) => {
                            //#########################################
                            chunkData.push(chunk);
                            //#########################################
                        });
                        //#########################################
                        readFileStream.on("end",async () => {
                            //#########################################
                            const result = Buffer.concat(chunkData);
                            //#########################################
                            if (pdfConfig.settings.autoDelete !== undefined && pdfConfig.settings.autoDelete === true){
                                await fs.unlink(filePath,async (error) => {
                                    //#########################################
                                    if (!error){
                                        //#########################################
                                        await resolve({ status : true, code : 200, msg : `successfully to generate pdf document`, data : { filename : filename, base64 : result.toString("base64"),size : fileStats.size, sizeExt : formatBytes(fileStats.size) } } as PDFCallback<Config>);
                                        //#########################################
                                    }else{
                                        //#########################################
                                        await rejected({ status : false, code : 502, msg : `error delete temporary pdf files ...`});
                                        //#########################################
                                    }
                                    //#########################################
                                });
                            }else{
                                //#########################################
                                await resolve({ status : true, code : 200, msg : `successfully to generate pdf document`, data : { filename : filename, base64 : result.toString("base64"),size : fileStats.size, sizeExt : formatBytes(fileStats.size) } } as PDFCallback<Config>);
                                //#########################################
                            }
                        })
                    }
                });
                //###################################################################
                await doc.end();
                //#########################################
                break;
            case OUTPUT_FILE :
                //#########################################
                filename = pdfConfig.settings.nameFile;
                filePath = path.join(require.main.filename, `./../`,`${filename}.pdf`);
                let streamFile = await doc.pipe(fs.createWriteStream(filePath));
                //#########################################
                if (pdfConfig.doc !== undefined){
                    //#########################################
                    await pdfConfig.doc(doc);
                    //#########################################
                }
                //##################################################################
                await streamFile.on("finish", async () => {
                    //#########################################
                    if (fs.existsSync(filePath)){
                        //#########################################
                        let fileStats = fs.statSync(filePath);
                        //#########################################
                        if (pdfConfig.settings.autoDelete !== undefined && pdfConfig.settings.autoDelete === true){
                            //#########################################
                            await fs.unlink(filePath,async (error) => {
                                //#########################################
                                if (!error){
                                    //#########################################
                                    await resolve({ status : true, code : 200, msg : `successfully to generate pdf document`, data : { filename : filename,size : fileStats.size, sizeExt : formatBytes(fileStats.size) } } as PDFCallback<Config>);
                                    //#########################################
                                }else{
                                    //#########################################
                                    await rejected({ status : false, code : 502, msg : `error delete temporary pdf files ...`});
                                    //#########################################
                                }
                                //#########################################
                            });
                            //#########################################
                        }else{
                            //#########################################
                            await resolve({ status : true, code : 200, msg : `successfully to generate pdf document`, data : { filename : filename, size : fileStats.size, sizeExt : formatBytes(fileStats.size) } } as PDFCallback<Config>);
                            //#########################################
                        }
                    }
                });
                //#########################################
                await doc.end();
                //#########################################
                break;
            default :
                break;
        }
    })
}
