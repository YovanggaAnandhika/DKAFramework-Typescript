import Firestore from "./Firestore";
import FirebaseDatabase from "./Database";

const Firebase = {
    Firestore : Firestore,
    Database : FirebaseDatabase
};

export { Firebase, FirebaseDatabase as Database }
export default Firebase;