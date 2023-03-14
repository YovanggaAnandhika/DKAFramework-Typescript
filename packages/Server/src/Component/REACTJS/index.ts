import webpackDev from "webpack-dev-server";
import {merge} from "lodash";
import {Plugins} from "./Middleware/Plugins";
import {Rules} from "./Middleware/Rules";
import {Entry} from "./Middleware/Entry";
import {Webpack} from "./Component/Webpack";
import {WebpackDev} from "./Component/WebpackDev";
import {ConfigReactJS, ConfigReactJSOptionsWebpackConfiguration} from "../../Interfaces/Config/ReactJS";
import {Options} from "html-webpack-plugin";
import {Logger} from "winston";

export interface REACTJS_CALLBACK {
    WebpackDev: webpackDev,
    options?: {
        HTMLPluginConfig?: Options
    }
}

export const REACTJS = async (config: ConfigReactJS, logger: Logger): Promise<REACTJS_CALLBACK> => {

    function checkModuleExist(name: string) {
        try {
            require.resolve(name);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * @return Promise<webpackDev>
     */
    return new Promise(async (resolve, rejected) => {
        await Entry(config)
            .then(async (entry) => {
                await Plugins(config)
                    .then(async (plugins) => {
                        await Rules(config)
                            .then(async (rules) => {
                                let defaultConfigurationWebpack: ConfigReactJSOptionsWebpackConfiguration = {
                                    mode: config.state,
                                    entry: entry,
                                    plugins: plugins.ConfigPluginWebpack,
                                    performance: {
                                        hints: false
                                    },
                                    optimization: {
                                        usedExports: true,
                                    },
                                    output: {
                                        publicPath: "/",
                                        filename: 'DKAFramework.js'
                                    },
                                    module: {
                                        rules: rules
                                    },
                                    resolve: {
                                        extensions: ['.tsx', '.ts', '.js', '.jsx'],
                                    }
                                }

                                /*if (config.settings?.buildOutputFile?.enabled === true) {
                                    defaultConfigurationWebpack.output.path = config.settings.buildOutputFile.path
                                }*/
                                let configurationWebpackMergered: ConfigReactJSOptionsWebpackConfiguration = merge(defaultConfigurationWebpack, config?.options?.Webpack?.configuration);
                                /** Init Webpack Compiler **/
                                Webpack(config, configurationWebpackMergered)
                                    .then(async (compiler) => {
                                        /** Init Webpack Dev Server **/
                                        await WebpackDev(config, compiler, logger)
                                            .then(async (server) => {
                                                await resolve({WebpackDev: server});
                                            })
                                            .catch(async (error) => {
                                                rejected(error)
                                            });
                                    })
                                    .catch(async (error) => {
                                        rejected(error)
                                    })
                            })
                            .catch(async (error) => {
                                rejected(error)
                            })
                    })
                    .catch(async (error) => {
                        rejected(error)
                    })
            })
            .catch(async (error) => {
                rejected(error)
            })


    });
}

export default REACTJS;