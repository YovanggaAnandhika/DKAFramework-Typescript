import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {DKAFirebaseConfigConstructor} from "./Config/DKAFirebaseConfigConstructor";

export class FireStore {

    private get Firestore(): firebase.firestore.Firestore | undefined {
        return this._Firestore;
    }

    private set Firestore(value: firebase.firestore.Firestore | undefined) {
        this._Firestore = value;
    }

    private get app(): firebase.app.App | undefined {
        return this._app;
    }

    private set app(value: firebase.app.App | undefined) {
        this._app = value;
    }

    private _app : firebase.app.App | undefined
    private _Firestore : firebase.firestore.Firestore | undefined;

    constructor(config : DKAFirebaseConfigConstructor) {

        let mConfig : DKAFirebaseConfigConstructor | undefined = config;

        if (mConfig.name === undefined) {
            this.app = firebase.initializeApp(mConfig.credentials);
            this.Firestore = firebase.firestore(this.app)
        }else{
            this.app = firebase.initializeApp(mConfig.credentials, mConfig?.name)
            this.Firestore = firebase.firestore(this.app)
        }
    }

    collection(collectionPath : string) : firebase.firestore.CollectionReference<firebase.firestore.DocumentData>  {
        if (collectionPath === undefined || collectionPath === "" ) throw Error("collection path cannot Empty")
        return this.Firestore?.collection(collectionPath)!;
    }

}

export default FireStore