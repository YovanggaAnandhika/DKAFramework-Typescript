import {RemoteInfo} from "dgram";


export type UDP_ENGINE = "USER_DATA_PROTOCOL"

export type ConfigUDPServerOnMessage = (message : Buffer, info ?: RemoteInfo | undefined) => Promise<void> | void
export const UDP_ENGINE : UDP_ENGINE = "USER_DATA_PROTOCOL"
