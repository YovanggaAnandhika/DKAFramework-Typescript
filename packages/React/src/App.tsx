import { StrictMode } from "react";
import Pages from "./Pages";
import {Redux, Reducers, ReduxProvider, SocketIOProvider} from "../lib";
import {Model} from "./Model";

function App() {
    const DaftarReducers = Reducers<typeof Model>(Model);
    return (
        <>
            <ReduxProvider reducers={DaftarReducers} >
                <SocketIOProvider>
                    <Pages/>
                </SocketIOProvider>
            </ReduxProvider>
        </>
    )
}

export default App
