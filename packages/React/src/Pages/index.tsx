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
            <CrudDataTable endpoint={"http://localhost:5000/base/location/provinces"} view={{
                tableProps : {
                  columns : [
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      },
                      {
                          field: 'name',
                          headerName: 'Unit Layanan',
                      }
                  ]
                },
                isGrants : true
            }}/>
        </>
    )
}

export default Pages