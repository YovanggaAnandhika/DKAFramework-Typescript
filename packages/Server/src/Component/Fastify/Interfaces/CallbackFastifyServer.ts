import {ConfigFastifyServer} from "./ConfigFastifyServer";


export interface CallbackFastifyServer {
    status ?: boolean,
    code ?: number,
    msg ?: string,
    config ?: ConfigFastifyServer | undefined
    error ?: undefined | Error
}