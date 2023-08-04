import {BoardOption} from "johnny-five";
import {MethodNodeMCU} from "../index";


export type MODE_USB = "USB_MODE";
export type MODE_WIFI = "WIFI_MODE";

export type ALL_MODE = MODE_WIFI | MODE_USB;
export const MODE_USB: MODE_USB = "USB_MODE";
export const MODE_WIFI : MODE_WIFI = "WIFI_MODE";

export interface NodeMCUConfigWifi extends BoardOption {
    mode : MODE_WIFI,
    host ?: string | undefined,
    port ?: number,
    repl ?: boolean,
    onConnect ?: () => void | Promise<void>,
    onReady ?: (MethodNodeMCU) => void | Promise<void>,
    onError ?: () => void | Promise<void>,
    onFail ?: () => void | Promise<void>,
    onClose ?: () => void | Promise<void>
}
export interface NodeMCUConfigUSB extends BoardOption {
    mode : MODE_USB,
    port ?: string,
    repl ?: boolean,
    onConnect ?: () => void | Promise<void>,
    onReady ?: (method ?: typeof MethodNodeMCU | undefined) => void | Promise<void>,
    onError ?: (error ?: Error | undefined) => void | Promise<void>,
    onFail ?: () => void | Promise<void>,
    onClose ?: () => void | Promise<void>
}
export type NodeMCUConfig = NodeMCUConfigWifi | NodeMCUConfigUSB;


export type BOARD_STATE_IDLE = "BOARD_STATE_IDLE";
export type BOARD_STATE_READY = "BOARD_STATE_READY";
export type BOARD_STATE_CLOSE = "BOARD_STATE_CLOSE";
export type BOARD_STATE_CONNECT = "BOARD_STATE_CONNECT";
export type BOARD_STATE_FAIL = "BOARD_STATE_FAIL";
export type BOARD_STATE_ERROR = "BOARD_STATE_ERROR";

export type ALL_STATE = BOARD_STATE_IDLE | BOARD_STATE_READY | BOARD_STATE_CONNECT | BOARD_STATE_CLOSE | BOARD_STATE_FAIL | BOARD_STATE_ERROR;

export const BOARD_STATE_IDLE : BOARD_STATE_IDLE = "BOARD_STATE_IDLE";
export const BOARD_STATE_READY : BOARD_STATE_READY = "BOARD_STATE_READY";
export const BOARD_STATE_CONNECT : BOARD_STATE_CONNECT = "BOARD_STATE_CONNECT";
export const BOARD_STATE_CLOSE : BOARD_STATE_CLOSE = "BOARD_STATE_CLOSE";
export const BOARD_STATE_FAIL : BOARD_STATE_FAIL = "BOARD_STATE_FAIL";
export const BOARD_STATE_ERROR : BOARD_STATE_ERROR = "BOARD_STATE_ERROR";

export interface NodeMCULedMethod {
    pin ?: number,
    reverse ?: boolean,
    state ?: boolean
}

export interface NodeMCURelayMethod {
    pin ?: number,
    reverse ?: boolean,
    state ?: boolean
}