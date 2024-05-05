import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getDatabase, Database, ref, set, push, DatabaseReference, get, remove, ThenableReference } from "firebase/database";
import {DKAFirebaseDatabaseConfigConstructor} from "./Config/DKAFirebaseDatabaseConfigConstructor";

export class FirebaseDatabase {

    private get Database(): Database | undefined {
        return this._Database;
    }

    private set Database(value: Database | undefined) {
        this._Database = value;
    }

    private get app(): firebase.app.App | undefined {
        return this._app;
    }

    private set app(value: firebase.app.App | undefined) {
        this._app = value;
    }

    private _app : firebase.app.App | undefined
    private _Database : Database | undefined;

    constructor(config : DKAFirebaseDatabaseConfigConstructor) {

        let mConfig : DKAFirebaseDatabaseConfigConstructor | undefined = config;

        if (mConfig.name === undefined) {
            this.app = firebase.initializeApp(mConfig.credentials);
            this.Database = getDatabase(this.app)
        }else{
            this.app = firebase.initializeApp(mConfig.credentials, mConfig?.name)
            this.Database = getDatabase(this.app)
        }

    }

    get(path : string) : Promise<any> {
        return new Promise((resolve, rejected) => {
            if (this.Database === undefined) return rejected(new Error("Database is undefined"))
            let reef = ref(this.Database, path);
            get(reef)
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    rejected(error)
                });
        });
    }
    push(path : string, data : any) : Promise<ThenableReference> {
        return new Promise(async (resolve, rejected) => {
            if (this.Database === undefined) return rejected(new Error("Database is undefined"))
            let reef = ref(this.Database, path);
            const dataPush = push(reef, data);
            resolve(dataPush)
        });
    }

    remove(path : string) : Promise<void> {
        return new Promise((resolve, rejected) => {
            if (this.Database === undefined) return rejected(new Error("Database is undefined"))
            let reef = ref(this.Database, path);
            remove(reef)
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    rejected(error)
                })
        })
    }

}

export default FirebaseDatabase