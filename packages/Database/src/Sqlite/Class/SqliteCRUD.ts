import {Database} from "@journeyapps/sqlcipher";
import {SqliteCreateTablesOptions, SqliteInsertOptions, SqliteSelectOptions} from "../Interfaces/SqliteConfigTypes";
import {error} from "winston";


class SqliteCRUD {
    get isClose(): boolean {
        return this._isClose;
    }

    set isClose(value: boolean) {
        this._isClose = value;
    }

    private db : Database;
    constructor(db : Database) {
        this.db = db;
    }

    private _isClose : boolean = false;

    async CreateTable(tableName : string, options : SqliteCreateTablesOptions) : Promise<any> {
        return new Promise(async (resolve, rejected) => {
            if (this.isClose){
                //##########################
                let pushParams : any[] = [];
                let ifNotExits = (options.ifNotExist) ? "IF NOT EXISTS" : "";
                //##########################
                options.column.forEach((dataType) => {
                    pushParams.push(`${dataType.columnName} ${dataType.typeData}`);
                });
                //##########################
                this.db.run(`CREATE TABLE ${ifNotExits} ${tableName} (${pushParams.toString()})`,[],(error) => {
                    if (!error) {
                        resolve({ status : false, code : 200, msg : `successfully create tables`});
                    }else{
                        rejected({ status : false, code : 500, msg : `error read database`, error : error});
                    }
                });
            }else{
                rejected({ status : false, code : 403, msg : `failed execution database is close`});
            }
        });
    };


    async Insert(tableName : string, options : SqliteInsertOptions) : Promise<any> {
        return new Promise(async (resolve, rejected) => {
            if (!this.isClose){
                //##########################
                let pushColumn : Array<string> = [];
                let pushParams : Array<any> = [];
                //##########################
                Object.keys(options.data).forEach((key) => {
                    pushColumn.push(`\`${key}\``);
                    pushParams.push((typeof options.data[key] == "number") ? options.data[key] : `\"${options.data[key]}\"`);
                });
                let SQLRaw = `INSERT INTO ${tableName} (${pushColumn.toString()}) VALUES (${pushParams.toString()})`;
                this.db.run(SQLRaw,[],function (error) {
                    if (!error){
                        resolve({
                            status : true,
                            code : 200,
                            msg : `successfully insert data`,
                            data : options.data,
                            metada : {
                                sqlRaw : SQLRaw,
                                lastInsertId : this.lastID
                            }
                        });
                    }else{
                        rejected({ status : false, code : 500, msg : `error read database`, error : error});
                    }
                });
            }else{
                rejected({ status : false, code : 403, msg : `failed execution database is close`});
            }
        });
    }

    async Select(tableName : string, options : SqliteSelectOptions) : Promise<any>{
        return new Promise(async (resolve, rejected) => {
            if (!this.isClose){
                let checkLimit = (options.limit !== undefined) ? ` LIMIT ${options.limit} ` : ``;
                let SQLRaw = `SELECT ${(options?.column !== undefined) ? options.column.toString() : "*"} FROM ${tableName}${checkLimit}`;
                this.db.all(SQLRaw,[],(error, rows) => {
                    if (!error){
                        if (rows.length > 0){
                            resolve({
                                status : true,
                                code : 200,
                                msg : `successfully get data`,
                                data : rows,
                                metada : {
                                    sqlRaw : SQLRaw
                                }
                            });
                        }else{
                            rejected({
                                status : false,
                                code : 404,
                                msg : `success. but data not found`,
                                metada : {
                                    sqlRaw : SQLRaw
                                }
                            });
                        }
                    }else{
                        rejected({ status : false, code : 500, msg : `error read database`, error : error});
                    }
                });
            }else{
                rejected({ status : false, code : 403, msg : `failed execution database is close`});
            }
        })
    }

    Baca = this.Select;

    close (error ?: (error : Error | null) => void | undefined) {
        this.isClose = true;
        this.db.close(error);
    }
}

export default SqliteCRUD;