import {ConfigExpressJS} from "../../Interfaces/Config/Express";
import express, {Express, Router} from "express";

export const EXPRESS = async (config: ConfigExpressJS): Promise<Express> => {
    let app: Express;
    let router: Router;
    return new Promise(async (resolve, rejected) => {
        app = await express();
        router = await Router();
        if (config.routes !== undefined) {
            await config.routes(router);
        }
        await app.use(router)
        resolve(app);
    })
}

export default EXPRESS;