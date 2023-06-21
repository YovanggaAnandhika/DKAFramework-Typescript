import Database, {Firestore, MariaDB, MongoDB} from "./../src";
import { v5 as uidv5, v4 as uidv4, v3 as uidv3, v1 as uidv1 } from "uuid"

(() => {

    /** **/
    let db = new MariaDB({
        user : "developer",
        password : "Cyberhack2010",
        database : "dka",
        checkDuplicate : false
    });


    db.Select(`dka-developer_apps`, {
        as : `apps`,
        join : {
            mode : "INNER",
            as : `account`,
            TableName : `dka-developer_account`,
            on : {
                collNameFirst : {
                    tableAlias : `account`,
                    collName : `id_developer_account`,
                },
                collNameSecond : {
                    tableAlias : `apps`,
                    collName : `id_developer_account`
                }
            },
            search : { coloumName : `secret_id`, data : `18923675-0ccf-5dee-85f3-85ec32975cdb`, conditionFromParents : "AND"}
        },
        search : { coloumName : `secret_key`, data : `118b6f3c-093e-5688-a677-aa4f68577267`}
    }).then(async (res) => {
        console.log(res)
    }).catch(async (error) => {
        console.log(error)
    })




})();


