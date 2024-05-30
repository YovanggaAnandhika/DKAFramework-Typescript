import * as React from "react";
import {FC, useEffect} from "react";
import {
    AppWithToolbarDrawer,
    useWindowSize,
    useSocketIOState,
    SocketIOStates,
    useSocketIOConnector, SignInSide, NumberFormat, CrudDataTable,
} from "../../lib";
import Box from "@mui/material/Box";
import Edit from "./Component/Edit";

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
            <CrudDataTable
                endpoint={"http://api.clinic.syncmed.co.id/data/pasien"}
                view={{
                    tableProps : {
                        columns : [
                      {
                          field: 'id',
                          headerName: 'ID',
                          maxWidth : 100,
                          flex : 1
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                          flex : 1
                      }
                  ]
                    },
                    isGrants : true
                }}
                edit={{ component : Edit}}
                delete={{ isGrants : true}}/>
        </>
    )
}

export default Pages