import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import {mFastify} from "../index";


export function FastifyHooks(fastify : typeof mFastify, config : ConfigFastifyServer) {
    let mCostumHeaders : any = {};
    fastify.addHook("preHandler", (req, res, next) => {
        let mPackageJson = require("./../../../../package.json");
        mCostumHeaders["framework-version"] = mPackageJson.version;
        mCostumHeaders["framework-name"] = mPackageJson.name;
        mCostumHeaders["framework-author-name"] = mPackageJson.author.name
        mCostumHeaders["framework-author-email"] = mPackageJson.author.email
        res.headers(mCostumHeaders);
        next();
    });
}