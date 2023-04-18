import {FASTIFY_ENGINE} from "../Types/TypesFastifyServer";
import {ConfigServerInterfaces, GlobalServerConfigInterfaces } from "../../../Interfaces/ConfigServerInterfaces";

export interface ConfigFastifyServer extends GlobalServerConfigInterfaces {
    engine ?: FASTIFY_ENGINE | undefined
}