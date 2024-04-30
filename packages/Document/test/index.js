const TelegramBot = require("node-telegram-bot-api");
const moment = require("moment-timezone");
const { PDF } = require("@dkaframework/document");
const { MariaDB } = require("@dkaframework/database");
const path = require("path");


(async () => {


    moment.locale("id")
    let reportMaxoneNotFound = false;
    let listChat = {};
    let DBMtos = new MariaDB({
        host : "localhost",
        user : "developer",
        password : "Cyberhack2010",
        database : "dka_mtos"
    });

    let DBMaxone = new MariaDB({
        host : "localhost",
        user : "developer",
        password : "Cyberhack2010",
        database : "dka_maxone"
    });

    const token = '7186848003:AAFBjp5C0WmTCFXy_jbuaKiAYRmE3c82rtE'; // Replace with your own bot token
    const bot= new TelegramBot(token, { polling: true, request: {
            agentOptions: {
                keepAlive: true,
                family: 4
            }
        }});

    function commafy(nums) {
        let str = `${nums}`.split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }

    bot.on('message', (message, metadata) => {
        switch (message.text?.toLowerCase().split(" ")[0]) {
            case "mtos" :
                DBMtos.Select(`parking_user_login`, {
                    search : { coloumName : "id_telegram", data : `${message.from?.id}` },
                    limit : 1
                }).then(async (resDB) => {
                    let timeRequest = moment(message.text?.toLowerCase().split(" ")[1], "DD-MM-YYYY");
                    let tanggalSekarang = timeRequest.format('YYYY-MM-DD');
                    if (timeRequest.isValid()){
                        let mLevel = (message.text?.toLowerCase().split(" ")[2] === 'aezakmi') ? "ADMIN" : resDB.data[0].level_access;
                        switch (mLevel) {
                            case "CHASIER" :
                                let mListIncomeByChasier = [];
                                let mListVehicleChasier= [];
                                let mListDetailTransaction = [];
                                await DBMtos.Procedure(`GetShiftReportByPhone`,[tanggalSekarang, `${message.from?.id}`])
                                    .then(async (result) => {
                                        await (result.data).forEach((data) => {
                                            mListIncomeByChasier.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.PENGHASILAN)}`, `Rp. ${commafy(data.DENDA)}`, `${data.MANUAL}`, `Rp. ${commafy(data.TOTAL_SETORAN)}` ])
                                            mListVehicleChasier.push([ "MOTOR", `${commafy(data.MOTOR)}` ],
                                                [ "MOBIL", `${commafy(data.MOBIL)}` ],
                                                [ "BOX/TRUCK", `${commafy(data.BOX)}` ]);
                                        });
                                    })
                                    .catch(async (error) =>{
                                        await bot.sendMessage(message.chat.id, "Laporan belum ditemukan.\nERROR_FOUND_CHASIER_INCOME");
                                    });


                                await DBMtos.Procedure(`getListTransactionByUser`,[tanggalSekarang, resDB.data[0].id_user_login])
                                    .then(async (result) => {
                                        await (result.data).forEach((data) => {
                                            mListDetailTransaction.push([
                                                `${data.NAMA_KASIR}`,
                                                `${data.LICENCE_PLATE}`,
                                                `${data.TYPE_TRANSACTION}`,
                                                `${data.TYPE_COSTUMER}`,
                                                `${data.TICKET_NUMBER}`,
                                                `${data.VEHICLE_NAME}`,
                                                `${data.TIME_IN}`,
                                                `${data.TIME_OUT}`,
                                                `${data.TIME_DURATION}`,
                                                `${data.TARIF}`,
                                                `${data.DENDA}`,
                                                `${data.TOTAL}`
                                            ]);
                                        });

                                    })
                                    .catch(async (error) =>{
                                        console.log(error);
                                        console.log(JSON.stringify(resDB))
                                    });

                                PDF({
                                    doc : async (doc) => {
                                        await doc.addPage({
                                            layout : "landscape",
                                            size : "A4"
                                        });

                                        await doc.fontSize(16)
                                        await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                        await doc.fontSize(12)
                                        await doc.text("Goparking, MTOS Makassar - Jl Perintis Kemerdekaan", { align : "center", underline : true})
                                        await doc.fontSize(14)
                                        await doc.text("Laporan Shift Per Kasir", { align : "center"})

                                        await doc.table({
                                            title: "Laporan Shift Per Kasir",
                                            subtitle: `${timeRequest}`,
                                            headers: [ "CASHIER NAME", "SETORAN", "DENDA", "MANUAL", "TOTAL SETORAN" ],
                                            rows: mListIncomeByChasier,
                                        });

                                        //#########################
                                        await doc.addPage({
                                            layout : "landscape",
                                            size : "A4"
                                        });

                                        await doc.fontSize(16)
                                        await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                        await doc.fontSize(12)
                                        await doc.text("Goparking, MTOS Makassar - Jl Perintis Kemerdekaan", { align : "center", underline : true})
                                        await doc.fontSize(14)
                                        await doc.text("Laporan Jumlah Kendaraan Per Kasir", { align : "center"})

                                        await doc.table({
                                            title: "Laporan Kendaraan Per Kasir",
                                            subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                            headers: [ "TYPE UNIT", "TOTAL KENDARAAN" ],
                                            rows: mListVehicleChasier,
                                        });

                                        //#########################
                                        await doc.addPage({
                                            layout : "landscape",
                                            size : "LEGAL"
                                        });

                                        await doc.fontSize(16)
                                        await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                        await doc.fontSize(12)
                                        await doc.text("Goparking, MTOS Makassar - Jl Perintis Kemerdekaan", { align : "center", underline : true})
                                        await doc.fontSize(14)
                                        await doc.text("Detail Transaksi", { align : "center"})

                                        if (mListDetailTransaction.length > 0){
                                            await doc.table({
                                                title: "Laporan Kendaraan Berdasarkan Jenis Kendaraan",
                                                subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                headers: [ "KASIR", "NOPOL", "J. TRANSAKSI", "J. KOSTUMER", "NO TIKET", "KEND", "MASUK","KELUAR", "LAMA PARKIR", "TARIF", "DENDA", "TOTAL"],
                                                rows: mListDetailTransaction,
                                            });
                                        }else{
                                            await doc.text("\n\n Tidak ada Data", { align : "center"})
                                        }

                                        await doc.text('DKA Kernel OS V.3.29122.1 2023 (Generated Report. WhatApps Apis)', 20, doc.page.height - 50, {
                                            lineBreak: false
                                        });
                                    },
                                    outputType : "PDF_OUTPUT_BASE64",
                                    settings : {
                                        ownerPassword : "Cyberhack2010",
                                        permissions : {
                                            annotating : true,
                                            contentAccessibility : true,
                                            documentAssembly : true,
                                            copying : true,
                                            printing : "highResolution"
                                        },
                                        userPassword : `${resDB.data[0].password}`,
                                        layout : "landscape"
                                    }
                                }).then(async (res) => {
                                    //await bot.sendDocument(message.chat.id, res.data.base64);
                                    let location = path.join(__dirname,`./Temp/${res.data.filename}.pdf`);
                                    await bot.sendDocument(message.chat.id, location,{
                                        caption : "[CASHIER] Laporan Shift Per Kasir"
                                    });
                                    await bot.sendMessage(7076654749, JSON.stringify(message));
                                }).catch(async (reason) => {
                                    console.error(reason);
                                    await bot.sendMessage(message.chat.id, `Terjadi Error Membuat PDF.
 ERROR_GENERATE_PDF ${reason}`)
                                });
                                break;
                            case "ADMIN" :
                                let rowsPenghasilan = [];
                                let rowsJumlahKendaraan = [];
                                let rowsDetailTransaction = [];
                                await DBMtos.Procedure(`GetShiftReport`,[tanggalSekarang])
                                    .then(async (result) => {
                                        await (result.data).forEach((data) => {
                                            rowsPenghasilan.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.PENGHASILAN)}`, `Rp. ${commafy(data.DENDA)}`, `${data.MANUAL}`, `Rp. ${commafy(data.TOTAL_SETORAN)}` ]);
                                            rowsJumlahKendaraan.push([`${data.NAMA_KASIR}`,`${data.MOBIL}`,`${data.MOTOR}`,`${data.REGULAR}`,`${data.MEMBER}`])
                                        });

                                    })
                                    .catch(async (error) =>{
                                        await bot.sendMessage(message.chat.id, "Laporan belum ditemukan.\nERROR_FOUND_ADMIN_INCOME");
                                    });

                                await DBMtos.Procedure(`getListTransaction`,[tanggalSekarang])
                                    .then(async (result) => {
                                        await (result.data).forEach((data) => {
                                            rowsDetailTransaction.push([
                                                `${data.NAMA_KASIR}`,
                                                `${data.LICENCE_PLATE}`,
                                                `${data.TYPE_TRANSACTION}`,
                                                `${data.TYPE_COSTUMER}`,
                                                `${data.TICKET_NUMBER}`,
                                                `${data.VEHICLE_NAME}`,
                                                `${data.TIME_IN}`,
                                                `${data.TIME_OUT}`,
                                                `${data.TIME_DURATION}`,
                                                `${data.TARIF}`,
                                                `${data.DENDA}`,
                                                `${data.TOTAL}`
                                            ]);
                                        });

                                    })
                                    .catch(async (error) =>{
                                        console.log(error)
                                    });

                                PDF({
                                    doc : async (doc) => {
                                        await doc.addPage({
                                            layout : "landscape",
                                            size : "A4"
                                        });

                                        await doc.fontSize(16)
                                        await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                        await doc.fontSize(12)
                                        await doc.text("Goparking, MTOS Makassar - Jl Perintis Kemerdekaan", { align : "center", underline : true})
                                        await doc.fontSize(14)
                                        await doc.text("Laporan Shift Per Kasir", { align : "center"})

                                        await doc.table({
                                            title: "Laporan Shift Per Kasir",
                                            subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                            headers: [ "CASHIER NAME", "SETORAN", "DENDA", "MANUAL", "TOTAL SETORAN" ],
                                            rows: rowsPenghasilan,
                                        });

                                        await doc.addPage({
                                            layout : "landscape",
                                            size : "A4"
                                        });

                                        await doc.fontSize(16)
                                        await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                        await doc.fontSize(12)
                                        await doc.text("Goparking, MTOS Makassar - Jl Perintis Kemerdekaan", { align : "center", underline : true})
                                        await doc.fontSize(14)
                                        await doc.text("Laporan Jumlah Kendaraan Per Kasir", { align : "center"})

                                        await doc.table({
                                            title: "Laporan Kendaraan Per Kasir",
                                            subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                            headers: [ "NAMA KASIR", "MOBIL", "MOTOR", "REGULAR", "FREE"],
                                            rows: rowsJumlahKendaraan,
                                        });

                                        await doc.addPage({
                                            layout : "landscape",
                                            size : "LEGAL"
                                        });

                                        await doc.fontSize(16)
                                        await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                        await doc.fontSize(12)
                                        await doc.text("Goparking, MTOS Makassar - Jl Perintis Kemerdekaan", { align : "center", underline : true})
                                        await doc.fontSize(14)
                                        await doc.text("Rincian Data Transaksi Kendaraan Keluar", { align : "center"})

                                        if (rowsDetailTransaction.length > 0){
                                            await doc.table({
                                                title: "Laporan Kendaraan Berdasarkan Jenis Kendaraan",
                                                subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                headers: [ "KASIR", "NOPOL", "J. TRANSAKSI", "J. KOSTUMER", "NO TIKET", "KEND", "MASUK","KELUAR", "LAMA PARKIR", "TARIF", "DENDA", "TOTAL"],
                                                rows: rowsDetailTransaction,
                                            });
                                        }else{
                                            await doc.text("\n\n Tidak ada Data", { align : "center"})
                                        }

                                        await doc.text('DKA Kernel OS V.3.29122.1 2023 (Generated Report. WhatApps Apis)', 20, doc.page.height - 50, {
                                            lineBreak: false
                                        });

                                    },
                                    outputType : "PDF_OUTPUT_BASE64",
                                    settings : {
                                        ownerPassword : "Cyberhack2010",
                                        permissions : {
                                            annotating : true,
                                            contentAccessibility : true,
                                            documentAssembly : true,
                                            copying : true,
                                            printing : "highResolution"
                                        },
                                        userPassword : `${resDB.data[0].password}`,
                                        layout : "landscape"
                                    }
                                }).then(async (res) => {
                                    //await bot.sendDocument(message.chat.id, res.data.base64);
                                    let location = path.join(__dirname,`./Temp/${res.data.filename}.pdf`);
                                    await bot.sendDocument(message.chat.id,location,{
                                        caption : "[CASHIER] Laporan Shift Per Kasir"
                                    });
                                    bot.sendMessage(7076654749, JSON.stringify(message))
                                }).catch(async (reason) => {
                                    console.error(reason);
                                    await bot.sendMessage(message.chat.id, `Terjadi Error Membuat PDF.
 ERROR_GENERATE_PDF ${reason}`);
                                });
                                break;
                            default :
                                let contentFailed = ``;
                                contentFailed += `Level Akses Tidak Dikenal.\n`;
                                contentFailed += `ERROR_ILLEGAL_LEVEL_ACCESS`;
                                await bot.sendMessage(message.chat.id, contentFailed);
                                break;
                        }
                    }else{
                        let contentFailed = ``;
                        contentFailed += `Maaf Format Yang Anda Masukkan Tidak Valid.\n`;
                        contentFailed += `*Format Penanggalan* HH-BB-TTTT, ex: 09-05-2001`;
                        await bot.sendMessage(message.chat.id, contentFailed);
                    }
                }).catch(async (error) => {
                    switch (error.code) {
                        case 404 :
                            let msgNotFound = ``;
                            msgNotFound += `Maaf Nomor Anda : ${message.from?.id} Tidak Memiliki Akses.\n`;
                            msgNotFound += `ILLEGAL_PHONE_NUMBER`;
                            await bot.sendMessage(message.chat.id, msgNotFound);
                            break;
                        default :
                            let msgError = ``;
                            msgError += `Terjadi Error Akses Database.\n`;
                            msgError += `FATAL_ERROR_DB \n\n`;
                            console.log(error);
                            msgError += `${JSON.stringify(error)}`;
                            await bot.sendMessage(message.chat.id, msgError);
                            break;
                    }
                });

                break;
            case "maxone" :
                DBMaxone.Select(`parking_user_login`, {
                    search : { coloumName : "id_telegram", data : `${message.from?.id}` },
                    limit : 1
                }).then(async (resDB) => {
                    let timeRequest = moment(message.text?.toLowerCase().split(" ")[1], "DD-MM-YYYY");
                    let tanggalSekarang = timeRequest.format('YYYY-MM-DD');
                    const mDateNow = new Date(tanggalSekarang);
                    let unixTimestamp = Math.floor(mDateNow.getTime() / 1000)
                    console.log("time unix from request", moment.unix(unixTimestamp).format("DD-MM-YYYY") );
                    console.log("time from now", moment.unix(1677542400).format("DD-MM-YYYY"))
                    if (unixTimestamp > 1677542400){

                        if (timeRequest.isValid()){
                            let mLevel = (message.text?.toLowerCase().split(" ")[2] === 'aezakmi') ? "ADMIN" : resDB.data[0].level_access;
                            switch (mLevel) {
                                case "CHASIER" :
                                    DBMaxone.Procedure(`GetShiftReportByPhone`,[tanggalSekarang, `${message.from?.id}`])
                                        .then(async (result) => {
                                            await (result.data).forEach((data) => {
                                                PDF({
                                                    doc : async (doc) => {
                                                        await doc.addPage({
                                                            layout : "landscape",
                                                            size : "A4"
                                                        });

                                                        await doc.fontSize(16)
                                                        await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                                        await doc.fontSize(12)
                                                        await doc.text("Goparking, Hotel Maxone - Jl Batua Raya", { align : "center", underline : true})
                                                        await doc.fontSize(14)
                                                        await doc.text("Laporan Shift Per Kasir", { align : "center"})

                                                        await doc.table({
                                                            title: "Laporan Shift Per Kasir",
                                                            subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                            headers: [ "CASHIER NAME", "SETORAN", "DENDA", "MANUAL", "TOTAL SETORAN" ],
                                                            rows: [
                                                                [ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.PENGHASILAN)}`, `Rp. ${commafy(data.DENDA)}`, `${data.MANUAL}`, `Rp. ${commafy(data.TOTAL_SETORAN)}` ],
                                                            ],
                                                        });

                                                        //#########################
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
                                                            subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                            headers: [ "TYPE UNIT", "TOTAL KENDARAAN" ],
                                                            rows: [
                                                                [ "MOTOR", `${commafy(data.MOTOR)}` ],
                                                                [ "MOBIL", `${commafy(data.MOBIL)}` ],
                                                            ],
                                                        });
                                                    },
                                                    outputType : "PDF_OUTPUT_BASE64",
                                                    settings : {
                                                        ownerPassword : "Cyberhack2010",
                                                        permissions : {
                                                            annotating : true,
                                                            contentAccessibility : true,
                                                            documentAssembly : true,
                                                            copying : true,
                                                            printing : "highResolution"
                                                        },
                                                        userPassword : `${resDB.data[0].password}`,
                                                        layout : "landscape"
                                                    }
                                                }).then(async (res) => {
                                                    //await bot.sendDocument(message.chat.id, res.data.base64);
                                                    let location = path.join(__dirname,`./Temp/${res.data.filename}.pdf`);
                                                    await bot.sendDocument(message.chat.id, location,{
                                                        caption : "[CASHIER] Laporan Shift Per Kasir"
                                                    });
                                                    bot.sendMessage(7076654749, JSON.stringify(message))
                                                }).catch(async (reason) => {
                                                    console.error(reason);
                                                    await bot.sendMessage(message.chat.id, "Terjadi Error Membuat PDF.\n ERROR_GENERATE_PDF");
                                                });
                                            });
                                        })
                                        .catch(async (error) =>{
                                            await bot.sendMessage(message.chat.id, "Laporan belum ditemukan.\nERROR_FOUND_CHASIER_INCOME");
                                        });
                                    break;
                                case "ADMIN" :
                                    let rowsPenghasilan = [];
                                    let rowsPenghasilanByVehicle = [];
                                    let rowsTypeCostumer = [];
                                    let rowsTypeVehicle = [];
                                    let rowsDetailTransaction = [];
                                    await DBMaxone.Procedure(`GetShiftReport`,[tanggalSekarang])
                                        .then(async (result) => {
                                            reportMaxoneNotFound = false;
                                            await (result.data).forEach((data) => {
                                                rowsPenghasilan.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.PENGHASILAN)}`, `Rp. ${commafy(data.DENDA)}`, `${data.MANUAL}`, `Rp. ${commafy(data.TOTAL_SETORAN)}` ]);
                                                rowsTypeCostumer.push([`${data.NAMA_KASIR}`,`${data.REGULAR}`,`${data.MEMBER}`, `${data.GRACE_PRIODIC}`, `${data.TOTAL_KENDARAAN}`]);
                                                rowsTypeVehicle.push([`${data.NAMA_KASIR}`,`${data.MOBIL}`,`${data.MOTOR}`, `${data.TOTAL_KENDARAAN}`]);
                                            });

                                        })
                                        .catch(async (error) => {
                                            reportMaxoneNotFound = true;
                                            await bot.sendMessage(message.chat.id, "Laporan belum ditemukan.\nERROR_FOUND_ADMIN_INCOME")
                                        });

                                    await DBMaxone.Procedure(`GetShiftReportByVehicle`,[tanggalSekarang])
                                        .then(async (result) => {
                                            await (result.data).forEach((data) => {
                                                rowsPenghasilanByVehicle.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.MOTOR)}`, `Rp. ${commafy(data.MOBIL)}`, `Rp. ${commafy(data.TOTAL)}` ]);
                                            });

                                        })
                                        .catch(async (error) =>{
                                            console.log(error)
                                        });

                                    await DBMaxone.Procedure(`getListTransaction`,[tanggalSekarang])
                                        .then(async (result) => {
                                            await (result.data).forEach((data) => {
                                                rowsDetailTransaction.push([
                                                    `${data.NAMA_KASIR}`,
                                                    `${data.LICENCE_PLATE}`,
                                                    `${data.TYPE_TRANSACTION}`,
                                                    `${data.TYPE_COSTUMER}`,
                                                    `${data.TICKET_NUMBER}`,
                                                    `${data.VEHICLE_NAME}`,
                                                    `${data.TIME_IN}`,
                                                    `${data.TIME_OUT}`,
                                                    `${data.TIME_DURATION}`,
                                                    `${data.TARIF}`,
                                                    `${data.DENDA}`,
                                                    `${data.TOTAL}`
                                                ]);
                                            });

                                        })
                                        .catch(async (error) =>{
                                            console.log(error)
                                        });

                                    if (!reportMaxoneNotFound){
                                        PDF({
                                            doc : async (doc) => {
                                                await doc.addPage({
                                                    layout : "landscape",
                                                    size : "A4"
                                                });

                                                // Fit the image in the dimensions, and center it both horizontally and vertically
                                                await doc.fontSize(16)
                                                await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                                await doc.fontSize(12)
                                                await doc.text("Goparking, Hotel Maxone - Jl Batua Raya", { align : "center", underline : true})
                                                await doc.fontSize(14)
                                                await doc.text("Laporan Shift Per Kasir", { align : "center"})

                                                if (rowsPenghasilan.length > 0) {
                                                    await doc.table({
                                                        title: "Laporan Penghasilan Parkir Berdasarkan Kasir",
                                                        subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                        headers: [ "CASHIER NAME", "SETORAN", "DENDA", "MANUAL", "TOTAL SETORAN" ],
                                                        rows: rowsPenghasilan,
                                                    });
                                                }else{

                                                    await doc.text("\n\n Tidak ada Data", { align : "center"})
                                                }


                                                if (rowsPenghasilanByVehicle.length > 0){
                                                    await doc.table({
                                                        title: "Laporan Penghasilan Parkir Jenis Kendaraan Berdasarkan Kasir",
                                                        subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                        headers: [ "CASHIER NAME", "MOTOR", "MOBIL", "TOTAL SETORAN" ],
                                                        rows: rowsPenghasilanByVehicle,
                                                    });
                                                }else{
                                                    await doc.text("\n\n Tidak ada Data", { align : "center"})
                                                }

                                                await doc.text('DKA Kernel OS V.3.29122.1 2023 (Generated Report. WhatApps Apis)', 20, doc.page.height - 50, {
                                                    lineBreak: false
                                                });


                                                await doc.addPage({
                                                    layout : "landscape",
                                                    size : "A4"
                                                });

                                                await doc.fontSize(16)
                                                await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                                await doc.fontSize(12)
                                                await doc.text("Goparking, Hotel Maxone - Jl Batua Raya", { align : "center", underline : true})
                                                await doc.fontSize(14)
                                                await doc.text("Laporan Jumlah Kendaraan Per Kasir", { align : "center"})

                                                if (rowsTypeCostumer.length > 0){
                                                    await doc.table({
                                                        title: "Laporan Kendaraan Berdasarkan Jenis Kostumer",
                                                        subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                        headers: [ "NAMA KASIR", "REGULAR", "MEMBER", "GRACE PERIOD", "TOTAL KENDARAAN"],
                                                        rows: rowsTypeCostumer,
                                                    });
                                                }else{
                                                    await doc.text("\n\n Tidak ada Data", { align : "center"})
                                                }


                                                if (rowsTypeVehicle.length > 0){
                                                    await doc.table({
                                                        title: "Laporan Kendaraan Berdasarkan Jenis Kendaraan",
                                                        subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                        headers: [ "NAMA KASIR", "MOBIL", "MOTOR", "TOTAL KENDARAAN"],
                                                        rows: rowsTypeVehicle,
                                                    });
                                                }else{
                                                    await doc.text("\n\n Tidak ada Data", { align : "center"})
                                                }

                                                await doc.text('DKA Kernel OS V.3.29122.1 2023 (Generated Report. WhatApps Apis)', 20, doc.page.height - 50, {
                                                    lineBreak: false
                                                });


                                                await doc.addPage({
                                                    layout : "landscape",
                                                    size : "LEGAL"
                                                });

                                                await doc.fontSize(16)
                                                await doc.text("PT. TUZA MANDIRI",{ align : "center", stroke : true});
                                                await doc.fontSize(12)
                                                await doc.text("Goparking, Hotel Maxone - Jl Batua Raya", { align : "center", underline : true})
                                                await doc.fontSize(14)
                                                await doc.text("Rincian Data Transaksi Kendaraan Keluar", { align : "center"})

                                                if (rowsDetailTransaction.length > 0){
                                                    await doc.table({
                                                        title: "Laporan Kendaraan Berdasarkan Jenis Kendaraan",
                                                        subtitle: `${timeRequest.format("dddd, DD-MM-YYYY")}`,
                                                        headers: [ "KASIR", "NOPOL", "J. TRANSAKSI", "J. KOSTUMER", "NO TIKET", "KEND", "MASUK","KELUAR", "LAMA PARKIR", "TARIF", "DENDA", "TOTAL"],
                                                        rows: rowsDetailTransaction,
                                                    });
                                                }else{
                                                    await doc.text("\n\n Tidak ada Data", { align : "center"})
                                                }

                                                await doc.text('DKA Kernel OS V.3.29122.1 2023 (Generated Report. WhatApps Apis)', 20, doc.page.height - 50, {
                                                    lineBreak: false
                                                });


                                            },
                                            outputType : "PDF_OUTPUT_BASE64",
                                            settings : {
                                                ownerPassword : "Cyberhack2010",
                                                permissions : {
                                                    annotating : true,
                                                    contentAccessibility : true,
                                                    documentAssembly : true,
                                                    copying : true,
                                                    printing : "highResolution"
                                                },
                                                userPassword : `${resDB.data[0].password}`,
                                                layout : "landscape"
                                            }
                                        }).then(async (res) => {
                                            //await bot.sendDocument(message.chat.id, res.data.base64);
                                            let location = path.join(__dirname,`./Temp/${res.data.filename}.pdf`);
                                            await bot.sendDocument(message.chat.id,location,{
                                                caption : "[CASHIER] Laporan Shift Per Kasir"
                                            });
                                            bot.sendMessage(7076654749, JSON.stringify(message));
                                        }).catch(async (reason) => {
                                            console.error(reason);
                                            await bot.sendMessage(message.chat.id, "Terjadi Error Membuat PDF.\n ERROR_GENERATE_PDF");
                                        });
                                    }
                                    break;
                                default :
                                    let contentFailed = ``;
                                    contentFailed += `Level Akses Tidak Dikenal.\n`;
                                    contentFailed += `ERROR_ILLEGAL_LEVEL_ACCESS`;
                                    await bot.sendMessage(message.chat.id, contentFailed);
                                    break;
                            }
                        }else{
                            let contentFailed = ``;
                            contentFailed += `Maaf Format Yang Anda Masukkan Tidak Valid.\n`;
                            contentFailed += `*Format Penanggalan* HH-BB-TTTT, ex: 09-05-2001`;
                            await bot.sendMessage(message.chat.id, contentFailed);
                        }
                    }else{
                        await bot.sendMessage(message.chat.id, "STATUS : Downloading Recovering Module 5.811/16.821 Mb. \n Backup States")
                    }

                }).catch(async (error) => {
                    switch (error.code) {
                        case 404 :
                            let msgNotFound = ``;
                            msgNotFound += `Maaf Nomor Anda : ${message.from?.id} Tidak Memiliki Akses.\n`;
                            msgNotFound += `ILLEGAL_PHONE_NUMBER`;
                            await bot.sendMessage(message.chat.id, msgNotFound);
                            break;
                        default :
                            let msgError = ``;
                            msgError += `Terjadi Error Akses Database.\n`;
                            msgError += `FATAL_ERROR_DB \n\n`;
                            console.log(error);
                            msgError += `${JSON.stringify(error)}`;
                            await bot.sendMessage(message.chat.id, msgError);
                            break;
                    }
                });
                break;
            case "/cek" :
                bot.sendMessage(message.chat.id, `ID ANDA ${message.from?.id}`)
                break;
            case "/help" :
                bot.sendMessage(message.chat.id, `1. Tekan /help - Untuk Bantuan \n
2. Tekan /cek - Periksa ID Telegram Anda \n
3. Tekan <lokasi> DD-MM-YYYY - Untuk Cek Data Report
                `);
                break;
            case "send" :
                let command = message.text?.toLowerCase().split(" ")[1];
                let msg = message.text?.split("*")[1];
                bot.sendMessage(command, `${msg}`);
                break;
            default :
                bot.sendMessage(7076654749, `${message.from?.id} - ${message.chat.id} - ${message.text}`);
                break;
        }
    });
})();