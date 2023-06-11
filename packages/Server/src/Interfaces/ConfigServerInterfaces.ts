import {ConfigSocketIOServer} from "../Component/SocketIO/Server/Interfaces/ConfigSocketIOServer";
import {ConfigFastifyServer} from "../Component/Fastify/Interfaces/ConfigFastifyServer";
import {ALL_ENGINE, DEVELOPMENT, PRODUCTION} from "../Types/ConfigServerTypes";
import {ConfigUDPServer} from "../Component/UDP/Interfaces/ConfigUDPServer";
import {ConfigWebpackServer} from "../Component/Webpack/Interfaces/WebpackConfigServer";
import {ConfigFastifyServerRegister, FASTIFY_ENGINE} from "../Component/Fastify/Types/TypesFastifyServer";
import {SOCKET_ENGINE} from "../Component/SocketIO/Server/Types/TypesSocketIOServer";
import {UDP_ENGINE} from "../Component/UDP/Types/TypesUDPServer";
import {WEBPACK_ENGINE} from "../Component/Webpack/Types/WebpackTypesServer";


export interface GlobalServerConfigInterfacesSettingsLogger {
    enabled ?: boolean,
    saveLogFile ?: boolean,
    viewConsoleLog ?: boolean
}
export interface GlobalServerConfigInterfacesSettings {
    logger ?: GlobalServerConfigInterfacesSettingsLogger
}

export interface GlobalServerConfigInterfaces {
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string | undefined,
    port ?: number | undefined,
    settings ?: GlobalServerConfigInterfacesSettings
}

export type ConfigServerInterfaces = ConfigSocketIOServer | ConfigFastifyServer | ConfigUDPServer | ConfigWebpackServer
/*export type ConfigServerInterfaces = GlobalServerConfigInterfaces*/

export interface ExtendedError extends Error {
    data?: any;
}