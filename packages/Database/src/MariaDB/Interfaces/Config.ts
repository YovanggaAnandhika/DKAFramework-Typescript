import {ConnectionConfig, PoolClusterConfig, PoolConfig} from "mariadb"
import {db_createConnection, db_createPoolClusterConnection, db_createPoolConnection, Priodic} from "../Type/types";



export interface MariaDBConstructorConfigGeneral extends ConnectionConfig, PoolConfig, PoolClusterConfig {
    engine? : db_createConnection | db_createPoolConnection | db_createPoolClusterConnection
}

export interface MariaDBPoolClusterObjectList extends PoolClusterConfig {
    patternName : string,
    selectorConfig : string
}
export type MariaDBConstructorConfig = MariaDBConstructorConfigGeneral