import React from "react";
import {AppWithToolbarDrawerConfig} from "./index.types.ts";
import {Menu} from "@material-ui/icons";
import {Container, Typography} from "@mui/material";


export const TemplateDefaultConfig : AppWithToolbarDrawerConfig = {
    toolbar : {
        options : {
            variant : "dense"
        },
        iconButton : {
            sx : { fontSize : 16 },
        },
        icon : <Menu/>,
        layout : {
            Toolbar : <Typography>Portfolio</Typography>
        }
    },
    themeOptions : {

    },
    drawer : {
        container : {
            width : 250
        },
        layout : {
            Menu : <></>,
        }
    },
    children : <Container></Container>
}