import Database from "../src";
import * as path from "path";

(async () => {
    let db = Database.Sqlite({
        filename : path.join(__dirname,"test.db"),
        phrasepass : "Cyberhack2010"
    });

    db.Insert(`tes`,{
        data : {
            id : 1,
            name : "aku"
        }
    }).then((data) => {
        console.log(data);
        db.close();
    }).catch((error) => {
        console.error(error);
        db.close();
    })

})();


