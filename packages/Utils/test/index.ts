import { timeIsBetween } from "../src";

(async () => {

    const data = timeIsBetween([
        { id : "Shift 1", start : "07:00", end : "15:00" },
        { id : "Shift 2", start : '15:00', end : "23:00"},
        { id : "Shift 3", start : '23:00', end : "07:00"}
    ]);
    console.log(data);
})()
