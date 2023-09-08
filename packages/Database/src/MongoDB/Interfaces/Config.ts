import {MongoClientOptions} from "mongodb";


export interface MongoDBConfigConstructor {
    host ?: string | undefined,
    port ?: string | number | undefined,
    autoConnect ?: boolean | undefined,
    db ?: string | undefined,
    options ?: MongoClientOptions
}