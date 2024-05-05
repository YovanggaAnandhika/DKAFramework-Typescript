import React from "react";
import {AppWithToolbarDrawerConfig} from "./index.types.ts";
import {Menu} from "@material-ui/icons";
import {Typography} from "@mui/material";


export const TemplateDefaultConfig : AppWithToolbarDrawerConfig = {
    toolbar : {
        options : {
            variant : "dense"
        },
        iconButton : {
            sx : { fontSize : 16, color : "black"},
        },
        icon : <Menu/>,
        layout : {
            Toolbar : <Typography sx={{ color : "black" }}>Portfolio</Typography>
        }
    },
    themeOptions : {
      palette : {
        primary : {
          main : "#ffffff"
        }
      }
    },
    drawer : {
        container : {
            width : 250
        },
        layout : {
            Menu : <></>,
        }
    },
    children : <></>
}