import Database from "../src";
import * as path from "path";

(async () => {
    let db = Database.Sqlite({
        filename : path.join(__dirname,"test.db"),
        phrasepass : "Cyberhack2010"
    }).CreateTable("test",{
        column : [
            { columnName : "id", typeData : "INTEGER"}
        ]
    }).catch((error) => {
        console.error(error)
    })



})();


