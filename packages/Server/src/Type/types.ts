import {FastifyInstance, FastifyPluginOptions} from "fastify";
import {Namespace, RemoteSocket, Server, Socket as SocketServer} from "socket.io";
import * as Sock from "socket.io-client";
import {Socket} from "socket.io-client";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {ExtendedError} from "socket.io/dist/namespace";
import {ConfigReactJS} from "../Interfaces/Config/ReactJS";
import {
    ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic,
    ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth,
    ConfigSocketIO
} from "../Interfaces/Config/SocketIO/Server";
import {ConfigFastify} from "../Interfaces/Config/Fastify";
import {Router} from "express";
import {ReactNode} from "react";
import {DisconnectDescription} from "socket.io-client/build/esm-debug/socket";
import DisconnectReason = Socket.DisconnectReason;

/** Generic Types**/
export type SocketIOInstanceServer = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOInstanceNamespace = Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOInstanceSocket = SocketServer<DefaultEventsMap, DefaultEventsMap, any>;
export type SocketIOInstanceSocketRemote = RemoteSocket<DefaultEventsMap, any>;
export type SocketIOInstanceClient = Sock.Socket<DefaultEventsMap, DefaultEventsMap>;

/** Function Types **/
export type SocketIOInstanceAsInstance = (io: SocketIOInstanceServer) => Promise<void> | void | undefined;
export type SocketIOInstancesMiddlewareNext = (err?: (ExtendedError | undefined)) => void | undefined;
export type SocketIOInstancesMiddleware = (io: SocketIOInstanceSocket, next : SocketIOInstancesMiddlewareNext) => Promise<void> | void | undefined;
export type FastifyRegistringPlugins = (app: FastifyInstance) => Promise<FastifyInstance>;
export type FastifyInstances = (app: FastifyInstance, opts: FastifyPluginOptions, next: any) => Promise<void> | void | undefined;
export type SocketIOInstancesClient = (io: SocketIOInstanceClient) => Promise<void> | void | undefined;
export type SocketIOMiddleware = (io: ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth, next: (error ?: Error) => void) => void | Promise<void>;
export type ExpressJSRoutesInstance = (router: Router) => void | Promise<void>;

export type SocketIOInstances = SocketIOInstanceAsInstance;

export type SecurityAuthorizationCallbackOauth = (callback: ConfigServerSocketIOOptionsSecurityAuthorizationCallbackOauth, next: (error ?: Error) => void) => void | Promise<void>;
export type SecurityAuthorizationCallbackBasic = (callback: ConfigServerSocketIOOptionsSecurityAuthorizationCallbackBasic, next: (error ?: Error) => void) => void | Promise<void>;
export type SecurityAuthorizationMode = "OAUTH2" | "BASIC";
/**
 * state development
 */
export type State = "none" | "development" | "production";
export type Mode = "compile" | "server";
export type EngineFastify = "FASTIFY";

/**
 * @typedef { ConfigFastify | ConfigSocketIO } Config
 */
export type DKAConfig = ConfigFastify | ConfigSocketIO | ConfigReactJS | object;

export function isFastify(obj: any): obj is ConfigFastify {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'FASTIFY';
}

export function isSocketIO(obj: any): obj is ConfigSocketIO {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'SOCKET.IO';
}

export function isReactJS(obj: any): obj is ConfigReactJS {
    // 👇️ check for type property
    return 'type' in obj && obj.type === 'REACTJS';
}

export type MetaDataSocketIOClient = {
    id?: string,
    reason?: DisconnectReason | undefined,
    description?: DisconnectDescription | undefined,
    timestamp?: {
        lastTime?: {
            onConnect?: {
                unix?: number,
                humanize?: string
            },
            onDisconnect?: {
                unix?: number,
                humanize?: string
            }
        }
    }
} | undefined;


export type ReactNODE = ReactNode

export interface SchemaReactSingleSessionManagement {
    sessionName?: string,
    redirectTo?: ReactNODE
}

export interface SchemaReactSingle {
    name?: string | number,
    index?: boolean,
    path?: string,
    exact?: boolean,
    component?: ReactNODE,
    children?: SchemaReactArray
}

export type SchemaReactArray = Array<SchemaReactSingle>;

export type LEVEL_NONE = "none";
export type LEVEL_VERBOSE = "verbose";
export type LEVEL_SUMMARY = "summary";
export type LEVEL_ERROR_ONLY = "errors-only";
export type LEVEL_ERROR_WARNINGS = "errors-warnings"
export type LEVEL_MINIMAL = "minimal";
export type LEVEL_NORMAL = "normal";
export type LEVEL_DETAILED = "detailed";

export type LOGGER_LEVEL = | boolean
    | LEVEL_NONE
    | LEVEL_VERBOSE
    | LEVEL_SUMMARY
    | LEVEL_ERROR_ONLY
    | LEVEL_ERROR_WARNINGS
    | LEVEL_MINIMAL
    | LEVEL_NORMAL
    | LEVEL_DETAILED;

/**
 * @type EngineSocketIO
 */
export type EngineSocketIO = "SOCKET.IO";
export type EngineSocketIOClient = "SOCKET.IO-CLIENT";
export type EngineReactJS = "REACTJS";
export type EngineExpressJS = "EXPRESSJS";

export interface SocketListArray {
    name ?: string | undefined,
    socket : Socket
}

export type LicenceMethodOffline = "LICENCE_KEY_OFFLINE";
export type LicenceMethodOnline = "LICENCE_KEY_ONLINE";
export type LicenceMethodHardwareMacAddress = "LICENCE_KEY_MAC_ADDRESS";
export type LicenceMethodIpPublic = "LICENCE_KEY_IP_PUBLIC";