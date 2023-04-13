import {ConfigUDPServer, UDPList} from "./Interfaces/ConfigUDPServer";
import udp, { Socket } from "dgram";

export async function UDPSERVER(config : ConfigUDPServer) : Promise<Socket> {
    return new Promise(async (resolve, rejected) => {
        let mUdp = udp.createSocket("udp4");
        let mHost = (config.host !== undefined) ? config.host : "0.0.0.0";
        await mUdp.on("listening", async () => {
            await resolve(mUdp);
        });

        if (config.on?.Message !== undefined){
            await mUdp.on("message", config.on.Message);
        }
        await mUdp.bind(config.port, mHost)
    });
}

export default UDPSERVER;