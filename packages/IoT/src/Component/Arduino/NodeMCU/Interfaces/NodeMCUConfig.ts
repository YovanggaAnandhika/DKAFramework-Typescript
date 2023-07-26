import {BoardOption} from "johnny-five";


export interface NodeMCUConfig extends BoardOption {

}

export type LED_MODE_NORMAL = "LED_MODE_NORMAL";
export type LED_MODE_TOGGLE = "LED_MODE_TOGGLE";

export interface NodeMCULedMethodNormal {
    pin ?: number,
    mode ?: LED_MODE_NORMAL,
    state ?: boolean
}

export interface NodeMCULedMethodToggle {
    pin ?: number,
    mode ?: LED_MODE_TOGGLE,
    reverse ?: boolean,
    bounceInterval ?: number
}

export type NodeMCULedMethod = NodeMCULedMethodNormal | NodeMCULedMethodToggle