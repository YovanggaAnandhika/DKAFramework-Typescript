import {NodeMCUConfigUSB, NodeMCUConfigWifi, NodeMCULedMethod, NodeMCURelayMethod} from "../Interfaces/NodeMCUConfig";
import NodeMCU from "../index";


export const DefaultConfigConstructorNodeMCUWifi : NodeMCUConfigWifi = {
    mode : "WIFI_MODE",
    host : "192.168.137.101",
    port : 58888,
    repl : false
};

export const DefaultConfigConstructorNodeMCUUSB : NodeMCUConfigUSB = {
    mode : "USB_MODE",
    port : "COM5",
    repl : false
};

export const DefaultConfigLedMethod : NodeMCULedMethod = {
    pin : 2,
    reverse : false,
    state : false
}

export const DefaultConfigRelayMethod : NodeMCURelayMethod = {
    pin : 2,
    reverse : false,
    state : false
}