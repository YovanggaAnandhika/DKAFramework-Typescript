import {Configuration, RuleSetRule} from "webpack";
import {Configuration as WebpackConfiguration} from "webpack-dev-server";
import {MultiCompilerOptions} from "../Interfaces/WebpackConfigServer";


export type WEBPACK_ENGINE = "WEBPACK";
export type WebpackSingleConfig = Configuration;
export type WebpackMultiConfig = ReadonlyArray<Configuration> & MultiCompilerOptions;

export type WebpackDevSingleConfig = WebpackConfiguration
export type WebpackDevMultiConfig = WebpackConfiguration

export type WebpackRulesTypes = (RuleSetRule | "...")[]


export const WEBPACK_ENGINE : WEBPACK_ENGINE = "WEBPACK";

