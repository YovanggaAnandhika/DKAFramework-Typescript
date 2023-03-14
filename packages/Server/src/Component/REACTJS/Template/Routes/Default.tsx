import React, {FunctionComponent} from "react";
import DKARouter from "../../Router";
import {SchemaReactArray} from "../../../../Type/types";
import Hello from "./Hello";

const Schema: SchemaReactArray = [
    {
        name: 1,
        index: true,
        path: "/",
        component: <Hello/>
    }
]

const Default: FunctionComponent = (props: any) => {
    return (
        <>
            <DKARouter schema={Schema}/>
        </>
    );
}

export default Default;