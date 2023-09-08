import Sqlite3, {Database} from "@journeyapps/sqlcipher";
import {SqliteConfiguration} from "./Interfaces/SqliteConfiguration";
import {DEVELOPMENT, STATES} from "./Types/SqliteConfigurationTypes";
import * as path from "path";
import {merge} from "lodash";
import DefaultConfigSqlite from "./Config/DefaultConfigSqlite";
import {SqliteMultipleInstance} from "./Interfaces/SqliteMultipleInstance";


export class Sqlite {
    private SqliteInstance : typeof Sqlite3;
    private currentDB : string | undefined;
    private currRegister : SqliteConfiguration | undefined;
    private ListDBInstance : SqliteMultipleInstance = {};
    constructor(config ?: STATES) {
        this.SqliteInstance = (config === DEVELOPMENT) ? Sqlite3.verbose() : Sqlite3;
    }

    register(config ?: SqliteConfiguration) : Sqlite {
        config = merge(DefaultConfigSqlite, config);
        if (this.ListDBInstance[`${config?.db_name}`] === undefined){
            this.currRegister = config;
            let dbFiles = (config?.settings?.extension !== undefined) ? `${config.db_name}.${config.settings?.extension}` : `${config?.db_name}`;
            let pathDB = path.join(`${config?.settings?.path}`, `${dbFiles}`)
            let DB = new this.SqliteInstance.Database(pathDB);
            this.ListDBInstance[`${config?.db_name}`] = DB;
            this.currentDB = `${config?.db_name}`;
        }
        return this;
    }

    gets = this.ListDBInstance;

    async get(dbName ?: string) : Promise<Database> {
        return new Promise(async (resolve, rejected) => {
            if (dbName !== undefined){
                if (this.ListDBInstance[dbName] !== undefined){
                    let DB = this.ListDBInstance[dbName];
                    await DB.removeAllListeners("close");
                    await DB.on("close", async () => {
                       delete this.ListDBInstance[dbName];
                    })
                    await DB.serialize(async () => {
                        await DB.run(`PRAGMA cipher_compatibility = 4`);
                        if (this.currRegister?.settings?.secretKey !== undefined) {
                            await DB.run(`PRAGMA key = '${this.currRegister?.settings.secretKey}'`);
                        }
                        if (this.currRegister?.settings?.journalMode !== undefined) {
                            await DB.run(`PRAGMA journal_mode = ${this.currRegister?.settings.journalMode}`);
                        }

                        if (this.currRegister?.settings?.synchronous !== undefined){
                            await DB.run(`PRAGMA synchronous = ${this.currRegister?.settings.synchronous}`);
                        }

                        await resolve(DB);
                    });
                }else{
                    await rejected({ status : false, code : 404, msg : `instance db by name not exists`});
                }
            }else{
                if (this.currentDB !== undefined){
                    let DB = this.ListDBInstance[this.currentDB];
                    await DB.removeAllListeners("close");
                    await DB.on("close", async () => {
                        delete this.ListDBInstance[`this.currentDB`];
                    })
                    await DB.serialize(async () => {
                        await DB.run(`PRAGMA cipher_compatibility = 4`);
                        if (this.currRegister?.settings?.secretKey !== undefined) {
                            await DB.run(`PRAGMA key = '${this.currRegister?.settings.secretKey}'`);
                        }
                        if (this.currRegister?.settings?.journalMode !== undefined) {
                            await DB.run(`PRAGMA journal_mode = ${this.currRegister?.settings.journalMode}`);
                        }

                        if (this.currRegister?.settings?.synchronous !== undefined){
                            await DB.run(`PRAGMA synchronous = ${this.currRegister?.settings.synchronous}`);
                        }

                        await resolve(DB);
                    });
                }else{
                    await rejected({ status : false, code : 500, msg : `no DB current registration`});
                }
            }
        })
    }

}


export default Sqlite;