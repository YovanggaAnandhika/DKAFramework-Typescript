import {ConfigServerInterfaces} from "./Interfaces/ConfigServerInterfaces";
import {ServerSelector} from "./Types/ServerTypesSelector";
import { default as Options } from "./Config";


export async function Server<Config extends ConfigServerInterfaces> (serverConfig : Config) : Promise<ServerSelector<Config>> {
    return new Promise(async (resolve, rejected) => {

    });
}

export {
    Options
}