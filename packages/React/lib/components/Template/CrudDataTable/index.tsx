import React, {FC, useEffect, useState} from "react";
import {CrudDataTableContext} from "./Context/CrudDataTableContext.tsx";
import View from "./Action/View";
import { Grid } from "@mui/material";
import {CrudDataTableIfaces} from "./Interfaces/CrudDataTable.Ifaces.ts";


const CrudDataTable : FC<CrudDataTableIfaces> = (props) => {

    const [ IsMounted, setIsMounted] = useState(false);
    const [ ContainerLayout, setContainerLayout ] = useState(<></>);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    },[]);

    useEffect(() => {
        if (IsMounted){
            setContainerLayout(<View {... props}/>);
        }
    },[IsMounted, props]);

    return (
        <CrudDataTableContext.Provider value={[ContainerLayout, setContainerLayout]}>
            <Grid item xs={12} md={12} lg={12} sx={{ m : { xs : 1, md : 2, lg : 3 }}}>
                <React.Suspense  fallback={<div>Loading...</div>}>
                    { ContainerLayout }
                </React.Suspense>
            </Grid>
        </CrudDataTableContext.Provider>
    )
}

export default CrudDataTable;