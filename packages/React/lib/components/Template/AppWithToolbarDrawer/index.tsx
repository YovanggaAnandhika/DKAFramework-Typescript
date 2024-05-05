import React, { FC, useEffect, useState } from "react";
import {Box, AppBar, Toolbar, IconButton, Drawer, Typography, CssBaseline, Container} from "@mui/material";
import { ThemeProvider, createTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { Menu } from "@material-ui/icons";
import {AppWithToolbarDrawerConfig} from "./index.types.ts";
import {TemplateDefaultConfig} from "./index.config.tsx";

const AppWithToolbarDrawer : FC<AppWithToolbarDrawerConfig> = (props) => {

    /**
     * declare State
     */
    const [ IsMounted, setIsMounted ] = React.useState(false);
    const [ IsDrawerOpen, setIsDrawerOpen ] = React.useState(false);
    /**
     *  Merge Config and Props
     */
    let Props = { ...TemplateDefaultConfig, ...props }
    const Themes = createTheme(props.themeOptions);
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
                        <Toolbar { ... Props.toolbar?.options } sx={{ backgroundColor: "white" }}>
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
                    { (Props.children !== undefined) ? Props.children : <></> }
                </Box>
            </ThemeProvider>;
        </React.Fragment>
    )
}

export default AppWithToolbarDrawer;