import Database, {Firestore, MariaDB, MongoDB} from "./../src";
import { v5 as uidv5, v4 as uidv4, v3 as uidv3, v1 as uidv1 } from "uuid"

(() => {

    /** **/
    let db = new MariaDB({
        user : "developer",
        password : "Cyberhack2010",
        database : "dka"
    });


    let uid = uidv5(Date.now().toString(), uidv5.URL);
    db.Insert(`dka-user_login`, {
        data : {
            id_user_login : uid,
            username : "hendra",
            password : "agustriawan"
        }
    }).then(async (res) => {
        db.Insert(`dka-user_login_personal_info`, {
            data : {
                id_user_login_info : uidv5(Date.now().toString(), uid),
                id_user_login : uid,
                first_name : "Yovangga",
                last_name : "anandhika"
            }
        }).then(async (res) => {
            console.log(res)
        }).catch(async (error) => {
            console.error(error)
        })
    }).catch(async (error) => {
        console.error(error)
    })




})();


