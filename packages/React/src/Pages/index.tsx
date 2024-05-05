import * as React from "react";
import { useEffect, useState, FC } from "react";
import {
    GeoAdministrative,
    AppWithToolbarDrawer,
    useSelector,
    useDispatch,
    GeoAdministrativeConfig,
    GeoAdministrativeType
} from "../../lib";
import {Typography, Button } from "@mui/material";
import {actions} from "../Reducer/ExampleReducer";
import {Model} from "../Model";

const Pages : FC = () =>{

    const [IsMounted, setIsMounted] = React.useState(false);

    const Example = useSelector<typeof Model>(state => state.example);
    const Dispatch = useDispatch();

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    });

    useEffect(() => {
        console.log(JSON.stringify(Example))
    }, [Example]);

    useEffect(() => {
        if (IsMounted){
            Dispatch(actions.save("test"))
        }
    },[ Dispatch, IsMounted]);

    return (
        <>
            <AppWithToolbarDrawer>
                <GeoAdministrative onChange={(data) => {
                    console.log(data)
                }}/>
                <Button onClick={() => {
                    Dispatch(actions.save("test"))
                }}>Save</Button>
                <Button onClick={() => Dispatch(actions.deleteAll())}>Delete</Button>
            </AppWithToolbarDrawer>
        </>
    )
}

export default Pages