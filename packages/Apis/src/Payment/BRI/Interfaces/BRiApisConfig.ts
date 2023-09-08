import {BRI_DEVELOPMENT, BRI_PRODUCTION} from "../Types/TypesBRIApis";


export interface BRIApisConfigGetToken {
    client_key : string,
    client_secret : string
}
export interface BRIApisConfig {
    state ?: BRI_PRODUCTION | BRI_DEVELOPMENT,
    host ?: string
}

export default BRIApisConfig;