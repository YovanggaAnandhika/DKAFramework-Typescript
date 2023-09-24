import utils from "../src";
import {MessageMedia, Client, LocalAuth} from "whatsapp-web.js";

/** **/
/*let data = utils.Functions.Component.TimeManagement.estimationCostFromTime({
    data : {
        hours : 2,
        days : 4
    },
    settings : {
        hours : {
            cost : 3000,
            costMax : 9000
        },
        days : {
            cost : 5000,
            costMax : 15000
        }
    }
})*/
import * as qrcode from "qrcode-terminal";
import * as path from "path";

(async () => {

    let client = new Client({
        authStrategy : new LocalAuth({
            clientId : "dhika",
            dataPath : path.join(__dirname, "./sessions")
        }),
        puppeteer: {
            //headless: true,
            args: ['--no-sandbox'],
        }
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', async (message) => {
        if (message.body === "hallo"){
            await utils.Functions.Component.PDF({
                doc : async (doc) => {
                    await doc.addPage({
                        layout : "landscape",
                        size : "A4"
                    });

                    await doc.fontSize(16)
                    await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                    await doc.fontSize(14)
                    await doc.text("Laporan Shift Per Kasir", { align : "center"})

                    await doc.table({
                        title: "Laporan Shift Per Kasir",
                        subtitle: "22-09-20023 s/d 23-09-2023",
                        headers: [ "CASHIER NAME", "SUB INCOME", "FEE", "MANUAL", "SUM INCOME" ],
                        rows: [
                            [ "Yovangga Anandika", "Rp. 0", "Rp. 0", "-", "-" ],
                            [ "Yovangga Anandika", "Rp. 0", "Rp. 0", "-", "-" ],
                            [ "Yovangga Anandika", "Rp. 0", "Rp. 0", "-", "-" ],
                        ],
                    });

                    await doc.addPage({
                        layout : "landscape",
                        size : "A4"
                    });

                    await doc.fontSize(16)
                    await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                    await doc.fontSize(14)
                    await doc.text("Laporan Jumlah Kendaraan Per Kasir", { align : "center"})

                    await doc.table({
                        title: "Laporan Kendaraan Per Kasir",
                        subtitle: "22-09-20023 s/d 23-09-2023",
                        headers: [ "TYPE UNIT", "REGULAR", "FREE", "LOST", "SUM KENDARAAN" ],
                        rows: [
                            [ "MOTOR", "0", "0", "0", "0" ],
                            [ "MOBIL", "0", "0", "0", "0" ],
                            [ "BOX/TRUCK", "0", "0", "0", "0" ],
                        ],
                    });

                    await doc.addPage({
                        layout : "landscape",
                        size : "A4"
                    });

                    await doc.fontSize(16)
                    await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                    await doc.fontSize(14)
                    await doc.text("Laporan Kendaraan Keluar", { align : "center"})

                    await doc.table({
                        title: "Laporan Kendaraan Keluar",
                        subtitle: "22-09-20023 s/d 23-09-2023",
                        headers: [ "TICKET NUMBER", "PLAT LICENCE", "TYPE UNIT", "PARKING IN", "PARKING DURATION", "PARKING OUT", "FEE", "BILL" ],
                        rows: [
                            [ "DDXXXXA", "-", "-", "-", "-","-", "-", "-" ],
                            [ "DDXXXXA", "-", "-", "-", "-","-", "-", "-" ],
                            [ "DDXXXXA", "-", "-", "-", "-","-", "-", "-" ],
                        ],
                    });

                    await doc.text("DKA Parking OS Alpha Project V.1.0",{ align : "right"})


                },
                outputType : utils.Functions.Options.PDF.OUTPUT_BASE64,
                settings : {
                    autoFirstPage : false,
                    autoDelete : true
                }
            }).then(async (res) => {
                const media = new MessageMedia('application/pdf', res.data.base64, res.data.filename);
                await client.sendMessage(message.from, media, { caption : `${res.data.filename}, ${res.data.sizeExt}`})
            }).catch(async (error) => {
                console.error(error)
            });
        }
    });

    await client.initialize();


})();