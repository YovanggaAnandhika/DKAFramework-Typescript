import {ToolbarProps, IconButtonProps, SvgIconTypeMap, DrawerProps} from "@mui/material";
import { ThemeOptions } from '@material-ui/core/styles';
import { } from "@material-ui/icons";
import React from "react";


export interface TemplateConfigLayout {
    Menu ?: React.JSX.Element,
    Header ?: React.JSX.Element
}

export interface TemplateConfigToolbar {
    options ?: ToolbarProps,
    iconButton ?: IconButtonProps,
    icon : React.JSX.Element
}

export interface TemplateConfigDrawer {
    options ?: DrawerProps
}

export interface TemplateConfig {
    themeOptions ?: ThemeOptions;
    toolbar ?: TemplateConfigToolbar;
    drawer ?: TemplateConfigDrawer;
    layout ?: TemplateConfigLayout;
    children ?: React.JSX.Element
}