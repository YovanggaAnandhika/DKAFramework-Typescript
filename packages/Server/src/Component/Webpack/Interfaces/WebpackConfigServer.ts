import { Configuration, MultiStats, Stats } from "webpack";

import { GlobalServerConfigInterfaces } from "../../../Interfaces/ConfigServerInterfaces";
import {
    WEBPACK_ENGINE,
    WebpackDevSingleConfig,
    WebpackMultiConfig,
    WebpackSingleConfig
} from "../Types/WebpackTypesServer";

export interface MultiCompilerOptions {
    parallelism?: number;
}

export interface WebpackConfigServerInstancesSettings {

}

export interface WebpackConfigServerInstances {
    engine ?: WEBPACK_ENGINE | undefined,
    webpack ?: WebpackSingleConfig | undefined,
    webpackDev ?: WebpackDevSingleConfig | undefined,
    settings ?: WebpackConfigServerInstancesSettings | undefined
}


export type ConfigWebpackServer = WebpackConfigServerInstances & GlobalServerConfigInterfaces