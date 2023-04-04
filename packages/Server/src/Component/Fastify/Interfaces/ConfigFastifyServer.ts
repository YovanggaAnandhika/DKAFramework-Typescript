import {FASTIFY_ENGINE} from "../Types/TypesFastifyServer";
import {ConfigServerInterfaces, GlobalConfigInterfaces} from "../../../Interfaces/ConfigServerInterfaces";

export interface ConfigFastifyServer extends GlobalConfigInterfaces {
    engine ?: FASTIFY_ENGINE | undefined
}