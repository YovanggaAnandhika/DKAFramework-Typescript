import {Configuration, RuleSetRule} from "webpack";
import {Configuration as WebpackConfiguration} from "webpack-dev-server";
import {MultiCompilerOptions} from "../Interfaces/WebpackConfigServer";


export type WEBPACK_ENGINE = "WEBPACK";
export type WebpackSingleConfig = Configuration;
export type WebpackMultiConfig = ReadonlyArray<Configuration> & MultiCompilerOptions;

export type WebpackDevSingleConfig = WebpackConfiguration
export type WebpackDevMultiConfig = WebpackConfiguration

export type WebpackRulesTypes = (RuleSetRule | "...")[];

export type MODE_SERVER = "MODE_SERVER";
export type MODE_COMPILE = "MODE_COMPILE";

export const MODE_SERVER : MODE_SERVER = "MODE_SERVER";
export const MODE_COMPILE : MODE_COMPILE = "MODE_COMPILE";

export type ALL_MODE = MODE_COMPILE | MODE_SERVER;


export const WEBPACK_ENGINE : WEBPACK_ENGINE = "WEBPACK";

