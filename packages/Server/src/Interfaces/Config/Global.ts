import {LicenceMethodOffline, LicenceMethodOnline} from "../../Type/types";


export interface GlobalConfigLicenceMethodOffline {
    method: LicenceMethodOffline,
    key: string | undefined
}

export interface GlobalConfigLicenceMethodOnline {
    method: LicenceMethodOnline
}

export interface GlobalConfig {
    licence?: GlobalConfigLicenceMethodOffline | GlobalConfigLicenceMethodOnline | undefined
}

/*
export interface GlobalConfig {
    licenceKey?: string | undefined
}*/
