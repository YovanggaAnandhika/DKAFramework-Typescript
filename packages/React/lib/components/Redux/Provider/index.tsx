import React from "react";
import { Provider as ProviderStore } from "react-redux";
import { Reducer,combineReducers, StateFromReducersMapObject,  ActionFromReducer, ReducerFromReducersMapObject, ReducersMapObject } from "@reduxjs/toolkit";
import Store from "../Store";

export type ProviderReducer = Reducer;

export interface ProviderProps {
    reducers : ProviderReducer,
    children : React.JSX.Element
}
export function Provider<T extends ProviderProps>(props : T) {
    const mStore = Store<Reducer>(props.reducers);
    return (
        <>
            <ProviderStore store={mStore}>
                { props.children }
            </ProviderStore>
        </>
    )
}

export default Provider