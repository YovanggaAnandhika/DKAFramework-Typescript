import {Database} from "@journeyapps/sqlcipher";


export interface SqliteMultipleInstance {
    [dbName : string] : Database
}