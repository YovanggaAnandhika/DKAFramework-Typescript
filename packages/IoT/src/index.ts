import {Printer} from "./Component/Printer";
import {Arduino} from "./Component/Arduino"
import {s905x} from "./Component/s905x";

const IoT = {
    Printer : Printer,
    Arduino : Arduino,
    s905x : s905x
}

export { Printer, Arduino, s905x };
export default IoT;