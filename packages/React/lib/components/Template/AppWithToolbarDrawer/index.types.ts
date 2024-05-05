import {ToolbarProps, IconButtonProps, BoxProps, DrawerProps} from "@mui/material";
import { ThemeOptions } from '@material-ui/core/styles';
import React from "react";


export interface AppWithToolbarDrawerConfigLayoutDrawer {
    Menu ?: React.JSX.Element
}

export interface AppWithToolbarDrawerConfigLayoutToolbar {
    Toolbar ?: React.JSX.Element
}

export interface AppWithToolbarDrawerConfigToolbar {
    options ?: ToolbarProps,
    iconButton ?: IconButtonProps,
    icon ?: React.JSX.Element,
    layout ?: AppWithToolbarDrawerConfigLayoutToolbar
}

export interface AppWithToolbarDrawerConfigDrawer {
    options ?: DrawerProps,
    container ?: BoxProps,
    layout ?: AppWithToolbarDrawerConfigLayoutDrawer
}

export interface AppWithToolbarDrawerConfig {
    themeOptions ?: ThemeOptions;
    toolbar ?: AppWithToolbarDrawerConfigToolbar;
    drawer ?: AppWithToolbarDrawerConfigDrawer;
    children ?: React.JSX.Element
}