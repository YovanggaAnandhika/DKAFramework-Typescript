import * as React from "react";
import { createRoot } from "react-dom/client";
import Apps from "./Apps";

// Render your React component instead
// @ts-ignore
const root = createRoot(document.getElementById('dka'));
root.render(<Apps/>);