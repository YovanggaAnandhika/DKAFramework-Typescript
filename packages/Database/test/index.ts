import Database from "../src";

(async () => {
    let db = await new Database.MariaDB({
        host : "dkaserver.my.id",
        user : "developer",
        password : "Cyberhack2010",
        database : "dka_product_parking"
    });

    db.Baca(``, {
        search : {
            coloumName : "nama",

        }
    })
})();


