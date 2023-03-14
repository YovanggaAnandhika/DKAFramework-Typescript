import http from "http";

import {EngineFastify, EngineReactJS, EngineSocketIO, EngineSocketIOClient, LOGGER_LEVEL,} from "../Type/types";

export interface ConfigState {
    SERVER_STATE_DEVELOPMENT : "development",
    SERVER_STATE_PRODUCTION : "production"
}

export interface ConfigEngineSocketIO {
    Server : EngineSocketIO,
    Client : EngineSocketIOClient,
}
export interface ConfigEngine {
    FASTIFY : EngineFastify,
    EXPRESSSJS : "EXPRESSJS",
    SOCKETIO : ConfigEngineSocketIO,
    REACTJS : EngineReactJS,
    HTTP : "HTTP",
    UDP : "UDP"
}

export interface ConfigHost {
    LOCALHOST: "127.0.0.1",
    WILDCARD: "0.0.0.0"
}

export interface ConfigPort {
    DEFAULT: 80
}


export interface ConfigSystemMultiTypes {
    DEFAULT_DELAY_PROGRESS?: number,
    BASE_PATH?: string,
    PUBLIC_URL?: string,
    SERVER_RESULT_JSON?: boolean
}

export interface ConfigSystemLoggerPath {
    error?: string | undefined,
    info?: string | undefined,
    warning?: string | undefined
}

export interface ConfigSystemLogger {
    enabled?: boolean,
    level?: LOGGER_LEVEL | undefined,
    path?: ConfigSystemLoggerPath
}

export interface MultiplePluginsServerNgrokSettings {
    authToken: string | undefined,
    proto: "tcp" | "http" | "tls"
}

export interface MultiplePluginsServerNgrok {
    enabled?: boolean | undefined,
    settings?: MultiplePluginsServerNgrokSettings
}

export interface MultiplePluginsServer {
    ngrok ?: MultiplePluginsServerNgrok
}











/*export type ConfigReactJS = WebpackDevConfig | WebpackDevCompiler | WebpackDevMultiCompiler & {
    engine : EngineReactJS
}*/


