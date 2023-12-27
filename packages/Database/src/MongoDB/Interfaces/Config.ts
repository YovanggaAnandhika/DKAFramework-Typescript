import {DbOptions, MongoClient, MongoClientOptions} from "mongodb";


export interface MongoDBConfigConstructorObject {
    host ?: string | undefined,
    port ?: string | number | undefined,
    options ?: MongoClientOptions | undefined
}

export interface MongoDBConfigConstructorObjectInArray extends MongoDBConfigConstructorObject {
    name : string
}

export type MongoDBConfigConstructor = Array<MongoDBConfigConstructorObjectInArray> | MongoDBConfigConstructorObject;

export interface MongoDBInstance {
    [ name : string ] : MongoClient
}

export interface MongoDBConfigDB {
    mongoClientName ?: string | undefined;
    dbName : string,
    options ?: DbOptions | undefined
}