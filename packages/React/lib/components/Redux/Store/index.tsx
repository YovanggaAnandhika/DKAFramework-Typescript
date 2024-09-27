import {configureStore, Reducer, Store as ReduxStore, EnhancedStore, combineReducers } from "@reduxjs/toolkit";
export function Store<T extends Reducer>(reducer : T) {
    return configureStore({
        reducer : reducer
    })
}

export default Store;

