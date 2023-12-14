import {DEVELOPMENT, ESCPOS_NETWORK, ESCPOS_SERIAL, ESCPOS_USB, PRODUCTION} from "../Types/EscposTypes";


export const EscposOptions = {
    STATE : {
        DEVELOPMENT : DEVELOPMENT,
        PRODUCTION : PRODUCTION
    },
    HOST : {
      WILDCARD : "0.0.0.0",
      LOCALHOST : "127.0.0.1"
    },
    CONNECTION : {
        ESCPOS_USB : ESCPOS_USB,
        ESCPOS_NETWORK : ESCPOS_NETWORK,
        ESCPOS_SERIAL : ESCPOS_SERIAL
    }
}
