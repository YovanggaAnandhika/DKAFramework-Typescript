import React, {createContext} from "react";

export type CrudDataTableContextArray  = [
    React.JSX.Element,
    React.Dispatch<React.SetStateAction<React.JSX.Element>>
]

export const CrudDataTableContext = createContext<CrudDataTableContextArray>([
    <></>,
    () => null
]);