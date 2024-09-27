import {DbOptions, MongoClient, MongoClientOptions} from "mongodb";


export interface MongoDBConfigConstructorObject {
    host ?: string | undefined,
    port ?: string | number | undefined,
    options ?: MongoClientOptions | undefined
}

export interface MongoDBConfigConstructorObjectInArray extends MongoDBConfigConstructorObject {
    name : string
}

export type MongoDBConfigConstructor = Array<MongoDBConfigConstructorObjectInArray>

export interface MongoDBInstance {
    [ name : string  ] : MongoClient
}

//export type MongoDBInstance<T> = T extends Array<infer U > ? U : T
export type MongoDBCallbackChecker<T extends Array<MongoDBConfigConstructorObjectInArray>> = {
    [p in T[number]["name"]] : p extends undefined ? never : MongoClient
}