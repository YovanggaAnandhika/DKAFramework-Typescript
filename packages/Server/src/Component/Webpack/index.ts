import {ConfigWebpackServer} from "./Interfaces/WebpackConfigServer";
import {Compiler, webpack} from "webpack";
import webpackDev, {} from "webpack-dev-server";
import {merge} from "lodash";
import {DefaultConfigWebpackServer} from "./Config/DefaultConfigurationWebpackServer";
import {CallbackWebpackServer} from "./Interfaces/CallbackWebpackServer";
import {MODE_COMPILE, MODE_SERVER} from "./Types/WebpackTypesServer";

export async function WebpackServerInstances<Config extends ConfigWebpackServer = ConfigWebpackServer>(config : Config) : Promise<CallbackWebpackServer> {
    let mWebpack : Compiler;
    let mWebpackDev : webpackDev;
    config = merge({}, DefaultConfigWebpackServer, config)
    mWebpack = webpack(config.webpack);
    return new Promise(async (resolve, rejected) => {
        if (config.webpack !== undefined){
            config.webpack.mode = (config.state === "DEVELOPMENT") ? "development" : (config.state === "PRODUCTION") ? "production" : "development";
            if(config.port !== undefined && config.host !== undefined){
                config.webpackDev.host = config.host;
                config.webpackDev.port = config.port;
                mWebpackDev = new webpackDev(config.webpackDev, mWebpack);
                switch (config.mode){
                    case MODE_COMPILE :
                        mWebpack.run(async (error, result) => {
                            if (!error) {
                                await resolve({ status : true, code : 200, msg :`successfully start server`, config : config, ... result})
                            }else{
                                await rejected({ status : false, code : 400, msg : `Error running webpack`, error : error});
                            }
                        })
                        break;
                    case MODE_SERVER :
                        mWebpackDev.start()
                            .then(async () => {
                                await resolve({ status : true, code : 200, msg :`successfully start server`, config : config});
                            })
                            .catch(async (error) => {
                                await rejected({ status : false, code : 400, msg : `Error running webpackdev server`, error : error})
                            });
                        break;
                }
            }else{
                await rejected({ status : false, code : 400, msg : `Config host or port not Declare`})
            }
        }else{
            rejected({ status : false, code : 400, msg : `Config Webpack Not Found`})
        }
    })


}

export default WebpackServerInstances;