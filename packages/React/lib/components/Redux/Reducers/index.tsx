import { Reducer,combineReducers, StateFromReducersMapObject,  ActionFromReducer, ReducerFromReducersMapObject, ReducersMapObject } from "@reduxjs/toolkit";

function Reducers<T>(listReducers : T) {
    return combineReducers(listReducers)
}

export default Reducers;
