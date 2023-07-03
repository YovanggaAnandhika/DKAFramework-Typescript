import {
    DEVELOPMENT,
    PRODUCTION,
    SQLITE_ALL_EXT,
    SQLITE_JOURNAL_ALL, SQLITE_SYNCHRONOUS_ALL,
    SQLITE_SYNCHRONOUS_FULL
} from "../Types/SqliteConfigurationTypes";

import * as Path from "path";



export interface SqliteConfigurationSettings {
    path ?: string,
    secretKey ?: string,
    journalMode ?: SQLITE_JOURNAL_ALL,
    synchronous ?: SQLITE_SYNCHRONOUS_ALL,
    extension ?: SQLITE_ALL_EXT
}
export interface SqliteConfiguration {
    states ?: DEVELOPMENT | PRODUCTION,
    db_name ?: string,
    settings ?: SqliteConfigurationSettings
}