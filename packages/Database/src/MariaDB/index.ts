import GlobalConfig, {CreateDatabaseConfig, CreateTableConfig, InsertDataConfig} from "./Config";
import crypto from "crypto";
import {Connection, createConnection, createPool, createPoolCluster, Pool} from "mariadb";
import {MariaDBConstructorConfig} from "./Interfaces/Config";
import {extend, isArray, isObject, isString, merge} from "lodash";
import {
    CallbackBackup,
    CallbackCreateDatabase,
    CallbackCreateTable,
    CallbackDelete,
    CallbackError,
    CallbackInsert,
    CallbackSelect,
    CallbackUpdate,
    metadata
} from "./Interfaces/Callback";
import moment from "moment-timezone";
import {
    ExtendsOptions,
    MariaDBClassInterfaces,
    RulesCreateDatabase,
    RulesCreateTable,
    RulesDelete,
    RulesInsert,
    RulesSelect,
    RulesUpdate
} from "./Interfaces/Class";
import {Instance, Method} from "./Type/types";

import {DumpReturn} from "mysqldump/dist/mysqldump";
import assert from "assert";


/**
 * @class MariaDB
 * @implements MariaDBClassInterfaces
 * @property { CreateTable } MariaDB.CreateTable
 * @property { Select } MariaDB.Select
 * @property { Insert } MariaDB.Insert
 * @property { Update } MariaDB.Update
 * @property { Delete } MariaDB.Delete
 * @description
 * The Class Is a MariaDB Function For Database MariaDB
 * The Base In DKAFramework Application
 */
export class MariaDB implements MariaDBClassInterfaces {

    /**
     *
     * @private
     * @param {any[]} _mKey
     */
    private _mKey : any[] = [];
    private _mVal : any[] = [];
    private _mWhere : any[] = [];
    private _mSetData : any[] = [];
    private _timeStart = new Date().getTime();

    get timeStart(): number {
        return this._timeStart;
    }
    set timeStart(value: number) {
        this._timeStart = value;
    }
    get mKey(): any[] {
        return this._mKey;
    }
    set mKey(value: any[]) {
        this._mKey = value;
    }
    get mVal(): any[] {
        return this._mVal;
    }
    set mVal(value: any[]) {
        this._mVal = value;
    }
    get mWhere(): any[] {
        return this._mWhere;
    }
    set mWhere(value: any[]) {
        this._mWhere = value;
    }

    get mSetData(): any[] {
        return this._mSetData;
    }

    set mSetData(value: any[]) {
        this._mSetData = value;
    }

    get mSearchAdd(): string {
        return this._mSearchAdd;
    }

    set mSearchAdd(value: string) {
        this._mSearchAdd = value;
    }

    private SqlScript : string = "";

    private mMethod : Method = "READ";
    private mInstance : Instance;
    private _mSearchAdd : string = ``;

    private _mConfig : MariaDBConstructorConfig = GlobalConfig;

    private get mConfig(): MariaDBConstructorConfig {
        return this._mConfig;
    }

    private set mConfig(value: MariaDBConstructorConfig) {
        this._mConfig = value;
    }
    


    /**
     * @constructor
     * @param {Config | undefined } config
     * @return this;
     */
    constructor(config? : MariaDBConstructorConfig) {
        this.mConfig = merge(GlobalConfig, config);
        const { createConnection, createPool, createPoolCluster, SqlErrorConstructor} = require("mariadb");
        switch (this.mConfig.engine) {
            case "Connection" :
                this.mInstance = createConnection(this.mConfig);
                break;
            case "PoolConnection" :
                this.mInstance = createPool(this.mConfig);

                break;
            case "PoolClusterConnection" :
                this.mInstance = createPoolCluster(this.mConfig);
                break;
        }
        moment.locale("id")
        return this;
    }

    async CreateDB(DatabaseName : string, Rules : RulesCreateDatabase = CreateDatabaseConfig) : Promise<CallbackCreateDatabase> {

        let mRules: RulesCreateDatabase = await merge(CreateDatabaseConfig, Rules);
        this.timeStart = new Date().getTime();

        let mQuery = ``;

        return new Promise(async (resolve, rejected) => {
            let ifNotExists = (mRules.ifNotExist !== undefined && mRules.ifNotExist) ? `IF NOT EXISTS` : ``;
            let characterSet = (mRules.character !== undefined) ? `CHARACTER SET ${mRules.character}` : ``;
            let collation = (mRules.collation !== undefined) ? `COLLATE ${mRules.collation}` : ``;
            mQuery = `CREATE DATABASE ${ifNotExists} \`${DatabaseName}\` ${characterSet} ${collation};`;
            if (mRules.useDB)
                mQuery += `USE \`${DatabaseName}\`;`;
            //###########################################
            this.mMethod = "CREATE_DB";
            await this.rawQuerySync<CallbackCreateDatabase>(mQuery, [], { ifNotExist : mRules.ifNotExist})
                .then(async (result) => {
                    await resolve(result);
                }).catch(async (error) => {
                    await rejected(<CallbackError>error);
                });
        });
    }

    /**
     * @method
     */
    async CreateTable(TableName: string, Rules : RulesCreateTable = CreateTableConfig): Promise<CallbackCreateTable> {
        let mRules : RulesCreateTable = Rules;
        this.timeStart = new Date().getTime();

        let mQuery = ``;
        let mFinalQuery = ``;
        let length : number;
        let mDefault : string;

        return new Promise(async (resolve, rejected) => {
            mRules.data.forEach((value) => {
                switch (value.type) {
                    case "PRIMARY_KEY" :
                        let autoIncrement = (value.autoIncrement) ? "AUTO_INCREMENT" : "";
                        mQuery += ` \`${value.coloumn}\` BIGINT PRIMARY KEY ${autoIncrement}`;
                        break;
                    case "BIGINT" :
                        let unique = (value.unique) ? "UNIQUE" : "";
                        mDefault = (value.default === null || value.default === undefined) ? `DEFAULT NULL` :
                            (value.default === "NOT NULL") ? `${value.default}` : value.default;
                        mQuery += ` \`${value.coloumn}\` BIGINT ${mDefault} ${unique}`;
                        (value.index) ? mQuery += `INDEX (\`${value.coloumn}\`),` : null;
                        break;
                    case "VARCHAR" :
                        length = (value.length !== undefined) ? value.length : 20;
                        mDefault = (value.default === null || value.default === undefined) ? `DEFAULT NULL` :
                            (value.default === "NOT NULL") ? `${value.default}` : value.default;
                        mQuery += ` \`${value.coloumn}\` VARCHAR(${length}) ${mDefault}`;
                        break;
                    case "TIMESTAMP" :
                        mDefault = (value.default === null || value.default === undefined) ? `DEFAULT NULL` :
                            (value.default === "CURRENT_TIMESTAMP") ? `DEFAULT ${value.default}` : value.default;
                        mQuery += ` \`${value.coloumn}\` TIMESTAMP ${mDefault} `;
                        break;
                    case "LONGTEXT" :
                        let uniques = (value.unique) ? "UNIQUE" : "";
                        mDefault = (value.default === null || value.default === undefined) ? `DEFAULT NULL` : value.default;
                        mQuery += ` \`${value.coloumn}\` LONGTEXT ${mDefault} ${uniques}`;
                        break;
                    case "ENUM" :
                        mDefault = (value.default === null || value.default === undefined) ? `DEFAULT NULL` : ` DEFAULT '${value.default}'`;
                        let ms = `'${value.values.join(`','`)}'`;
                        mQuery += ` \`${value.coloumn}\` ENUM(${ms}) ${mDefault}`;
                        break;
                }
                mQuery += `,`;
            });

            /** Remove (,) in last statment **/
            mQuery = mQuery.substring(0, mQuery.length - 1);

            let mIfNotExist = (mRules.ifNotExist) ? "IF NOT EXISTS " : "";
            let mEngine = (mRules.engine !== undefined) ? `ENGINE ${mRules.engine}` : ``;
            let db = (mRules.database !== undefined) ? `\`${mRules.database}\`.` : ``;
            mFinalQuery = `CREATE TABLE ${mIfNotExist}${db}\`${TableName}\`(${mQuery}) ${mEngine};`;
            this.mMethod = "CREATE_TABLE";

            await this.rawQuerySync<CallbackCreateTable>(mFinalQuery,[], { ifNotExist : mRules.ifNotExist })
                .then(async (result) => {
                    await resolve(result);
                })
                .catch(async (error) => {
                    await rejected(<CallbackError>error);
                });
        })

    }

    /**
     * @method
     * @name CreateTable
     */
    BuatTable = this.CreateTable;

    /**
     * INFORMATION DOCUMENTATION CODE
     * -----
     * @param { string } TableName - <b>TableName</b><br/>
     * The Table Name Database Selected For Use Action for <b>READ DATA<b/>
     * <br/>
     * ---------
     * @param Rule
     * The Rules is Parameter Options For Insert <b>Database Function</b><br/>
     * ---------
     * @return Promise<CallbackCreate | CallbackError> - <b>Promise<CallbackCreate | CallbackError></b><br/>
     * The Return Variable Format
     */
    async Insert(TableName : string, Rule ?: RulesInsert) : Promise<CallbackInsert> {
        this.timeStart = new Date().getTime();
        let Rules = (Rule !== undefined) ? { ... InsertDataConfig, ... Rule} : { ... InsertDataConfig };
        let SQLScript : string | undefined = undefined;
        return new Promise((resolve, rejected) => {
            /** If Rules Data If Undefined **/
            if (Rules === undefined) return rejected();
            let db = (Rules.database !== undefined) ? `\`${Rules.database}\`.` : ``;
            if (!Array.isArray(Rules.data)){
                //################################################################
                let mKey: string[] = [];
                let mVal : any[] = [];
                //################################################################
                Object.keys(Rules.data).forEach((data) => { mKey.push(`\`${data}\``); });
                Object.values(Rules.data).forEach((data) => { mVal.push((typeof data === "string") ? `\`${data}\`` : data); });
                //################################################################
                this.SqlScript = `INSERT INTO ${db}\`${TableName}\` (${mKey.toString()}) VALUE (${mVal.toString()});`;
                //################################################################
            }else if (Array.isArray(Rules.data)) {
                if (Rules.column === undefined) return rejected();
                //################################################################
                let DataColumn : Array<string> = []
                let DataInsert : Array<string> = [];
                //################################################################
                Rules.column.forEach((data) => { DataColumn.push(`\`${data}\``); });
                //################################################################
                Rules.data.forEach((data) => {
                    let mValues : any[]  = [];
                    Object.values(data).forEach((data) => {
                        mValues.push((typeof data === "string") ? `\`${data}\`` : data);
                    });
                    DataInsert.push(`(${mValues.toString()})`);
                });
                //################################################################
                this.SqlScript = `INSERT INTO ${db}\`${TableName}\` (${DataColumn.toString()}) VALUES ${DataInsert.toString()};`;
            }
            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            this.mMethod = "INSERT";
            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

            this.rawQuerySync<CallbackInsert>(this.SqlScript,[])
                .then(async (result) => {
                    await resolve(result);
                })
                .catch(async (error) => {
                    await rejected(<CallbackError>error);
                });

        });
    };

    /**
     * @name Insert
     */
    Create = this.Insert;
    Buat = this.Insert;

    /**
     * INFORMATION DOCUMENTATION CODE
     * -----
     * @param { string } TableName - <b>TableName</b><br/>
     * The Table Name Database Selected For Use Action for <b>READ DATA<b/>
     * <br/>
     * ---------
     * @param {RulesSelect} Rules - <b>Rules</b><br/>
     * The Rules is Parameter Options For Read <b>Database Function</b><br/>
     * ---------
     * @memberOf MariaDB
     * @return Promise<CallbackSelect | CallbackError> - <b>Promise<CallbackSelect | CallbackError></b><br/>
     * The Return Variable Format
     */
    async Select(TableName : string, Rules : RulesSelect = {}): Promise<CallbackSelect> {
        let mRules : RulesSelect = Rules;
        this.timeStart = new Date().getTime();
        this.mSearchAdd = ``;
        let SelectColumn = ``;
        let checkJoin : Promise<string> = new Promise(async (resolve, rejected) => {
            let innerType = ``;
            let On = ``;
            if (mRules.join !== undefined){
                if(mRules.as !== undefined){
                    let mSelectJoinMode = (mRules.join.mode !== undefined) ? `${mRules.join.mode} ` : ``;
                    let joinAliasTableName = (mRules.join.as !== undefined) ? `AS \`${mRules.join.as}\`` : ``;

                    if (mRules.join.column !== undefined){
                        let mJoinAs = mRules.join.as;
                        mRules.join.column.map(async (item) => {
                            if (typeof item === "object"){
                                SelectColumn += (mJoinAs !== undefined) ? `\`${mJoinAs}\`.\`${item.name}\` as \`${item.as}\` ,` : `\`${item.name}\` as \`${item.as}\`,`;
                            }else {
                                SelectColumn += (mJoinAs !== undefined) ? `\`${mJoinAs}\`.\`${item}\`,` : `\`${item}\`,`;
                            }
                        });
                    }else{
                        SelectColumn += (mRules.join.as !== undefined) ? `\`${mRules.join.as}\`.*,` : `*,`;
                    }

                    if (mRules.join.search !== undefined) {
                        let mCondition = (mRules.join.search.condition !== undefined) ? mRules.join.search?.condition : `=`;
                        let checkIfAsExist = (mRules.join.as !== undefined) ? `\`${mRules.join.as}\`.\`${mRules.join.search.coloumName}\`` : `\`${mRules.join.search.coloumName}\``;
                        this.mSearchAdd += `${checkIfAsExist} ${mCondition} '${mRules.join.search.data}' `;
                        if (mRules.search !== undefined){
                            this.mSearchAdd += `${mRules.join.search.conditionFromParents} `;
                        }
                    }

                    if (mRules.join.on !== undefined){
                        if (mRules.join.on.collNameFirst.tableAlias !== undefined){
                            On = ` ON \`${mRules.join.on.collNameFirst.tableAlias}\`.\`${mRules.join.on.collNameFirst.collName}\` = \`${mRules.join.on.collNameSecond.tableAlias}\`.\`${mRules.join.on.collNameSecond.collName}\` `;
                        }else {
                            On = ` ON \`${mRules.as}\`.\`${mRules.join.on.collNameFirst.collName}\` = \`${mRules.join.on.collNameSecond.tableAlias}\`.\`${mRules.join.on.collNameSecond.collName}\` `;
                        }
                    }else{
                        On = ``;
                    }

                    innerType += `${mSelectJoinMode}JOIN \`${mRules.join.TableName}\` ${joinAliasTableName} ${On}`;
                    await resolve(innerType)
                }else{
                    await rejected({ status : false, code : 500, msg : `join mode is exist. but parent as not set. please set first`} as CallbackError)
                }
            }else{
                await resolve(``)
            }
        })
        return new Promise(async (resolve, rejected) => {
            if (Array.isArray(mRules.search)){
                await mRules.search.forEach((item  ) => {
                    if (typeof item === "object"){
                        let mCondition = (item.condition !== undefined) ? item.condition : `=`;
                        let mCheckIfNull = (item.data !== null) ? `${mCondition} \'${item.data}\'` : `IS NULL`;
                        let checkIfAsExist = (mRules.as !== undefined) ? `\`${mRules.as}\`.\`${item.coloumName}\`` : `\`${item.coloumName}\``;
                        this.mSearchAdd += `${checkIfAsExist} ${mCheckIfNull}`;
                    }else if(isString(item)){
                        this.mSearchAdd += ` ${item} `;
                    }
                });
            }else if (typeof mRules.search === "object"){
                let mCondition = (mRules.search.condition !== undefined) ? mRules.search.condition : `=`;
                let checkIfAsExist = (mRules.as !== undefined) ? `\`${mRules.as}\`.\`${mRules.search.coloumName}\`` : `\`${mRules.search.coloumName}\``;
                this.mSearchAdd += `${checkIfAsExist} ${mCondition} '${mRules.search.data}' `;
            }
            const UpdateWhere = (mRules.search !== undefined) ? `WHERE ${this.mSearchAdd}` : ``;
            if (mRules.column !== undefined){
                mRules.column.map(async (item) => {
                    if (isObject(item)){
                        if (mRules.as !== undefined){
                            SelectColumn += `\`${mRules.as}\`.\`${item.name}\` AS \`${item.as}\`,`
                        }else{
                            SelectColumn += `\`${item.name}\` AS \`${item.as}\`,`
                        }
                    }else if(isString(item)){
                        if (mRules.as !== undefined){
                            SelectColumn += `\`${mRules.as}\`.\`${item}\`,`;
                        }else{
                            SelectColumn += `\`${item}\`,`;
                        }
                    }
                })
            }else{
                SelectColumn += (mRules.as !== undefined) ? `\`${mRules.as}\`.*,` : `*,`;
            }
            SelectColumn = SelectColumn.slice(0, -1);
            const SelectLimit = (mRules.limit !== undefined) ? `LIMIT ${mRules.limit}` : ``;
            const SelectOrderBy = (mRules.orderBy !== undefined && mRules.orderBy.column.length > 0) ? `ORDER BY ${mRules.orderBy.column} ${mRules.orderBy.mode} ` : ` `;
            const selectParentAs = (mRules.as !== undefined && mRules.as !== false) ? ` AS \`${mRules.as}\` ` : ` `;
            await checkJoin
                .then(async (innerType) => {
                    const DBName = (mRules.database !== undefined) ? `\`${mRules.database}\`.` : ``;
                    const mSQL = `SELECT ${SelectColumn} FROM ${DBName}\`${TableName}\`${selectParentAs}${innerType}${UpdateWhere}${SelectOrderBy}${SelectLimit};`;

                    this.mMethod = "READ";
                    await this.rawQuerySync<CallbackSelect>(mSQL,[])
                        .then(async (result) => {
                            await resolve(result);
                        })
                        .catch(async (error) => {
                            await rejected(<CallbackError>error);
                        })
                }).catch(async (error) => {
                    await rejected(<CallbackError>error);
                })

        })
    };

    /**
     * @name Select
     */
    Baca = this.Select;
    Lihat = this.Select;

    /**
     * INFORMATION DOCUMENTATION CODE
     * -----
     * @param { string } TableName - <b>TableName</b><br/>
     * The Table Name Database Selected For Use Action for <b>READ DATA<b/>
     * <br/>
     * ---------
     * @param {RulesUpdate} Rules - <b>Rules</b><br/>
     * The Rules is Parameter Options For Update <b>Database Function</b><br/>
     * ---------
     * @return Promise<CallbackUpdate | CallbackError> - <b>Promise<CallbackUpdate | CallbackError></b><br/>
     * The Return Variable Format
     */
    async Update(TableName : string, Rules : RulesUpdate) : Promise<CallbackUpdate> {
        this.timeStart = new Date().getTime();
        /** Merge JSON Extend loDash **/
        const Rule = extend({
            data: false,
            search: false
        }, Rules);

        this.mKey = [];
        this.mSearchAdd = ``;
        return new Promise(async (resolve, rejected) => {
            Object.keys(Rule.data).forEach((key) => {
                this.mKey.push(` ${key} = '${Rule.data[key]}'`);
            });

            if (Array.isArray(Rules.search)){
                await Rules.search.forEach((item ) => {
                    if (typeof item === "object"){
                        let mCondition = (item.condition !== undefined) ? item.condition : `=`;
                        let mCheckIfNull = (item.data !== null) ? `${mCondition} \'${item.data}\'` : `IS NULL`;
                        this.mSearchAdd += `\`${item.coloumName}\` ${mCheckIfNull}`;
                    }else if(isString(item)){
                        this.mSearchAdd += ` ${item} `;
                    }
                });
            }else if (typeof Rules.search === "object"){
                let mCondition = (Rules.search.condition !== undefined) ? Rules.search.condition : `=`
                this.mSearchAdd += `\`${Rules.search.coloumName}\` ${mCondition} '${Rules.search.data}' `;
            }

            const UpdateWhere = (Rule.search !== false) ? `WHERE ${this.mSearchAdd}` : ``;

            const db = (Rule.database !== undefined) ? `\`${Rule.database}\`.` : ``;
            const mSQL = `UPDATE ${db}\`${TableName}\` SET ${this.mKey} ${UpdateWhere} `;
            this.mMethod = "UPDATE";
            await this.rawQuerySync<CallbackUpdate>(mSQL, [])
                .then(async (result) => {
                    await resolve(result);
                })
                .catch(async (error) => {
                    await rejected(<CallbackError>error);
                })

        })
    }

    /**
     * @name Update
     */
    Edit = this.Update;
    Ubah = this.Update;

    /**
     * INFORMATION DOCUMENTATION CODE
     * -----
     * @param { string } TableName - <b>TableName</b><br/>
     * The Table Name Database Selected For Use Action for <b>READ DATA<b/>
     * <br/>
     * ---------
     * @param {RulesDelete} Rules - <b>Rules</b><br/>
     * The Rules is Parameter Options For Delete <b>Database Function</b><br/>
     * ---------
     * @return Promise<CallbackDelete | CallbackError> - <b>Promise<CallbackDelete | CallbackError></b><br/>
     * The Return Variable Format
     */

    async Delete (TableName : string , Rules : RulesDelete) : Promise<CallbackDelete>{

        const Rule = extend({
            search: false
        }, Rules);

        this.mWhere = [];

        return new Promise(async (resolve, rejected) => {
            Object.keys(Rule.search).forEach((key) => {
                this.mWhere.push(` \`${key}\` = "${Rule.search[key]}" `)
            });

            const DeleteWhere = (Rule.search !== false) ? `WHERE ${this.mWhere}` : ``;
            const TablesName = (Rule.database !== undefined) ? `\`${Rule.database}\`.` : ``;
            const SqlScript = `DELETE FROM ${TablesName}\`${TableName}\` ${DeleteWhere} `;
            this.mMethod = "DELETE";
            await this.rawQuerySync<CallbackDelete>(SqlScript, [])
                .then(async (result) => {
                    await resolve(result);
                })
                .catch(async (error) => {
                    await rejected(<CallbackError>error);
                })

        })
    };

    /**
     * @name Delete
     */
    Remove = this.Delete;
    Hapus = this.Delete;


    async Procedure(name : string, params : object) : Promise<any> {
        return new Promise(async (resolve, rejected) => {
            this.mKey = [];
            this.mVal = [];

            Object.keys(params).map(async (key : string) => {
                this.mKey.push(`?`);
                // @ts-ignore
                this.mVal.push(params[key])
            })
            this.mMethod = "PROCCEDURE";
            let mSQL = `CALL \`${name}\`(${this.mKey})`;
            this.rawQuerySync(mSQL,this.mVal)
                .then(async (result) => {
                    await resolve(result);
                })
                .catch(async (error) => {
                    await rejected(error);
                })
        })
    }
    /**
     *
     * @param {string} SQLString
     * @param {any}values
     * @param ExtendsOptions
     */
    async rawQuerySync<T>(SQLString : string, values?: any, ExtendsOptions ?: ExtendsOptions): Promise<T> {
        return new Promise(async (resolve, rejected) => {
            switch (this.mConfig.engine) {
                case "Connection":
                    let mInstanceConnection = await (this.mInstance as Promise<Connection>);
                    await rejected({
                        status: false,
                        code: 500,
                        msg: `function now unavailable`
                    });
                    break;
                case "PoolConnection":
                    let mInstancePool = (this.mInstance as Pool);
                    await mInstancePool.getConnection()
                        .then(async (PoolConnection) => {
                            //Start After Get Connection
                            await PoolConnection.query(SQLString, values)
                                .then(async (rows) => {
                                    let timeEnd = new Date().getTime();
                                    let metadata: metadata = {
                                        activeConnections: mInstancePool.activeConnections(),
                                        idleConnections: mInstancePool.idleConnections(),
                                        totalConnections: mInstancePool.totalConnections(),
                                        lastInsertId : undefined,
                                        sqlRaw: SQLString,
                                        timeExecuteinMilliSecond: Math.round(timeEnd - this.timeStart),
                                        timeExecuteinSecond: ((timeEnd - this.timeStart) / 1000)
                                    }
                                    switch (this.mMethod) {
                                        case "CREATE_DB" :
                                            let mIfNotExistDB = (ExtendsOptions !== undefined && ExtendsOptions.ifNotExist) ? ExtendsOptions.ifNotExist : false;
                                            await PoolConnection.release()
                                                .then(async () => {
                                                    if (rows.warningStatus < 1 || mIfNotExistDB) {
                                                        await resolve(<T>{
                                                            status: true,
                                                            code: 200,
                                                            msg: `successful, your database has been created`,
                                                            metadata: metadata
                                                        });
                                                    }else{
                                                        await rejected({
                                                            status: false,
                                                            code: 201,
                                                            msg: `warning status detected. Check Warning Message`,
                                                            affected : rows.affectedRows,
                                                            warning : rows.warningStatus,
                                                            metadata: metadata
                                                        });
                                                    }
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                });
                                            break;
                                        case "CREATE_TABLE" :
                                            let mIfNotExist = (ExtendsOptions !== undefined && ExtendsOptions.ifNotExist) ? ExtendsOptions.ifNotExist : false;
                                            await PoolConnection.release()
                                                .then(async () => {
                                                    if (rows.warningStatus < 1 || mIfNotExist) {
                                                        await resolve(<T>{
                                                            status: true,
                                                            code: 200,
                                                            msg: `successful, your table has been created`,
                                                            metadata: metadata
                                                        });
                                                    }else{
                                                        await rejected({
                                                            status: false,
                                                            code: 201,
                                                            msg: `warning status detected. Check Warning Message`,
                                                            affected : rows.affectedRows,
                                                            warning : rows.warningStatus,
                                                            metadata: metadata
                                                        });
                                                    }
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                });

                                            break;
                                        case "INSERT":
                                            await PoolConnection.release()
                                                .then(async () => {
                                                    if (rows.affectedRows > 0) {
                                                        if (rows.warningStatus < 1) {
                                                            metadata = await merge(metadata, { lastInsertId : rows.insertId });
                                                            await resolve(<T>{
                                                                status: true,
                                                                code: 200,
                                                                msg: `successful, your data has been created`,
                                                                metadata: metadata
                                                            });
                                                        } else {
                                                            await rejected({
                                                                status: false,
                                                                code: 201,
                                                                msg: `warning status detected. Check Warning Message`,
                                                                metadata: metadata
                                                            });
                                                        }
                                                    } else {
                                                        await rejected({
                                                            status: false,
                                                            code: 404,
                                                            msg: `Succeeded, But No Data Changed Created`,
                                                            metadata: metadata
                                                        });
                                                    }
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                })
                                            break;
                                        case "READ":
                                            await PoolConnection.release()
                                                .then(async () => {
                                                    if (rows.length > 0) {
                                                        await resolve(<T>{
                                                            status: true,
                                                            code: 200,
                                                            msg: `successful, your data has been read`,
                                                            data: rows,
                                                            metadata: metadata
                                                        });
                                                    } else {
                                                        await rejected({
                                                            status: false,
                                                            code: 404,
                                                            msg: `Succeeded, But No Data Found`,
                                                            metadata: metadata
                                                        });
                                                    }
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                })
                                            break;
                                        case "UPDATE" :
                                            await PoolConnection.release()
                                                .then(async () => {
                                                    if (rows.affectedRows > 0) {
                                                        if (rows.warningStatus < 1) {
                                                            await resolve(<T>{
                                                                status: true,
                                                                code: 200,
                                                                msg: `successful, your data has been update`,
                                                                affected : rows.affectedRows,
                                                                warning : rows.warningStatus,
                                                                metadata: metadata
                                                            });
                                                        } else {
                                                            await rejected({
                                                                status: false,
                                                                code: 201,
                                                                msg: `warning status detected. Check Warning Message`,
                                                                affected : rows.affectedRows,
                                                                warning : rows.warningStatus,
                                                                metadata: metadata
                                                            });
                                                        }
                                                    } else {
                                                        await rejected({
                                                            status: false,
                                                            code: 404,
                                                            msg: `Succeeded, But No Data Changed`,
                                                            metadata: metadata
                                                        });
                                                    }
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                })
                                            break;
                                        case "DELETE" :
                                            await PoolConnection.release()
                                                .then(async () => {
                                                    if (rows.affectedRows > 0) {
                                                        if (rows.warningStatus < 1) {
                                                            await resolve(<T>{
                                                                status: true,
                                                                code: 200,
                                                                msg: `successful, your data has been delete`,
                                                                affected : rows.affectedRows,
                                                                warning : rows.warningStatus,
                                                                metadata: metadata
                                                            });
                                                        } else {
                                                            await rejected({
                                                                status: false,
                                                                code: 201,
                                                                msg: `warning status detected. Check Warning Message`,
                                                                affected : rows.affectedRows,
                                                                warning : rows.warningStatus,
                                                                metadata: metadata
                                                            });
                                                        }
                                                    } else {
                                                        await rejected({
                                                            status: false,
                                                            code: 404,
                                                            msg: `Succeeded, But No Data Changed`,
                                                            metadata: metadata
                                                        });
                                                    }
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                })
                                            break;
                                        case "PROCCEDURE" :
                                            PoolConnection.release()
                                                .then(async () => {
                                                    let mRow = rows[0];
                                                    if (mRow.length > 0) {
                                                        await resolve(<T>{
                                                            status: true,
                                                            code: 200,
                                                            msg: `successful, your data has been read`,
                                                            data: mRow,
                                                            metadata: metadata
                                                        });

                                                    } else {
                                                        await rejected({
                                                            status: false,
                                                            code: 404,
                                                            msg: `Succeeded, But No Data Found`,
                                                            metadata: metadata
                                                        });
                                                    }
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                })
                                            break;
                                        default:
                                            this.timeStart = new Date().getTime();
                                            await PoolConnection.release()
                                                .then(async () => {
                                                    await rejected({
                                                        status: false,
                                                        code: 505,
                                                        msg: `Method Unknown`,
                                                        metadata: metadata
                                                    });
                                                })
                                                .catch(async () => {
                                                    await rejected(<T>{
                                                        status: false,
                                                        code: 500,
                                                        msg: `failed connection release`,
                                                        metadata: metadata
                                                    });
                                                });
                                            break;
                                    }

                                })
                                .catch(async (error) => {
                                    let timeEnd = new Date().getTime();
                                    let metadata: metadata = {
                                        activeConnections: mInstancePool.activeConnections(),
                                        idleConnections: mInstancePool.idleConnections(),
                                        totalConnections: mInstancePool.totalConnections(),
                                        sqlRaw: SQLString,
                                        timeExecuteinMilliSecond: Math.round(timeEnd - this.timeStart),
                                        timeExecuteinSecond: ((timeEnd - this.timeStart) / 1000)
                                    }
                                    await PoolConnection.release()
                                        .then(async () => {
                                            switch (error.code) {
                                                case 'ER_TABLE_EXISTS_ERROR' :
                                                    await rejected({
                                                        status: false,
                                                        code: 500,
                                                        msg: "Failed, Table Name Is Exists",
                                                        metadata : metadata,
                                                        error: {
                                                            errorMsg: error.text,
                                                            errorCode: error.code,
                                                            errNo: error.errno
                                                        }
                                                    });
                                                    break;
                                                case "ER_NO_SUCH_TABLE" :
                                                    await rejected({
                                                        status: false,
                                                        code: 500,
                                                        msg: "Error Detected",
                                                        metadata : metadata,
                                                        error: {
                                                            errorMsg: error.text,
                                                            errorCode: error.code,
                                                            errNo: error.errno
                                                        }
                                                    });
                                                    break;
                                                case "ER_DUP_ENTRY" :
                                                    await rejected({
                                                        status: false,
                                                        code: error.errno,
                                                        msg: error.text,
                                                        metadata : metadata
                                                    });
                                                    break;
                                                default :
                                                    await rejected({
                                                        status: false,
                                                        code: 500,
                                                        msg: "Error Detected",
                                                        metadata : metadata,
                                                        error: {
                                                            errorMsg: error.text,
                                                            errorCode: error.code,
                                                            errNo: error.errno
                                                        }
                                                    });
                                            }
                                        })
                                        .catch(async () => {
                                            await rejected(<T>{
                                                status: false,
                                                code: 500,
                                                msg: `failed connection release`,
                                                metadata: metadata
                                            });
                                        })
                                });
                            //End After Get Connection
                        })
                        .catch(async (error) => {
                            switch (error.code) {
                                case "ER_GET_CONNECTION_TIMEOUT" :
                                    await rejected({
                                        status: false,
                                        code: 500,
                                        msg: `Pool Connection get connection Error`,
                                        error: {
                                            errorMsg: error.text,
                                            errorCode: error.code,
                                            errNo: error.errno
                                        }
                                    });
                                    break;
                                default :
                                    await rejected({
                                        status: false,
                                        code: 500,
                                        msg: `Pool Connection get connection Error`,
                                        error: {
                                            errorMsg: error.text,
                                            errorCode: error.code,
                                            errNo: error.errno
                                        }
                                    });
                                    break;
                            }
                        });
                    break;
                case "PoolClusterConnection":
                    await rejected({
                        status: false,
                        code: 500,
                        msg: `function now unavailable`
                    });
                    break;
                default:
                    this.mInstance = undefined;
                    await rejected({
                        status: false,
                        code: 500,
                        msg: `function now unavailable`
                    });
                    break;
            }
        });

    }

    /**
     * @name rawQuerySync
     */
    Query = this.rawQuerySync;

    async AutoBackup(enabled : Boolean = true) : Promise<CallbackBackup> {
        return new Promise(async (resolve, rejected) => {
            const path = require("path");
            if (enabled){
                if (require.resolve("mysqldump")){
                    const mysqlDump = require("mysqldump").default;
                    const fs = require("fs");
                    let AddPathByTimes = ``;
                    let renameFile = ``;
                    let renameFileChecksum = ``;
                    let nameCompressed = ``;
                    let reformatNameTimes = ``;

                    let fileBuffer : Buffer;
                    let hashSum : crypto.Hash;
                    let checksumHex : string | undefined = undefined;
                    switch (this.mConfig.autoBackup?.backupPriodic) {
                        case "HOURS" :
                            AddPathByTimes = path.join(<string>this.mConfig.autoBackup?.dumpFileLocation,'./Hours');
                            if (!fs.existsSync(AddPathByTimes)){
                                await fs.mkdirSync(AddPathByTimes, { recursive : true, mode : 0o77 });
                            }
                            reformatNameTimes = moment().format("dddd_HH_DD-MM-YYYY");
                            nameCompressed = (this.mConfig.autoBackup?.compressFile) ? ".gz" : "";
                            renameFile = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}`;
                            renameFileChecksum = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}.txt`;
                            break;
                        case "DAILY" :
                            AddPathByTimes = path.join(<string>this.mConfig.autoBackup?.dumpFileLocation,'./Daily');
                            if (!fs.existsSync(AddPathByTimes)){
                                await fs.mkdirSync(AddPathByTimes, { recursive : true, mode : 0o77 });
                            }

                            reformatNameTimes = moment().format("dddd_DD-MM-YYYY");
                            nameCompressed = (this.mConfig.autoBackup?.compressFile) ? ".gz" : "";
                            renameFile = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}`;
                            renameFileChecksum = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}.txt`;
                            break;
                        case "MONTH" :
                            AddPathByTimes = path.join(<string>this.mConfig.autoBackup?.dumpFileLocation,'./Month');
                            if (!fs.existsSync(AddPathByTimes)){
                                await fs.mkdirSync(AddPathByTimes, { recursive : true, mode : 0o77 });
                            }

                            reformatNameTimes = moment().format("MM-YYYY");
                            nameCompressed = (this.mConfig.autoBackup?.compressFile) ? ".gz" : "";
                            renameFile = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}`;
                            renameFileChecksum = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}.txt`;
                            break;
                        case "YEARS" :
                            AddPathByTimes = path.join(<string>this.mConfig.autoBackup?.dumpFileLocation,'./Years');
                            if (!fs.existsSync(AddPathByTimes)){
                                await fs.mkdirSync(AddPathByTimes, { recursive : true, mode : 0o77 });
                            }

                            reformatNameTimes = moment().format("YYYY");
                            nameCompressed = (this.mConfig.autoBackup?.compressFile) ? ".gz" : "";
                            renameFile = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}`;
                            renameFileChecksum = `${AddPathByTimes}/${this.mConfig.autoBackup?.filename}-${reformatNameTimes}${this.mConfig.autoBackup?.extension}${nameCompressed}.txt`;

                            break;
                        default :
                            await rejected({
                                status : false,
                                code : 500,
                                msg : `Method Unknown or Not Available`
                            });
                            break;
                    }

                    if (!fs.existsSync(renameFile) || this.mConfig.autoBackup?.forceReplace){
                        await mysqlDump({
                            connection : {
                                host : this.mConfig.host,
                                user : this.mConfig.user,
                                password : this.mConfig.password,
                                port : this.mConfig.port,
                                database : this.mConfig.database
                            },
                            dumpToFile : renameFile,
                            compressFile : this.mConfig.autoBackup?.compressFile
                        }).then(async (dumpReturn: DumpReturn) => {
                            /** Generate Hex Checksum Of File Backup **/
                            fileBuffer = fs.readFileSync(renameFile);
                            hashSum = crypto.createHash('sha256');
                            await hashSum.update(fileBuffer);
                            checksumHex = hashSum.digest('hex');
                            await fs.writeFileSync(renameFileChecksum, `checksum=${checksumHex}`);
                            /** End Generate Hex Checksum Of File Backup **/
                            let timeEnd = new Date().getTime();

                            resolve({
                                status : true,
                                code : 200,
                                msg : `successfully to Backup Database`,
                                filename : renameFile,
                                checksum : checksumHex
                            })
                        }).catch(async (error : CallbackError) => {
                            await rejected({
                                status : false,
                                code : 500,
                                msg : `Failed to Backup Database Schedule.`,
                                error : {
                                    errorMsg : ``
                                },
                                errorEx : error
                            })
                        })
                    }else{
                        /** Generate Hex Checksum Of File Backup **/
                        fileBuffer = fs.readFileSync(renameFile);
                        hashSum = crypto.createHash('sha256');
                        await hashSum.update(fileBuffer);
                        checksumHex = hashSum.digest('hex');
                        await fs.writeFileSync(renameFileChecksum, `checksum=${checksumHex}`);
                        /** End Generate Hex Checksum Of File Backup **/

                        await resolve({
                            status : true,
                            code : 301,
                            msg : `Sucessfully. But backup is Exist. Backup Action Skipped`,
                            filename : renameFile,
                            checksum : checksumHex
                        })
                    }
                }else{
                    await rejected({
                        status : false,
                        code : 500,
                        msg : `MODULE "mysqldump" not Installed. please install First`
                    });
                }
            }else{
                await rejected({
                    status : false,
                    code : 500,
                    msg : `Auto Backup Disable. to use it please enabled first`
                });
            }
        })
    }
}
export default MariaDB;