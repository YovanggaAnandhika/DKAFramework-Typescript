import path from "path";

(async () => {
    let sqlite3 = require('@journeyapps/sqlcipher').verbose();
    const db = new sqlite3.Database(path.join(__dirname,'./test.db'));
    db.run("PRAGMA cipher_compatibility = 4");
})();


