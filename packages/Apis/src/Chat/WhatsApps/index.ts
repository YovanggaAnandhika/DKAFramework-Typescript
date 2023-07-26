import WA, {ClientOptions, Chat} from "whatsapp-web.js";
import _ from "lodash";
import {DefaultConfigWhatapps} from "./Config/DefaultConfigWhatapps";

export function WhatsApps(config ?: ClientOptions) : WA.Client {

    config = _.merge(DefaultConfigWhatapps, config);
    console.log(config)
    return new WA.Client(config);
}

export default WhatsApps;