import {ConfigWebpackServer} from "./Interfaces/WebpackConfigServer";
import {webpack, Compiler, MultiCompiler} from "webpack";
import webpackDev, { WebSocketServer } from "webpack-dev-server";
import {WebpackMultiConfig, WebpackSingleConfig} from "./Types/WebpackTypesServer";
import {merge} from "lodash";
import {DefaultConfigWebpack, DefaultConfigWebpackServer} from "./Config/DefaultConfigurationWebpackServer";

export async function WebpackServerInstances<Config extends ConfigWebpackServer = ConfigWebpackServer>(config : Config) : Promise<void> {
    let mWebpack : Compiler;
    let mWebpackDev;
    config = await merge(DefaultConfigWebpackServer, config);
    //console.log(config)
    return new Promise(async (resolve, rejected) => {
        if (config.webpack !== undefined){
            mWebpack = webpack(config.webpack);
            mWebpackDev = new webpackDev(config.webpackDev,mWebpack);

            if(config.port !== undefined && config.host !== undefined){
                mWebpackDev.listen(config.port,config.host, async (err) => {
                    if (!err){
                        await resolve();
                    }else{
                        await rejected({ status : false, code : 400, msg : `Error running webpackdev server`, error : err})
                    }
                })
            }else{
                await rejected({ status : false, code : 400, msg : `Config host or port not Declare`})
            }
        }else{
            rejected({ status : false, code : 400, msg : `Config Webpack Not Found`})
        }
    })


}

export default WebpackServerInstances;