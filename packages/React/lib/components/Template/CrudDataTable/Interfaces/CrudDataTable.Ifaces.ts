import React, {FC} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {AxiosRequestConfig} from "axios";


export interface ViewConfigProps {
    tableProps ?: React.ComponentProps<typeof DataGrid>,
    requestProps ?: AxiosRequestConfig,
    isGrants ?: boolean
}

export interface DeleteConfigProps {
    isGrants ?: boolean
}

export interface EditConfigPropsConfigurator {
    data : any,
    callback ?: (data : any) => void | undefined;
}

export interface EditConfigProps {
    component ?: FC<EditConfigPropsConfigurator>;
    requestProps ?: AxiosRequestConfig,
    isGrants ?: boolean;
}


export interface CreateConfigPropsConfigurator {
    callback ?: (data : any) => void | undefined;
}

export interface CreateConfigProps {
    component ?: FC<CreateConfigPropsConfigurator>;
    requestProps ?: AxiosRequestConfig,
    isGrants ?: boolean;
}

export interface CrudDataTableIfaces {
    endpoint ?: string,
    title ?: string,
    create ?: CreateConfigProps,
    view ?: ViewConfigProps,
    edit ?: EditConfigProps,
    delete ?: DeleteConfigProps
}