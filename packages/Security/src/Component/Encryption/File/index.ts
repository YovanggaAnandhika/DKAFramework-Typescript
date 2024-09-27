import fs from "fs";
import path from "path";
import OpenSSL from "../../SSL";
import JWT from "../JWT";
import {SecurityConfigJWTEngineOptions} from "../JWT/Interfaces/SecurityConfig";
import {SecurityConfigDecryptionFile, SecurityConfigEncryptionFile} from "./Interfaces/SecurityConfigEncryptionFile";
import {merge} from "lodash";
import {DefaultConfigDecryptionFile, DefaultConfigEncryptionFile} from "./Config/DefaultConfigEncryptionFile";

function toArrayBuffer(buffer : Buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
}

class File {

    private OpenSSL ?: OpenSSL
    private JWT ?: JWT
    constructor() {
        this.OpenSSL = new OpenSSL();
        this.JWT = new JWT();
    }

    async encrypt(file : fs.PathLike, config : SecurityConfigEncryptionFile)  {
        let chunk : any[] = [];
        config = merge(DefaultConfigEncryptionFile, config)
        return new Promise(async (resolve, rejected) =>{
            if(fs.existsSync(file)){
                let stream = fs.createReadStream(file);
                let extFile = path.extname(file.toString());
                stream.on("data", (data) => {
                    //console.log(num,data);
                    chunk.push(data)
                });

                stream.on("end", () => {
                    let buffFile = Buffer.concat(chunk);
                    this.JWT?.encrypt(buffFile,config)
                        .then(async (result) => {
                            if (config.saveToFile){
                                let fileSep = file.toString().split(".")[0];

                            }else{
                                await resolve({ status : true, code : 200, msg : `generated Encryption File Successfully`, data : result})
                            }
                        })
                        .catch(async (error) => {
                            await rejected(error);
                        })

                    //fs.writeFileSync(`${fileSep}.dka`, buffFile)
                })

            }else{
                await rejected({ status : false, code : 404, msg : `file not found`});
            }
        })
    }

    async decrypt (file : fs.PathLike, config : SecurityConfigDecryptionFile ){
        let chunk : any[] = [];

        return new Promise(async (resolve, rejected) =>{
            if(fs.existsSync(file)){
                let stream = fs.createReadStream(file);
                let extFile = path.extname(file.toString());
                stream.on("data", (data) => {
                    //console.log(num,data);
                    chunk.push(data);
                });

                stream.on("end", () => {
                    let buffFile = Buffer.concat(chunk);


                    //fs.writeFileSync(`${fileSep}.dka`, buffFile)
                })

            }else{
                await rejected({ status : false, code : 404, msg : `file not found`});
            }
        });
    }

}

export default File;