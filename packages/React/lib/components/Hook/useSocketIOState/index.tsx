import {useContext, useMemo} from "react";
import {SocketIOState} from "./index.types.ts";
import {SocketIOStateContext} from "../../Context/SocketIO/SocketIOStateContext.ts";


export function useSocketIOState() : SocketIOState {

    const [ state ] = useContext(SocketIOStateContext);

    return useMemo(() => state, [state]);
}