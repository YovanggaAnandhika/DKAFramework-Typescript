import {ConfigSocketIOServer} from "../Component/SocketIO/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigServerTypes";
import {ConfigUDPServer} from "../Component/UDP/Interfaces/ConfigUDPServer";
import {ConfigWebpackServer} from "../Component/Webpack/Interfaces/WebpackConfigServer";


export interface GlobalServerConfigInterfacesSettingsLogger {
    enabled ?: boolean,
    saveLogFile ?: boolean,
    viewConsoleLog ?: boolean
}


export interface GlobalServerConfigInterfaces {
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined
}

export type ConfigServerInterfaces = ConfigSocketIOServer | ConfigFastifyServer | ConfigUDPServer | ConfigWebpackServer
/*export type ConfigServerInterfaces = GlobalServerConfigInterfaces*/

export interface ExtendedError extends Error {
    data?: any;
}