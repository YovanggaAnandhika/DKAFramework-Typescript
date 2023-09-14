import {ConfigWebpackServer} from "./Interfaces/WebpackConfigServer";
import {Compiler, webpack} from "webpack";
import webpackDev, {} from "webpack-dev-server";
import {merge} from "lodash";
import {DefaultConfigWebpackServer} from "./Config/DefaultConfigurationWebpackServer";

export async function WebpackServerInstances<Config extends ConfigWebpackServer = ConfigWebpackServer>(config : Config) : Promise<void> {
    let mWebpack : Compiler;
    let mWebpackDev : webpackDev;
    config = await merge(DefaultConfigWebpackServer, config);
    //console.log(config)
    return new Promise(async (resolve, rejected) => {
        if (config.webpack !== undefined){
            mWebpack = webpack(config.webpack);
            if(config.port !== undefined && config.host !== undefined){
                config.webpackDev.host = config.host;
                config.webpackDev.port = config.port;
                mWebpackDev = new webpackDev(config.webpackDev, mWebpack);

                mWebpackDev.start()
                    .then(async () => {
                        await resolve();
                    })
                    .catch(async (error) => {
                        await rejected({ status : false, code : 400, msg : `Error running webpackdev server`, error : error})
                    });
            }else{
                await rejected({ status : false, code : 400, msg : `Config host or port not Declare`})
            }
        }else{
            rejected({ status : false, code : 400, msg : `Config Webpack Not Found`})
        }
    })


}

export default WebpackServerInstances;