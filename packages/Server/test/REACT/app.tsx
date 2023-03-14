import React from "react";
import {createRoot} from 'react-dom/client';

let container = document.getElementById('dka');
let DOM = createRoot(container!)
DOM.render(<h1 style={{ color : '#e8780a'}}>Halo</h1>)

