import mongodb, {Db, MongoClient} from "mongodb";
import {MongoDBCallbackChecker, MongoDBConfigConstructor, MongoDBInstance} from "./Interfaces/Config";
import {MongoDBCallbackDb, MongoDBCallbackMongoClient} from "./Interfaces/Callback";
import Config from "../MariaDB/Config";
import {MongoDBDefaultConfig} from "./Const/Config";
import _ from "lodash";

function MongoDB<T extends MongoDBConfigConstructor>(config?: T) {

}
export default MongoDB;