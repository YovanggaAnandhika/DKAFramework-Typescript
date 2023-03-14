import {
    EngineSocketIOClient,
    MetaDataSocketIOClient,
    SocketIOInstancesClient,
    State
} from "../../../Type/types";
import {ManagerOptions, SocketOptions} from "socket.io-client"
import {ConfigSystemLogger, ConfigSystemMultiTypes} from "../../Global";
import {GlobalConfig} from "../Global";
import {Packet} from "socket.io-parser";

export type ConfigSocketIOClientOnConnect = (io: MetaDataSocketIOClient) => Promise<void> | void;
export type ConfigSocketIOClientOnPacket = (packet : Packet) => Promise<void> | void;
export type ConfigSocketIOClientConnectError = (error: any) => Promise<void> | void | undefined;
export type ConfigSocketIOClientError = (error: any) => Promise<void> | void | undefined;
export type ConfigSocketIOClientOnDisconnect = (id: MetaDataSocketIOClient) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnect = (attempt: number) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnectAttempt = (attempt: number) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnectError = (error: any) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnReconnectFailed = () => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnPing = (latency ?: number) => Promise<void> | void | undefined;
export type ConfigSocketIOClientEventOnError = (error: any) => Promise<void> | void | undefined;

export interface ConfigSocketIOClientSettingsEncryptionSettings {
    key?: string
}

export interface ConfigSocketIOClientSettingsEncryption {
    enabled?: boolean,
    settings?: ConfigSocketIOClientSettingsEncryptionSettings
}

export interface ConfigSocketIOClientSettings extends Partial<SocketOptions & ManagerOptions> {
    encryption?: ConfigSocketIOClientSettingsEncryption
}


export interface ConfigSocketIOClientOn {
    Connect?: ConfigSocketIOClientOnConnect,
    ConnectError?: ConfigSocketIOClientConnectError,
    Disconnect?: ConfigSocketIOClientOnDisconnect,
    Manager ?: {
        Reconnect?: ConfigSocketIOClientEventOnReconnect,
        ReconnectAttempt?: ConfigSocketIOClientEventOnReconnectAttempt,
        ReconnectError?: ConfigSocketIOClientEventOnReconnectError,
        ReconnectFailed?: ConfigSocketIOClientEventOnReconnectFailed,
        Ping?: ConfigSocketIOClientEventOnPing,
        Packet?: ConfigSocketIOClientOnPacket,
        Error?: ConfigSocketIOClientEventOnError,
    }
}
export interface ConfigSocketIOClient extends GlobalConfig {
    /**
     * The State Development or Production
     * **/
    state?: State,
    engine?: EngineSocketIOClient | undefined,
    logger?: ConfigSystemLogger | undefined,
    host ?: string | undefined,
    port ?: number | undefined,
    io ?: SocketIOInstancesClient | undefined,
    costumNameSpace?: string | undefined,
    on ?: ConfigSocketIOClientOn | undefined,
    getConfig?: (config: ConfigSocketIOClient) => void | Promise<void>,
    settings?: ConfigSocketIOClientSettings | undefined,
    Constanta?: ConfigSystemMultiTypes | undefined
}