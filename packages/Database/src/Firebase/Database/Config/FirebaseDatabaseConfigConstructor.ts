import {FirebaseAppSettings, FirebaseOptions} from "firebase/app";

/*export interface FirebaseConfigConstructorConfiguration extends FirebaseOptions {
    apiKey ?: string | undefined,
    authDomain ?: string | undefined,
    databaseURL ?: string | undefined,
    projectId ?: string | undefined,
    storageBucket ?: string | undefined,
    messagingSenderId ?: string | undefined,
    appId ?: string | undefined
}*/
export interface FirebaseConfigDatabaseConstructorConfiguration extends FirebaseOptions, FirebaseAppSettings {
    apiKey ?: string | undefined,
    authDomain ?: string | undefined,
    databaseURL ?: string | undefined,
    projectId ?: string | undefined,
    storageBucket ?: string | undefined,
    messagingSenderId ?: string | undefined,
    appId ?: string | undefined
}