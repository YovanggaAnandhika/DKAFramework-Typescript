import * as React from "react";
import {FC, useEffect} from "react";
import {
    AppWithToolbarDrawer,
    useWindowSize,
    useSocketIOState,
    SocketIOStates,
    useSocketIOConnector, SignInSide, NumberFormat,
} from "../../lib";
import Box from "@mui/material/Box";

const Pages : FC = () =>{

    const [IsMounted, setIsMounted] = React.useState(false);
    const [ witdh, height ] = useWindowSize();
    const [ Value, setValue ] = React.useState("");

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    });

    useEffect(() => {
        if (IsMounted){
            console.log("dka", Value)
        }
    },[IsMounted, Value])
    return (
        <>
            <NumberFormat
                onChange={(event, value) => {
                    setValue(value)
                }}
            />
        </>
    )
}

export default Pages