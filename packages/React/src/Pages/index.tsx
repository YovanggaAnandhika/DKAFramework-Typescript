import * as React from "react";
import { useEffect, useState, FC } from "react";
import {
    GeoAdministrative,
    AppWithToolbarDrawer,
    useSelector,
    useDispatch,
    GeoAdministrativeConfig,
    GeoAdministrativeType, StepperLayout, StepperLayoutItem
} from "../../lib";
import {Typography, Button } from "@mui/material";
import {actions} from "../Reducer/ExampleReducer";
import {Model} from "../Model";
import SettingsIcon from "@mui/icons-material/Settings";

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

    const Items : StepperLayoutItem = [
        {
            title : "Step 1",
            icon : <SettingsIcon />,
            children : (
                <>
                    <GeoAdministrative/>
                </>
            ),
            onNext : () => {
                console.log("next 1")
            },
        },
        {
            title : "Step 1",
            icon : <SettingsIcon />,
            children : <></>,
            onNext : () => {
                console.log("next 2")
            },
            onBack : () => {
                console.log("back")
            }
        },
        {
            title : "Step 1",
            icon : <SettingsIcon />,
            children : (
                <>
                    <GeoAdministrative/>
                </>
            )
        },
        {
            title : "Step 1",
            icon : <SettingsIcon />,
            children : <></>
        },
        {
            title : "Step 1",
            icon : <SettingsIcon />,
            children : <></>
        }
    ]
    return (
        <>
            <AppWithToolbarDrawer>
                <StepperLayout item={Items} onFinish={() => {

                }}/>
            </AppWithToolbarDrawer>
        </>
    )
}

export default Pages