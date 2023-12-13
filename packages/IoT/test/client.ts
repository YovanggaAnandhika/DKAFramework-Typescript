import IoT from "../src";


(async () => {


    let printer = new IoT.Printer.Escpos({
        state : IoT.Printer.Escpos.Options.STATE.DEVELOPMENT,
        connection : IoT.Printer.Escpos.Options.CONNECTION.ESCPOS_NETWORK,
        address : "127.0.0.1",
        port : 2332,
        settings : {
            showSystem : true
        }
    })
    await printer.Job((printer) => {
        printer.text("halo")
        printer.feed(3)
        printer.text("halo")
    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.error(error)
    })



})();