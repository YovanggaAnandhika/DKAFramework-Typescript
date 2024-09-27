import {DEVELOPMENT, PRODUCTION} from "../Types/ConfigClientTypes";


export interface GlobalClientConfigInterfaces {
    state ?: DEVELOPMENT | PRODUCTION
    host ?: string,
    port ?: number
}
