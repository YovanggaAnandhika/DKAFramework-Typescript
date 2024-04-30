import mongodb, {Db, MongoClient} from "mongodb";
import {MongoDBCallbackChecker, MongoDBConfigConstructor, MongoDBInstance} from "./Interfaces/Config";

export function MongoDB<T extends MongoDBConfigConstructor>(config?: T) {

}
