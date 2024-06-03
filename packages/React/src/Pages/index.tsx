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
import Create from "./Component/Create";

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
                endpoint={"http://localhost:5000/data/pasien"}
                create={{ component : Create }}
                view={{
                    requestProps : {
                      timeout : 90 * 1000
                    },
                    tableProps : {
                        columns : [
                      {
                          field: 'id',
                          headerName: 'ID',
                          maxWidth : 100,
                          flex : 1,

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
                edit={{ component : Edit, isGrants : true}}
                delete={{ isGrants : true}}
                options={{
                    useActionMenuOnRow : {
                        enabled : true,
                        settings : {
                            showView : true,
                            showEdit : true,
                            showDelete : true
                        }
                    }
                }}

            />
        </>
    )
}

export default Pages