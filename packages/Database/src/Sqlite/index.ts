import Sqlite3 from "@journeyapps/sqlcipher";
import {SqliteConfigConstructor} from "./Interfaces/SqliteConfigTypes";
import * as fs from "fs";
import SqliteCRUD from "./Class/SqliteCRUD";

let sqlite = Sqlite3.verbose();

function Sqlite (config : SqliteConfigConstructor) : SqliteCRUD {
    let db = new sqlite.Database(config.filename);
    db.serialize();
    //*****************************************************************
    (config.version !== undefined) ? db.run(`PRAGMA cipher_compatibility = ${config.version}`) : db.run(`PRAGMA cipher_compatibility = 4`);
    //*****************************************************************
    if (config.phrasepass !== undefined) db.run(`PRAGMA key = '${config.phrasepass}'`);
    return new SqliteCRUD(db);
}

export default Sqlite;