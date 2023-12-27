import mongodb, {Db, MongoClient} from "mongodb";
import {MongoDBConfigConstructor, MongoDBConfigDB, MongoDBInstance} from "./Interfaces/Config";
import {MongoDBCallbackDb, MongoDBCallbackMongoClient} from "./Interfaces/Callback";
import Config from "../MariaDB/Config";

export type MongoDBCallbackChecker<DB> = DB extends { db : string }
    ? MongoDBCallbackDb : MongoDBCallbackMongoClient;


export class MongoDB {
    private mongoClient : MongoDBInstance = {};
    isConnected : boolean = false;
    constructor(config : MongoDBConfigConstructor) {
        if (Array.isArray(config)){
            if (config.length > 1){
                config.forEach((configSingle) => {
                    let URLConnector = `mongodb://${configSingle.host}:${configSingle.port}`;
                    this.mongoClient[configSingle.name] = (configSingle.options !== undefined) ? new MongoClient(URLConnector, configSingle.options) : new MongoClient(URLConnector);
                })
            }else{
                let URLConnector = `mongodb://${config[0].host}:${config[0].port}`;
                this.mongoClient["default"] = (config[0].options !== undefined) ? new MongoClient(URLConnector, config[0].options) : new MongoClient(URLConnector);
            }
        }else{
            let URLConnector = `mongodb://${config.host}:${config.port}`;
            this.mongoClient["default"] = (config.options !== undefined) ? new MongoClient(URLConnector, config.options) : new MongoClient(URLConnector);
        }
    }

    async db(config : MongoDBConfigDB) : Promise<mongodb.Db> {
        let mongoClientInstance = (config.mongoClientName !== undefined) ? this.mongoClient[config.mongoClientName] : this.mongoClient["default"];
        return new Promise(async (resolve, reject) => {
            mongoClientInstance.on("serverHeartbeatSucceeded", (a) => {
                if (!this.isConnected){
                    this.isConnected = true;
                }
            });
            mongoClientInstance.on("serverHeartbeatFailed", (a) => {
                if (this.isConnected){
                    this.isConnected = false;
                }
            });

            mongoClientInstance.on("timeout", () => {
                console.log("disconnected")
            })

            await mongoClientInstance.connect()
                .then((mongoclient) => {
                    if (this.isConnected){
                        let db = (config.options !== undefined) ? mongoClientInstance.db(config.dbName, config.options) : mongoclient.db(config.dbName);
                        resolve(db);
                    }else{
                        reject({ status : false, code : 503, msg : `database not connected`});
                    }
                })
                .catch((error) => {
                    reject({ status : false, code : 503, msg : `error connected database`, error : error});
                })

        })
    }







}
export default MongoDB;