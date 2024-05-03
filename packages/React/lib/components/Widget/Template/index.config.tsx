import React from "react";
import {TemplateConfig} from "./index.types.ts";


export const TemplateDefaultConfig : TemplateConfig = {
    toolbar : {
        options : {
            variant : "dense"
        }
    },
    themeOptions : {
      palette : {
        primary : {
          main : "#ffffff"
        }
      }
    },
    layout : {
        menu : <></>
    }
}