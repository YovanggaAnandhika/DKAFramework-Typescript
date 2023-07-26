import {DEVELOPMENT, ESCPOS_NETWORK, ESCPOS_USB, PRODUCTION} from "../Types/EscposTypes";


export const EscposOptions = {
    STATE : {
        DEVELOPMENT : DEVELOPMENT,
        PRODUCTION : PRODUCTION
    },
    CONNECTION : {
        ESCPOS_USB : ESCPOS_USB,
        ESCPOS_NETWORK : ESCPOS_NETWORK
    }
}

export default EscposOptions;