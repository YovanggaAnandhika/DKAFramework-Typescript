import { Arduino, Escpos, Options } from "./../src"


(async () => {

    /*const print = new Escpos({
        engine : Options.ESCPOS.ESCPOS_USB,
        autoDetectUSB : true,
        settings : {
            autoReinitialize : true
        }
    });

    await print.Print(async (print) => {
        print.font("a")
            .align("ct")
            .style("bu")
            .size(1, 1)
            .text("Test Print Barcode")
            .barcode(112233445566, "CODE39", { width: 1, height: 80 })
            .feed(2);
    });*/


    await Arduino({
        type : Options.ARDUINO.ARDUINO_TYPE_SERIAL,
        path : "COM5",
        debug : true,
        repl : true,
        device : {
            board : {
                onReady : async (IO) => {

                    let indicator = new IO.Led(2);
                    indicator.blink(200);
                    console.log("ready 2")
                },
                onClose : async () => {
                    console.log("device close")
                },
                onError : async (error) => {
                    console.log("device on error", error)
                }
            }
        },
        fork : true
    });
})();