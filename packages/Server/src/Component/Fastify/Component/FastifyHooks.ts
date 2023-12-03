import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import {mFastify} from "../index";


export function FastifyHooks(fastify : typeof mFastify, config : ConfigFastifyServer) {
    let mCostumHeaders : any = {};
    fastify.addHook("preHandler", (req, res, next) => {
        let mPackageJson = require("./../../../../package.json");
        let pluginList = "";
        mCostumHeaders["framework-version"] = mPackageJson.version;
        mCostumHeaders["framework-name"] = mPackageJson.name;
        mCostumHeaders["framework-author-name"] = mPackageJson.author.name
        mCostumHeaders["framework-author-email"] = mPackageJson.author.email

        Object.keys(config.plugin).forEach((pluginName,index) => {
            if (config.plugin[pluginName].enabled){
                pluginList += `${pluginName.toLowerCase()}; `;
            }
        });
        if (Object.keys(config.plugin).length > 0) mCostumHeaders["framework-plugin-enabled"] = pluginList;
        res.headers(mCostumHeaders);
        next();
    });
}