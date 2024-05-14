import * as React from "react";
import {FC, useEffect} from "react";
import {
    AppWithToolbarDrawer,
    useWindowSize,
    useSocketIOState,
    SocketIOStates,
    useSocketIOConnector, SignInSide,
} from "../../lib";
import Box from "@mui/material/Box";

const Pages : FC = () =>{

    const [IsMounted, setIsMounted] = React.useState(false);
    const [ witdh, height ] = useWindowSize();

    const state = useSocketIOState();

    const socket = useSocketIOConnector({ host : "127.0.0.1", port : 53333 });

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    });

    /**
     * Function For Effect Simulation Data On Controllable
     */
    useEffect(() => {
        if (IsMounted){
            socket.emit("test", "halo")
        }
    },[IsMounted]);

    return (
        <>
            <SignInSide/>
        </>
    )
}

export default Pages