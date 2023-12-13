import IoT from "../src";


(async () => {


    let printer = new IoT.Printer.Escpos({
        state : IoT.Printer.Escpos.Options.STATE.DEVELOPMENT,
        connection : IoT.Printer.Escpos.Options.CONNECTION.ESCPOS_USB
    })
    await printer.Job(async (print) => {
        print.barcode(281881818323,"CODE39",{ height : 60,width : 1, includeParity : false})
        print.text("CODE 39")
        print.feed(1)
        print.barcode(29970240450,"CODE39",{ height : 60,width : 1, includeParity : true})
        print.text("CODE 39")
        print.feed(1)
    }).catch(async (error) => {
        console.error(error)
    })



})();