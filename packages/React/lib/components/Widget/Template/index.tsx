import React, { FC, useEffect, useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Drawer, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { Menu } from "@material-ui/icons";
import {TemplateConfig} from "./index.types.ts";
import {merge} from "lodash";
import {TemplateDefaultConfig} from "./index.config.tsx";

const Template : FC<TemplateConfig> = (props) => {

    const [ IsMounted, setIsMounted ] = useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [ Themes, setThemes ] = React.useState<Theme>(createTheme());
    const [ Props, setProps] = React.useState<TemplateConfig>(merge(TemplateDefaultConfig, props));

    useEffect(() => {
        setThemes(createTheme(props.themeOptions));
    },[Props]);

    return (
        <>
            <CssBaseline/>
            <ThemeProvider theme={Themes}>
                <Box component="nav">
                    <AppBar position="static">
                        <Toolbar { ... Props.toolbar?.options } sx={{ backgroundColor: "white" }}>
                            <IconButton onClick={() => { setOpen(!open) }} sx={{ fontSize : 16, color : "black"}}>
                                <Menu style={{ fontSize : 10}}/>
                            </IconButton>
                            <Typography sx={{ color : "black" }}>Portfolio</Typography>
                            <Drawer open={open} anchor={"left"} onClose={() => { setOpen(!open) }}>
                                <>
                                    <Box sx={{ width: 250 }}>
                                        { (Props.layout?.menu !== undefined) ? Props.layout.menu : <></> }
                                    </Box>
                                </>
                            </Drawer>
                        </Toolbar>
                    </AppBar>
                    <Box component="main">

                    </Box>
                </Box>
            </ThemeProvider>;
        </>
    )
}

export default Template;