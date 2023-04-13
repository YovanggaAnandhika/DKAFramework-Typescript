import Fastify from "fastify";
import * as fs from "fs";
import * as path from "path";
import {readFileSync} from "fs";
import {join} from "path";

(async () => {
    let mFastify = Fastify({
        http2: true,
        https: {
            key: readFileSync(join(__dirname, "./Cert/Server/localhost.key")),
            cert: readFileSync(join(__dirname, "./Cert/Server/localhost.crt")),
            ca : readFileSync(join(__dirname,"./Cert/CA/localhost.crt"))
        }
    });

    mFastify.get("/", async (req, res) => {
        res.send({ halo : "dunia"})
    });

    mFastify.listen({ port : 3000 })
})();