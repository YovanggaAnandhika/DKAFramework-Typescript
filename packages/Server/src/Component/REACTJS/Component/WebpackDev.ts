import webpackDev, {Configuration as WebpackDevConfig} from "webpack-dev-server";
import {Compiler as WebpackCompiler} from "webpack";
import {merge} from "lodash";
import {ConfigReactJS} from "../../../Interfaces/Config/ReactJS";
import {spawn} from "child_process";
import {Logger} from "winston";

export async function WebpackDev(config: ConfigReactJS, WebpackCompiler: WebpackCompiler, logger: Logger): Promise<webpackDev> {
    let mWebpackDev: webpackDev;
    return new Promise(async (resolve, rejected) => {
        let mWebpackCompilerOptions: WebpackDevConfig = {
            host: config.host,
            port: config.port,
            onListening: async () => {
                process.on("SIGHUP", async () => {
                    process.kill(process.pid);
                })
                if (config.options?.Electron?.enabled) {
                    let mFilename = (config?.options?.Electron.options?.filename !== undefined) ? [config?.options?.Electron.options?.filename] : [];
                    let electron = require("electron");
                    let spawnProccess = await spawn(`${electron}`, mFilename);
                    await spawnProccess.stdout.on("data", async (data) => {
                        if (config?.state === "development") {
                            logger.info(data)
                        }
                    });
                    await spawnProccess.stderr.on("data", async (error) => {
                        if (config?.state === "development") {
                            logger.error(error)
                        }
                    });

                    await spawnProccess.on("exit", async () => {
                        await spawnProccess.kill(0);
                        await mWebpackDev.stopCallback(async (error) => {
                            if (!error) {
                                if (config?.state === "development") {
                                    logger.error(error)
                                }
                            } else {
                                await process.exit(0)
                            }
                        })
                    })

                }
            },
            historyApiFallback: config.options?.WebpackDev?.historyApiFallback
        }
        /*** Mergering Options Compiler Options WebPack Dev Server */
        let mWebpackDevDefaultCompilerOptions: WebpackDevConfig = merge(mWebpackCompilerOptions, config.options?.WebpackDev)
        mWebpackCompilerOptions.open = (config.options?.Electron?.enabled) ? false : config.options?.WebpackDev?.open;
        mWebpackDev = new webpackDev(mWebpackDevDefaultCompilerOptions, WebpackCompiler);

        /** Return Variable Data Webpack Development **/
        await resolve(mWebpackDev);
    })
}