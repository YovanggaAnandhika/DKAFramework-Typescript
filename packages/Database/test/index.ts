import Database, {Firestore, MariaDB, MongoDB} from "./../src";
import { v5 as uidv5, v4 as uidv4, v3 as uidv3, v1 as uidv1 } from "uuid"

(() => {

    /** **/
    let db = new MariaDB({
        user : "developer",
        password : "Cyberhack2010",
        database : "dka"
    });


    db.Select(`dka-developer_apps`, {
        as : `apps`,
        column : [
            { name : `secret_key`, as : `client_secret`}
        ],
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
            }
        }
    }).then(async (res) => {
        console.log(res)
    }).catch(async (error) => {
        console.log(error)
    })




})();


