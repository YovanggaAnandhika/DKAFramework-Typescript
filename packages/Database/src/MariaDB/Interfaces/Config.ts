import {ConnectionConfig, PoolClusterConfig, PoolConfig} from "mariadb"
import {db_createConnection, db_createPoolClusterConnection, db_createPoolConnection, Priodic} from "../Type/types";


export interface MariaDBConstructorConfigAutoBackup {
    enabled ?: boolean,
    backupPriodic ?: Priodic | undefined,
    filename ?: string | undefined,
    dumpFileLocation ?: string | undefined,
    extension ?: string | undefined,
    forceReplace ?: boolean,
    compressFile ?: boolean
}

export interface MariaDBConstructorConfigGeneral extends ConnectionConfig, PoolConfig, PoolClusterConfig {
    engine? : db_createConnection | db_createPoolConnection | db_createPoolClusterConnection,
    autoBackup ?: MariaDBConstructorConfigAutoBackup,
}

export interface MariaDBPoolClusterObjectList extends PoolClusterConfig {
    patternName : string,
    selectorConfig : string
}
export type MariaDBConstructorConfig = MariaDBConstructorConfigGeneral