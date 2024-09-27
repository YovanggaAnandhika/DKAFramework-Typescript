export * from "./Component/SocketIO";
export * from "./Component/UDP";
export * from "./Config";

import SocketIO from "./Component/SocketIO";
import UDP from "./Component/UDP";
import Config from "./Config";
export default {
    SocketIO : SocketIO,
    UDP : UDP,
    Options : Config
}

