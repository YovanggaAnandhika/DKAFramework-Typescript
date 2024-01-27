import IoT from "../src";


(async () => {


    let printer = new IoT.Printer.Escpos({
        state : IoT.Printer.Escpos.Options.STATE.DEVELOPMENT,
        connection : IoT.Printer.Escpos.Options.CONNECTION.ESCPOS_USB,
        settings : {
            showSystem : true,
            autoCut : false,
            showLibrary : true,
            showNetwork : true
        }
    })
    await printer.Job(async (printer) => {
        printer.text("halo")
        printer.feed(3)
        // @ts-ignore
        printer.barcode(`DKA8838382327732979932999444`,"CODE39",{ width : 25, height : 90, includeParity : false})
        printer.size(0.1,0.1)
        // @ts-ignore
        await printer.qrimage('DKA8838382327732979932999444', { type : "png", mode: 'normal', size : 6})

    }).then(async (result) => {
        console.log(result)
    }).catch(async (error) => {
        console.error(error)
    })



})();