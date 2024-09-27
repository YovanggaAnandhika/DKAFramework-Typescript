import {MongoDBConfigConstructor} from "../Interfaces/Config";


export const MongoDBDefaultConfig : MongoDBConfigConstructor = [
    {
        name : "client",
        host : "localhost",
        port : 27017
    }
]