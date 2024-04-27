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

export { MariaDB, Sqlite, FireStore, MongoDB};
export default Database;
