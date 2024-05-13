import {useContext, useEffect, useMemo, useState} from "react";
import io, {ManagerOptions, Socket, SocketOptions} from "socket.io-client";
import {SocketIOConnectorCallback} from "./index.types.ts";
import {SocketIOConfigDefault} from "./index.config.ts";
import _ from "lodash";
import {SocketIOStates} from "../useSocketIOState/index.types.ts";
import {SocketIOStateContext} from "../../Context/SocketIO/SocketIOStateContext.ts";


export interface SocketIOConfig {
    host ?: string;
    port ?: number;
    settings ?: Partial<ManagerOptions & SocketOptions> | undefined;
}
export function useSocketIOConnector(props : SocketIOConfig = SocketIOConfigDefault) : SocketIOConnectorCallback {

    /**
     * Is Mounted Circle Activity
     */
    const [IsMounted, setIsMounted] = useState<boolean>(false);


    const [ state, setState ] = useContext(SocketIOStateContext);
    /**
     * Mergering Configuration Data Control On Props
     */
    props = _.merge(SocketIOConfigDefault, props);
    /**
     * Check Secure URL Server Data Config
     */
    const protocol = (props.settings?.secure !== undefined && props.settings?.secure) ? "https://" : "http://";

    /**
     * IO Data Host Logic Url backend data control On The Routes
     */
    const [ SocketIO ] = useState<Socket>(io(`${protocol}${props.host}:${props.port}`, props.settings));

    /**
     * Use Is Mounted Circle Activity From React Data Control
     */
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    useEffect(() => {
        if (IsMounted && SocketIO) {

            /**
             * Controllable Connection Connect Error The Data Connect Data
             */
            SocketIO.on("connect", () => {
                setState(prevState => {
                    return {
                        ...prevState,
                        state: SocketIOStates.ON_CONNECT,
                        message: "Connected"
                    };
                });
            });
            /**
             * Event For Connection Connect Error From The Server Data Controllable
             */
            SocketIO.on("connect_error", (error) => {
                setState(prevState => {
                    return {
                        ...prevState,
                        state: SocketIOStates.ON_CONNECT_ERROR,
                        message: error
                    };
                });
            });
            /**
             * On Disconnected Server Data;
             */
            SocketIO.on("disconnect", () => {
                setState(prevState => {
                    return {
                        ...prevState,
                        state: SocketIOStates.ON_DISCONNECT,
                        message: "Disconnected"
                    };
                });
            });
            if (!props.settings?.autoConnect && !SocketIO.connected) SocketIO.connect();
        }
    }, [IsMounted, SocketIO]);

    return useMemo(() => SocketIO, [SocketIO]);
}