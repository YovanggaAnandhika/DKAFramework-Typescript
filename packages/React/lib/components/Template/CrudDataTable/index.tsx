import React, {FC, useEffect, useMemo, useState} from "react";
import {CrudDataTableContext} from "./Context/CrudDataTableContext.tsx";
import View from "./Action/View";
import { Grid } from "@mui/material";
import {CrudDataTableIfaces} from "./Interfaces/CrudDataTable.Ifaces.ts";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import RalewayMedium from "./Font/raleway.medium.ttf";
import CssBaseline from "@mui/material/CssBaseline";


const CrudDataTable : FC<CrudDataTableIfaces> = (props) => {

    const [ IsMounted, setIsMounted] = useState(false);
    const [ Layout, setContainerLayout ] = useState(<></>);

    const ContainerLayout = useMemo(() => Layout, [Layout]);

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

    const theme = createTheme({
        typography: {
            fontFamily: 'Raleway, Arial',
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url(${RalewayMedium}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CrudDataTableContext.Provider value={[ContainerLayout, setContainerLayout]}>
                <Grid item xs={12} md={12} lg={12} sx={{ m : { xs : 1, md : 2, lg : 3 }}}>
                    <React.Suspense  fallback={<div>Loading...</div>}>
                        { ContainerLayout }
                    </React.Suspense>
                </Grid>
            </CrudDataTableContext.Provider>
        </ThemeProvider>

    )
}

export default CrudDataTable;