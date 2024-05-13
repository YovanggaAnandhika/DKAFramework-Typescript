import { MariaDB, FireStore, Redis } from "../src";
import * as path from "path";

(async () => {

    let mariaDB = new MariaDB();

    mariaDB.Baca(`test`,{
        limit : 1
    }).then((response) => {

    })

})();


