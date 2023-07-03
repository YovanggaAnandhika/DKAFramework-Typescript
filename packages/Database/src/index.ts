export {default as MariaDB} from "./MariaDB"
export { default as MongoDB } from "./MongoDB";
export { default as Firestore } from "./Firestore";
export { default as Sqlite } from "./Sqlite";

import MariaDB from "./MariaDB";
import FireStore from "./Firestore";
import MongoDB from "./MongoDB";
import Sqlite from "./Sqlite";

const Database = {
    MariaDB : MariaDB,
    Firestore : FireStore,
    MongoDB : MongoDB,
    Sqlite : Sqlite
};
export default Database;
