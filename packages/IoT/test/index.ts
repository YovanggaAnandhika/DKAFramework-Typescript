import { Board, Led } from "johnny-five";


(async () => {

    let board = new Board();

    board.on("ready", () => {
        let LED = new Led(4);
        LED.blink(800);
    })

})();