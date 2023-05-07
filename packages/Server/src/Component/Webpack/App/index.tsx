import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";

const rootElement = document.getElementById("dka");
// @ts-ignore
const root = createRoot(rootElement);

const HelloWorld = React.lazy(() =>  import("./Pages/HelloWorld"))

root.render(
    <StrictMode>
        <HelloWorld/>
    </StrictMode>
);