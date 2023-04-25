import {ConfigServerInterfaces} from "../Interfaces/ConfigServerInterfaces";
import {Options} from "../index";
import {readFileSync} from "fs";
import path from "path";
import DefaultConfigFastifyServer from "../Component/Fastify/Config/DefaultConfigFastifyServer";


export const DefaultServerConfiguration : ConfigServerInterfaces = DefaultConfigFastifyServer