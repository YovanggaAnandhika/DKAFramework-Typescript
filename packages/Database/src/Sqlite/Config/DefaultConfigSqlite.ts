import {SqliteConfiguration} from "../Interfaces/SqliteConfiguration";
import { merge } from "lodash";
import {
    DEVELOPMENT,
    SQLITE_EXT_DB,
    SQLITE_JOURNAL_WAL,
    SQLITE_SYNCHRONOUS_NORMAL
} from "../Types/SqliteConfigurationTypes";
import path from "path";

export const DefaultConfigSqlite : SqliteConfiguration = {
    states : DEVELOPMENT,
    db_name : "example",
    settings : {
        path : path.dirname(require.main!.filename),
        secretKey : undefined,
        journalMode : SQLITE_JOURNAL_WAL,
        synchronous : SQLITE_SYNCHRONOUS_NORMAL,
        extension : SQLITE_EXT_DB
    }
}

export default DefaultConfigSqlite;