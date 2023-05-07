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
    webpack ?: WebpackSingleConfig | WebpackMultiConfig
}

export type WebpackConfigServerInstancesCallback<Callback extends Stats | MultiStats | any = any> = (err?: Error, stats?: Callback) => void;


export type WebpackConfigServerInstancesCheckedCallback<Config> =
    Config extends { webpack : Array<WebpackSingleConfig> } ? { callback ?: WebpackConfigServerInstancesCallback<MultiStats> } :
        { callback ?: WebpackConfigServerInstancesCallback<Stats> };

export type WebpackConfigServerInstances = {
    engine ?: WEBPACK_ENGINE | undefined,
    webpack ?: WebpackSingleConfig,
    webpackDev ?: WebpackDevSingleConfig,
    settings ?: WebpackConfigServerInstancesSettings
}


export type ConfigWebpackServer = WebpackConfigServerInstances & GlobalServerConfigInterfaces