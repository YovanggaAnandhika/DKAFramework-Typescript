import React, {FC} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {AxiosRequestConfig} from "axios";



export interface ViewConfigProps {
    tableProps ?: React.ComponentProps<typeof DataGrid>,
    requestProps ?: AxiosRequestConfig,
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

export interface DeleteConfigPropsConfigurator {
    data : any,
    callback ?: (data : any) => void | undefined;
}

export interface DeleteConfigProps {
    component ?: FC<DeleteConfigPropsConfigurator>;
    requestProps ?: AxiosRequestConfig,
    isGrants ?: boolean;
}

export interface CrudDataTableIfacesOptionsUseActionMenuOnRowSettings {
    showView ?: boolean,
    showEdit ?: boolean,
    showDelete ?: boolean
}

export interface CrudDataTableIfacesOptionsUseActionMenuOnRow {
    enabled ?: boolean,
    settings ?: CrudDataTableIfacesOptionsUseActionMenuOnRowSettings
}
export interface CrudDataTableIfacesOptions {
    useActionMenuOnRow ?: CrudDataTableIfacesOptionsUseActionMenuOnRow
}

export interface CrudDataTableIfaces {
    endpoint ?: string,
    title ?: string,
    create ?: CreateConfigProps,
    view ?: ViewConfigProps,
    edit ?: EditConfigProps,
    delete ?: DeleteConfigProps,
    options ?: CrudDataTableIfacesOptions
}