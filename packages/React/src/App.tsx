import { StrictMode } from "react";
import Pages from "./Pages";
import {Redux, Reducers, ReduxProvider, SocketIOProvider, AppWithToolbarDrawer} from "../lib";
import {Model} from "./Model";
import Paper from "@mui/material/Paper";

function App() {
    const DaftarReducers = Reducers<typeof Model>(Model);
    return (
        <>
            <Pages/>
        </>
    )
}

export default App
