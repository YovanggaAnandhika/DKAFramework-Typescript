import webpack, {Compiler} from "webpack"
import {ConfigReactJS, ConfigReactJSOptionsWebpackConfiguration} from "../../../Interfaces/Config/ReactJS";
import {merge} from "lodash";

export async function Webpack(parentConfig: ConfigReactJS, config: ConfigReactJSOptionsWebpackConfiguration): Promise<Compiler> {
    let mCompiler: Compiler;
    let mConfig: ConfigReactJSOptionsWebpackConfiguration = config;
    return new Promise(async (resolve, rejected) => {
        if (parentConfig.logger?.enabled && parentConfig.state !== "production") {
            let mLogger: ConfigReactJSOptionsWebpackConfiguration = {
                infrastructureLogging: {
                    level: "none"
                },
                stats: parentConfig.logger.level,
            }
            mConfig = merge(config, mLogger);
        }

        mCompiler = await webpack(mConfig)
        resolve(mCompiler);
    })
}