import React from "react";
import {TemplateConfig} from "./index.types.ts";
import {Menu} from "@material-ui/icons";
import {Typography} from "@mui/material";


export const TemplateDefaultConfig : TemplateConfig = {
    toolbar : {
        options : {
            variant : "dense"
        },
        iconButton : {
            sx : { fontSize : 16, color : "black"},
        },
        icon : <Menu/>
    },
    themeOptions : {
      palette : {
        primary : {
          main : "#ffffff"
        }
      }
    },
    layout : {
        Menu : <></>,
        Header : <Typography sx={{ color : "black" }}>Portfolio</Typography>
    },
    children : <></>
}