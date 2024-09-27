import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";


/**
 * Model Data Callback
 */
export interface ExampleReducerModelCallback {
    status ?: boolean,
    code ?: number,
    msg ?: string,
    data : Array<any>
}

/**
 * Initialize State
 */
const ExampleReducerInitializeState : Array<{ name : string }> = []

/**
 * Slice For Agama Reducer Instance
 */
const ExampleReducer = createSlice({
    name: "base_generic_agama",
    initialState: ExampleReducerInitializeState,
    reducers: {
        save : (state, action) => {
            return [ ... state, action.payload ];
        },
        deleteAll : (state = []) => {
            return state.slice(0, -1);
        }
    },
});

const { actions, reducer } = ExampleReducer;
export { actions };
export default reducer