import React from "react";
import {createRoot} from 'react-dom/client';


let Default = React.lazy(() => import("./Routes/Default"));

let container = document.getElementById('dka');
let DOM = createRoot(container!)
DOM.render(<Default/>)