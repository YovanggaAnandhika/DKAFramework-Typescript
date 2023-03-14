import {EntryObject as WebpackEntryObject} from "webpack";
import * as fs from "fs";
import {ConfigReactJS} from "../../../Interfaces/Config/ReactJS";
import path from "path";

type entry = undefined | string | (() => string | WebpackEntryObject | string[] | Promise<string | WebpackEntryObject | string[]>) | WebpackEntryObject | string[];

/** **/
export async function Entry(config : ConfigReactJS) : Promise<entry> {
    return new Promise(async (resolve, rejected) => {
        if (fs.existsSync(`${config.entry}`)){
            await resolve(config.entry)
        }else {
            let tsxFile = path.join(__dirname, "./../Template/app.tsx");
            let jsFile = path.join(__dirname, "./../Template/app.js");
            if (fs.existsSync(tsxFile)) {
                await resolve(tsxFile);
            } else {
                if (fs.existsSync(jsFile)) {
                    await resolve(jsFile);
                } else {
                    await rejected({status: false, code: 500, msg: `error Entry Parameter Exception`});
                }
            }

        }
    })
}