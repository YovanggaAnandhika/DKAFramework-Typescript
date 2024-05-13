import React, {createContext} from "react";
import io, { Socket } from "socket.io-client";
import {SocketIOStateCallback, SocketIOStates} from "../../Hook/useSocketIOState/index.types.ts";
import {DefaultEventsMap} from "@socket.io/component-emitter";

export type mSocketType = Socket<DefaultEventsMap, DefaultEventsMap>;

export type SocketIOInstanceContextType = [
    mSocketType,
    React.Dispatch<React.SetStateAction<mSocketType>>
]

// @ts-ignore
export const SocketIOInstanceContext = createContext<SocketIOInstanceContextType>();