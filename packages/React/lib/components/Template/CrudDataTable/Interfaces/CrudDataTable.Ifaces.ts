import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {AxiosRequestConfig} from "axios";


export interface ViewConfigProps {
    tableProps ?: React.ComponentProps<typeof DataGrid>,
    requestProps ?: AxiosRequestConfig,
    isGrants ?: boolean
}

export interface CrudDataTableIfaces {
    endpoint ?: string,
    view : ViewConfigProps
}