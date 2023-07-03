import {Database} from "@journeyapps/sqlcipher";
import {SqliteConfiguration} from "./SqliteConfiguration";

export interface SqliteCallback {
    status ?: boolean,
    code ?: null,
    msg ?: string,
    db ?: Database,
    path ?: string,
    config ?: SqliteConfiguration
}