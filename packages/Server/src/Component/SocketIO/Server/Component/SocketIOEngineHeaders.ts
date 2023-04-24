import {Server} from "socket.io";
import {merge} from "lodash";


export function SocketIOEngineHeaders(Socket : Server) : Server {
    Socket.engine.on("headers", async (header : any, req : any) => {
        let mPackageJson = require("./../../../../../package.json");
        header["framework-version"] = mPackageJson.version;
        header["framework-name"] = mPackageJson.name;
        header["framework-author-name"] = mPackageJson.author.name;
        header["framework-author-email"] = mPackageJson.author.email;
    });

    return Socket;
}

export default SocketIOEngineHeaders;