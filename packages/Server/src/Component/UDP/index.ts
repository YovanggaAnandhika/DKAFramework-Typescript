import {ConfigUDPServer} from "./Interfaces/ConfigUDPServer";
import udp, {Socket} from "dgram";
import {Options} from "../../index";

export async function UDPSERVER(config : ConfigUDPServer) : Promise<Socket> {
    let mUdp : Socket;
    return new Promise(async (resolve) => {
        mUdp = await udp.createSocket("udp4");
        config.host = (config.state !== Options.STATE.PRODUCTION) ? config.host : "0.0.0.0";

        (config.on?.Listening !== undefined) ?
            await mUdp.on("listening", config.on.Listening) : null;

        (config.on?.Message !== undefined) ?
            await mUdp.on("message", config.on.Message) : null;

        await mUdp.bind(config.port, config.host, async () => {
            await resolve(mUdp);
        });

    });
}

export default UDPSERVER;