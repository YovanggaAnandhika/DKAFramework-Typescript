import Database from "../src";
import * as path from "path";

(async () => {
    let db = new Database.MariaDB();


    db.Insert(`test`, {
        column : [
            "id_user",
            "nama"
        ],
        data : [
            {
                hai : 1,
                nama : "dhika"
            },
            {
                hai : 2,
                nama : "tina"
            }
        ]
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.error(error)
    })

})();


