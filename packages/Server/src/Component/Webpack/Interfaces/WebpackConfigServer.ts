import { Configuration, MultiStats, Stats } from "webpack";
import { Configuration as WebpackConfiguration } from "webpack-dev-server";

import {
    GlobalServerConfigInterfaces,
    GlobalServerConfigInterfacesSettingsLogger
} from "../../../Interfaces/ConfigServerInterfaces";
import {
    WEBPACK_ENGINE,
    WebpackDevSingleConfig,
    WebpackMultiConfig,
    WebpackSingleConfig
} from "../Types/WebpackTypesServer";
import {createBrowserRouter} from "react-router-dom";
import {ConfigFastifyServerRegister} from "../../Fastify/Types/TypesFastifyServer";
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
    engine : WEBPACK_ENGINE,
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    webpack ?: WebpackSingleConfig | undefined,
    webpackDev ?: WebpackConfigServerInstancesWebpackDev | undefined,
    route ?: ReturnType<typeof createBrowserRouter>
    settings ?: WebpackConfigServerInstancesSettings | undefined
}


export type ConfigWebpackServer = WebpackConfigServerInstances