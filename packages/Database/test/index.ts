import { MongoClient } from "mongodb";
import * as path from "path";

(async () => {

    let mariaDB = new MongoClient("mongodb://developer:Cyberhack2010@goparkingdaya.sytes.net:62711");

    const db = mariaDB.db("dka_parking")
    const tra = db.collection("dka_parking_data_transaction")

    const data = tra.aggregate([
        {
            "$group": {
                "_id": "$transaction.ticket.data",
                "uniqueIds": { "$addToSet": "$_id" },
                "count": { "$sum": 1 }
            }
        },
        {
            "$match": {
                "count": { "$gt": 1 }
            }
        }
    ]).forEach(function(doc) {
        doc.uniqueIds.shift(); // Menghapus ID unik pertama (menyisakan satu dokumen)
        tra.deleteMany({ _id: { $in: doc.uniqueIds } });
    });

})();


