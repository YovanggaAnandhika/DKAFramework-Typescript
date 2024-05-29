import {Aminos, Time} from "../src";
(async () => {

    const data = Time.timeIsBetween<{ b ?: any }>([
        { id : "Jadwal 1", start : "08:00", end : "15:00"},
        { id : "jadwal 2", start : '15:00', end : "23:00" },
        { id : "Jadwal 3", start : '23:00', end : "07:00"}
    ]);

    console.log(data);


})()
