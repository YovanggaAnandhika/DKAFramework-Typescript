import Webpack, {Compiler as WebpackCompiler} from "webpack";
import {merge} from "lodash";
import HtmlWebpackPlugin, {Options} from "html-webpack-plugin";
import path from "path";
import {ConfigReactJS} from "../../../Interfaces/Config/ReactJS";
import * as fs from "fs";
import DotEnv from "dotenv";

export type ConfigPluginOptionsWebpack = (
    | ((this: WebpackCompiler, compiler: WebpackCompiler) => void)
    | Webpack.WebpackPluginInstance
    )[]

export interface PluginsWebpackTypes {
    ConfigPluginWebpack?: ConfigPluginOptionsWebpack,
    MergeringConfigPlugin?: Options
}

export async function Plugins(config: ConfigReactJS): Promise<PluginsWebpackTypes> {
    return new Promise(async (resolve, rejected) => {
        let pluginsModules: ConfigPluginOptionsWebpack = [];
        let mergeConfigOptionsHTMLWebpackPlugin: Options = {};

        if (config.plugins?.HtmlWebpackPlugin?.enabled) {
            let defaultOptionsHTMLWebpackPlugin: Options = {};
            let mEnvConfig: string | undefined = ``;
            switch (config.options?.Enviroment?.mode) {
                case "ENV" :
                    mEnvConfig = `${config.options?.Enviroment?.option?.path}`;
                    if (fs.existsSync(mEnvConfig)) {
                        await DotEnv.config({
                            path: mEnvConfig,
                        })
                        defaultOptionsHTMLWebpackPlugin = {
                            template: path.join(__dirname, "./../Template/index.html"),
                            templateParameters: process.env
                        }
                        pluginsModules.push(new Webpack.DefinePlugin({
                            'process.env': JSON.stringify(merge({PUBLIC_URL: `http://${config.host}:${config.port}`}, process.env))
                        }))
                    } else {
                        rejected({status: false, code: 500, msg: `environment mode is env file. but File not exist`})
                    }
                    break;
                case "CONST" :
                    defaultOptionsHTMLWebpackPlugin = {
                        template: path.join(__dirname, "./../Template/index.html"),
                        templateParameters: merge({PUBLIC_URL: `http://${config.host}:${config.port}`}, config.Constanta)
                    }
                    pluginsModules.push(new Webpack.DefinePlugin({
                        'process.env': JSON.stringify(Object(merge({PUBLIC_URL: `http://${config.host}:${config.port}`}, config.Constanta)))
                    }))
                    break;
                default :
                    defaultOptionsHTMLWebpackPlugin = {
                        template: path.join(__dirname, "./../Template/index.html"),
                        templateParameters: merge({PUBLIC_URL: `http://${config.host}:${config.port}`}, config.Constanta)
                    }
                    pluginsModules.push(new Webpack.DefinePlugin({
                        'process.env': JSON.stringify(Object(merge({PUBLIC_URL: `http://${config.host}:${config.port}`}, config.Constanta)))
                    }))
            }
            mergeConfigOptionsHTMLWebpackPlugin = merge(defaultOptionsHTMLWebpackPlugin, config.plugins.HtmlWebpackPlugin.options)
            pluginsModules.push(new HtmlWebpackPlugin(mergeConfigOptionsHTMLWebpackPlugin))
        }

        await config.plugins?.costumPlugins?.forEach(function (value) {
            pluginsModules.push(value);
        });

        let defaultPluginsWebpack: ConfigPluginOptionsWebpack = merge(pluginsModules, config.plugins);

        resolve({
            ConfigPluginWebpack: defaultPluginsWebpack,
            MergeringConfigPlugin: mergeConfigOptionsHTMLWebpackPlugin
        })
    })
}