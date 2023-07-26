import {Server} from "socket.io";
import {merge} from "lodash";


export function SocketIOEngineHeaders(Socket : Server) : Server {
    let mHeader : any = {};
    Socket.engine.on("headers", async (header : any, req : any) => {
        let mPackageJson = require("./../../../../package.json");
        mHeader = {
            "framework-version" : mPackageJson.version,
            "framework-name" : mPackageJson.name,
            "framework-author-name" : mPackageJson.author.name,
            "framework-author-email" : mPackageJson.author.email,
            "Strict-Transport-Security" : "max-age=60; includeSubDomains"
        }
        header = merge(header, mHeader);
    });

    return Socket;
}

export default SocketIOEngineHeaders;