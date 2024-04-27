import Database from "../src";
import {ObjectId} from "mongodb";


(async () => {

    const databaseGeoMysql = new Database.MariaDB({
        host : "127.0.0.1",
        user : "developer",
        password : "Cyberhack2010",
        database : "geo_indonesia"
    });

    const databaseGeoMongo = new Database.MongoDB({
        host : "127.0.0.1",
        port : 27017,
        options : {
            auth : {
                username : "developer",
                password : "Cyberhack2010"
            }
        }
    });
    let metadata = await databaseGeoMongo.db({
        dbName : "metadata",
    });

    let provinces = metadata.collection("metadata_geo_provinces");
    let regencies = metadata.collection("metadata_geo_regencies");
    let districts = metadata.collection("metadata_geo_districts");
    let villages = metadata.collection("metadata_geo_villages");


    /*databaseGeoMysql.Select(`provinces`)
        .then((response) => {
            provinces.insertMany(response.data)
                .then((result) => {
                    console.log("selesai")
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });*/

    /*databaseGeoMysql.Select(`regencies`)
        .then((response) => {
            regencies.insertMany(response.data)
                .then((result) => {
                    console.log("selesai")
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });*/

    /*databaseGeoMysql.Select(`districts`)
        .then((response) => {
            districts.insertMany(response.data)
                .then((result) => {
                    console.log("selesai")
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });*/

    /*databaseGeoMysql.Select(`villages`)
        .then((response) => {
            villages.insertMany(response.data)
                .then((result) => {
                    console.log("selesai")
                })
                .catch((error) => {
                    console.log(error);
                });
            /!*response.data.map( async (value : any) => {
                await console.log(`inserted Data ${BigInt(value['id'])} ${value['name']}`)
                await villages.insertOne({
                    id : BigInt(value['id']),
                    district_id : BigInt(value['district_id']),
                    name : value['name']
                });

            });*!/
        })
        .catch((error) => {
            console.log(error);
        });*/


})();