import React, { FC, useEffect, useState } from "react";
import {Box, AppBar, Toolbar, IconButton, Drawer, Typography, CssBaseline, Container} from "@mui/material";
import { ThemeProvider, createTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { Menu } from "@material-ui/icons";
import {TemplateConfig} from "./index.types.ts";
import {TemplateDefaultConfig} from "./index.config.tsx";

const Template : FC<TemplateConfig> = (props) => {

    const [ IsMounted, setIsMounted ] = React.useState(false);
    const [ Props, setProps] = React.useState<TemplateConfig>(TemplateDefaultConfig);


    const Themes = createTheme(props.themeOptions);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    useEffect(() => {
       if (IsMounted){
           setProps({
               ...TemplateDefaultConfig,
               ...props
           });
       }
    },[IsMounted]);

    return (
        <React.Fragment>
            <CssBaseline/>
            <ThemeProvider theme={Themes}>
                <Box component="header">
                    <AppBar position="static">
                        <Toolbar { ... Props.toolbar?.options } sx={{ backgroundColor: "white" }}>
                            <IconButton { ...Props.toolbar?.iconButton}>
                                { (Props.toolbar?.icon !== undefined) ? Props.toolbar.icon : <Menu/> }
                            </IconButton>
                            { (Props.layout?.Header !== undefined) ? Props.layout.Header : <Typography variant="h6" component="div">Header</Typography> }

                        </Toolbar>
                    </AppBar>
                </Box>
                <Box component="nav">
                    <Drawer anchor={"left"} { ... Props.drawer?.options}>
                        <>
                            <Box sx={{ width: 250 }}>
                                { (Props.layout?.Menu !== undefined) ? Props.layout.Menu : <></> }
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

export default Template;