import React, {FunctionComponent, ReactNode} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {SchemaReactArray, SchemaReactSingle} from "../../../Type/types";


const DKARouter: FunctionComponent<{ schema: SchemaReactArray }> = (props) => {
    function register(route: SchemaReactSingle): ReactNode {
        if (route.children !== undefined) {
            return (
                <Route path={route.path}>
                    <Route index element={route.component}/>
                    {route.children.map((route) => {
                        return register(route)
                    })}
                </Route>
            )
        } else {
            if (route.index !== undefined) {
                return <Route index path={route.path} element={route.component}/>
            } else {
                return <Route path={route.path} element={route.component}/>
            }
        }
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {props.schema.map((route) => {
                        return register(route)
                    })}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default DKARouter;