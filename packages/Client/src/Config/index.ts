import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigClientTypes";
import {ConfigSocketIOClientInstanceSettingsPingMode} from "../Component/SocketIO/Interfaces/ConfigSocketIOClient";


const ConfigClientOptionsHost = {
    LOCALHOST : "localhost",
    WILDCARD : "0.0.0.0"
}

const ConfigClientOptionsState = {
    DEVELOPMENT : DEVELOPMENT,
    PRODUCTION : PRODUCTION
}

const ConfigClientOptionsSettingsSocketPingMode = {
    INTERVAL : "INTERVAL" as ConfigSocketIOClientInstanceSettingsPingMode,
    ON_EVENT : "ON_EVENT" as ConfigSocketIOClientInstanceSettingsPingMode
}
const ConfigClientOptionsSettingsSocket = {
    PING_MODE : ConfigClientOptionsSettingsSocketPingMode
}
const ConfigClientOptionsSettings = {
    SOCKET : ConfigClientOptionsSettingsSocket
}
const ConfigClientOptions = {
    STATE : ConfigClientOptionsState,
    HOST : ConfigClientOptionsHost,
    SETTINGS : ConfigClientOptionsSettings
}

export const Options = ConfigClientOptions;

export default ConfigClientOptions;