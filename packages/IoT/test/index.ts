import IoT from "../src";


(async () => {


    let printer = new IoT.Printer.Escpos({
        state : IoT.Printer.Escpos.Options.STATE.DEVELOPMENT,
        connection : IoT.Printer.Escpos.Options.CONNECTION.ESCPOS_USB
    })
    await printer.Server({ host : "0.0.0.0", port : 2332})
        .then(async (result) => {
            console.log(result);
        })
        .catch(async (error) => {
            console.error(error)
        })



})();