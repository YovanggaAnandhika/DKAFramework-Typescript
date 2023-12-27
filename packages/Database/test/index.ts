import Database from "../src";

(async () => {
    let mongo = new Database.MongoDB({
        host : "127.0.0.1",
        port : "27017",
        options : {
            auth : {
                username : "developer",
                password : "Cyberhack2010",
            },
            connectTimeoutMS : 2000,
            socketTimeoutMS : 2000,
            heartbeatFrequencyMS : 1000,
            serverSelectionTimeoutMS : 1000
        },
    });

    mongo.db({
        dbName : "dka_parking"
    })
        .then(async (db) => {
            let data = await db.collection("dka_parking_sys_corporation").find().toArray();
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })

})();


