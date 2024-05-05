import Pages from "./Pages";
import { Redux, Reducers, Provider } from "../lib";
import {Model} from "./Model";
function App() {
    const DaftarReducers = Reducers<typeof Model>(Model);
    return (
        <>
            <Provider reducers={DaftarReducers} >
                <Pages/>
            </Provider>

        </>
    )
}

export default App
