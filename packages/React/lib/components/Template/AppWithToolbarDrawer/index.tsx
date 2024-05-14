import React, { FC, useEffect, useState } from "react";
import {Box, AppBar, Toolbar, IconButton, Drawer, Typography, CssBaseline, Container, PaletteMode} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { Menu } from "@material-ui/icons";
import {AppWithToolbarDrawerConfig} from "./index.types.ts";
import {TemplateDefaultConfig} from "./index.config.tsx";
import DKAThemes from "./Themes/DKAThemes.tsx";
const AppWithToolbarDrawer : FC<AppWithToolbarDrawerConfig> = (props) => {

    /**
     * declare State
     */
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const [ IsMounted, setIsMounted ] = React.useState(false);
    const [ IsDrawerOpen, setIsDrawerOpen ] = React.useState(false);
    /**
     *  Merge Config and Props
     */
    let Props = { ...TemplateDefaultConfig, ...props }
    const Themes = createTheme(DKAThemes(mode));
    const onHandlerClick = () => {
        if (IsMounted){
            setIsDrawerOpen((open) => !open);
        }
    }

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>
            <ThemeProvider theme={Themes}>
                <Box component="header">
                    <AppBar position="static">
                        <Toolbar { ... Props.toolbar?.options }>
                            <IconButton { ...Props.toolbar?.iconButton} onClick={onHandlerClick}>
                                { (Props.toolbar?.icon !== undefined) ? Props.toolbar.icon : <Menu/> }
                            </IconButton>
                            { (Props.toolbar?.layout?.Toolbar !== undefined) ? Props.toolbar.layout.Toolbar : <Typography variant="h6" component="div">Header</Typography> }
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box component="nav">
                    <Drawer anchor={"left"} open={IsDrawerOpen} onClose={onHandlerClick} { ... Props.drawer?.options}>
                        <>
                            <Box { ... Props.drawer?.container }>
                                { (Props.drawer?.layout?.Menu !== undefined) ? Props.drawer.layout.Menu : <></> }
                            </Box>
                        </>
                    </Drawer>
                </Box>
                <Box component="main">
                    <React.Suspense>
                        { (Props.children !== undefined) ? Props.children : <></> }
                    </React.Suspense>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default AppWithToolbarDrawer;