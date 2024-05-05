import { v4, v5} from "uuid";
import { MariaDB, Firebase } from "../src";
import * as fs from "fs";
import * as path from "path";
// @ts-ignore
import moment from "moment-timezone";

(async () => {

    const firebaseConfig = {
        apiKey: "AIzaSyBAlZaRBXUR-30us8PMEQ_UrB9Yscwto9g",
        authDomain: "dkacoreapis.firebaseapp.com",
        databaseURL: "https://dkacoreapis-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "dkacoreapis",
        storageBucket: "dkacoreapis.appspot.com",
        messagingSenderId: "166768200815",
        appId: "1:166768200815:web:7a2f152d2a4d7e3831519a",
        measurementId: "G-CLMMKJ6T7M"
    };

    let firestore = new Firebase.Database({
        name : "default",
        credentials : firebaseConfig
    })

    let mariaDB = new MariaDB({
        host: "127.0.0.1",
        user: "developer",
        password: "Cyberhack2010",
        database: "geo_indonesia"
    });

    //const provinces = firestore.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("PROVINCES");
    //const regencies = firestore.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("REGENCIES");
    //const districts = firestore.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("DISTRICTS");
    //const villages = firestore.collection("BASE").doc("GEO_ADMINISTRATIVE").collection("VILLAGES");

    firestore.remove("/BASE/GEO_ADMINISTRATIVE/VILLAGES");
    /*mariaDB.Select(`villages`)
        .then(async (response) => {
            let DataVillages : any = {};
            await response.data.forEach((data) => {
                DataVillages[v4()] = data;
            });
            await fs.writeFileSync(path.join(__dirname, "villages.json"), JSON.stringify(DataVillages, null, 2), "utf-8");
            console.log("selesai")
        })
        .catch((error) => {
            console.error(error)
        })*/



})();


