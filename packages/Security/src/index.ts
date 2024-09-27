import Encryption from "./Component/Encryption";
import OpenSSL from "./Component/SSL";
import Greenlock from "./Component/Greenlock";


export const Security = {
    Encryption : Encryption,
    OpenSSL : OpenSSL,
    Greenlock : Greenlock
}

export { Encryption, OpenSSL, Greenlock }
export default Security