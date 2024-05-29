import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import { AxiosRequestConfig } from "axios";


export type ColoumnGrid = Array<GridColDef>;

export interface ViewConfigProps {
    tableProps : React.ComponentProps<typeof DataGrid>,
    requestProps : AxiosRequestConfig,
}