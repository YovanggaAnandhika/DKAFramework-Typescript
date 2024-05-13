import React, {useState, useEffect, useMemo, useContext} from "react";
import {SocketIOProviderProps} from "./index.types.ts";
import {SocketIOStateContext} from "../../Context/SocketIO/SocketIOStateContext.ts";
import {SocketIOInstanceContext} from "../../Context/SocketIO/SocketIOInstanceContext.ts";
import {SocketIOState, SocketIOStates} from "../../Hook/useSocketIOState/index.types.ts";

export function SocketIOProvider(props: SocketIOProviderProps) {

    const [IsMounted, setIsMounted] = useState<boolean>(false);

    const [ SocketState, setSocketState ] = useState<SocketIOState>({
        state: SocketIOStates.IDLE,
        message: "Initialize Socket IO"
    });

    /**
     * Use Is Mounted Circle Activity From React Data Control
     */
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    /**
     * Returning Child Element Data For Provider Socket IO Context
     * @return {JSX.Element}
     */
    return (
        <SocketIOStateContext.Provider value={[SocketState, setSocketState]}>
            <>
                {props.children}
            </>
        </SocketIOStateContext.Provider>
    );
}