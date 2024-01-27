import MariaDB from "./MariaDB";
import FireStore from "./Firestore";
import MongoDB from "./MongoDB";
import Sqlite from "./Sqlite";

const Database = {
    MariaDB : MariaDB,
    Sqlite : Sqlite,
    Firestore : FireStore,
    MongoDB : MongoDB
};

export default Database;
