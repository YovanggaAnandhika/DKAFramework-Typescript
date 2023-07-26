import {AuthStrategy, ClientOptions, LocalAuth} from "whatsapp-web.js";
import path from "path";


export const DefaultConfigWhatappsAuthStrategy : AuthStrategy = new LocalAuth({
    dataPath : path.dirname(require.main?.filename!),
    clientId : "Default"
});

export const DefaultConfigWhatapps : ClientOptions = {
    authStrategy : DefaultConfigWhatappsAuthStrategy,
    puppeteer: {
        headless: true,
        args: ['--no-sandbox'],
    }
}