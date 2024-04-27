const os = require("os");
const { s905x } = require("@dkaframework/iot");

let IoT = new s905x.HG680P();
let loop = undefined;

process.on("SIGINT", () => {
    clearTimeout(loop);
    IoT.lan("dis");
});

process.on("exit", () => {
    clearTimeout(loop);
    IoT.lan("dis");
})

function functionLoop() {
    let ni = os.networkInterfaces();
    let niFilter = Object.keys(ni).find((interfaceName) => interfaceName === "eth0" || interfaceName === "wlan0");
    if (niFilter !== undefined){

        switch (niFilter) {
            case "eth0" :
                loop = setTimeout(() => {
                    IoT.lan("on");
                    loop = setTimeout(() => {
                        IoT.lan("dis");
                        functionLoop();
                    },100);
                },100);
                break;
            case "wlan0" :
                loop = setTimeout(() => {
                    IoT.lan("warn");
                    loop = setTimeout(() => {
                        IoT.lan("dis");
                        functionLoop();
                    },100);
                },100);
                break;
        }
    }else{
        loop = setTimeout(() => {
            IoT.lan("off");
            loop = setTimeout(() => {
                IoT.lan("dis");
                functionLoop();
            },100);
        },100);
    }
}
functionLoop();

