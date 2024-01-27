import {Configuration as WebpackConfiguration} from "webpack-dev-server";

import {GlobalServerConfigInterfacesSettingsLogger} from "../../../Interfaces/ConfigServerInterfaces";
import {ALL_MODE, WEBPACK_ENGINE, WebpackSingleConfig} from "../Types/WebpackTypesServer";
import {createBrowserRouter} from "react-router-dom";
import {DEVELOPMENT, PRODUCTION} from "../../../Types/ConfigServerTypes";

export interface MultiCompilerOptions {
    parallelism?: number;
}

export interface WebpackConfigServerInstancesSettings {
    logger ?: GlobalServerConfigInterfacesSettingsLogger
}

export interface WebpackConfigServerInstancesWebpackDev extends WebpackConfiguration {

}

export interface WebpackConfigServerInstances {
    engine ?: WEBPACK_ENGINE | undefined,
    state ?: DEVELOPMENT | PRODUCTION,
    host ?: string | undefined,
    port ?: number | undefined,
    mode ?: ALL_MODE | undefined,
    webpack ?: WebpackSingleConfig | undefined,
    webpackDev ?: WebpackConfigServerInstancesWebpackDev | undefined,
    route ?: ReturnType<typeof createBrowserRouter>
    settings ?: WebpackConfigServerInstancesSettings | undefined
}


export type ConfigWebpackServer = WebpackConfigServerInstances