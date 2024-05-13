import React, {createContext} from "react";
import {SocketIOState, SocketIOStates} from "../../Hook/useSocketIOState/index.types.ts";


export type SocketIOStateContextType = [
    SocketIOState,
    React.Dispatch<React.SetStateAction<SocketIOState>>
]

export const SocketIOStateContext = createContext<SocketIOStateContextType>([{
    state: SocketIOStates.IDLE,
    message: "Initialize Socket IO"
}, () => undefined]);