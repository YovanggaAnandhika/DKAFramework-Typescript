import {
    NodeMCUButtonMethod,
    NodeMCUConfigUSB,
    NodeMCUConfigWifi,
    NodeMCULedMethod,
    NodeMCURelayMethod,
    RELAY_MODE_ONCE
} from "../Interfaces/NodeMCUConfig";


export const DefaultConfigConstructorNodeMCUWifi : NodeMCUConfigWifi = {
    mode : "WIFI_MODE",
    host : "192.168.137.101",
    port : 58888,
    reconnect : true,
    repl : false,
    timeout : 10000
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
    mode : RELAY_MODE_ONCE,
    reverse : false,
    state : false
}

export const DefaultConfigButtonMethod : NodeMCUButtonMethod = {
    pin : 2,
    holdtime : 1200
}