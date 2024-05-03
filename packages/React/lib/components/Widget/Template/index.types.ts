import { ToolbarProps } from "@mui/material";
import { ThemeOptions } from '@material-ui/core/styles';
import React from "react";


export interface TemplateConfigLayout {
    menu ?: React.JSX.Element
}

export interface TemplateConfigToolbar {
    options ?: ToolbarProps
}

export interface TemplateConfig {
    themeOptions ?: ThemeOptions;
    toolbar ?: TemplateConfigToolbar;
    layout ?: TemplateConfigLayout;
}