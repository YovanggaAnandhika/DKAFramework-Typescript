import {FastifyInstance} from "fastify";
import {ConfigFastifyServer} from "../Interfaces/ConfigFastifyServer";
import {merge} from "lodash";
import {readFileSync} from "fs";


export function FastifyHooks(fastify : FastifyInstance, config : ConfigFastifyServer) : Promise<FastifyInstance> {
    let mCostumHeaders : any = {};
    return new Promise(async (resolve, rejected) => {
        await fastify.addHook("preHandler", async (req, res) => {
            let mPackageJson = require("./../../../../package.json");
            mCostumHeaders["framework-version"] = mPackageJson.version;
            mCostumHeaders["framework-name"] = mPackageJson.name;
            mCostumHeaders["framework-author-name"] = mPackageJson.author.name
            mCostumHeaders["framework-author-email"] = mPackageJson.author.email
            await res.headers(mCostumHeaders);
        });

        await resolve(fastify);
    })
}