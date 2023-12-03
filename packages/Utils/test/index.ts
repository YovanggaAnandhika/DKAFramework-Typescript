import WAWebJS, {Client, Buttons, LegacySessionAuth, LocalAuth, List, MessageMedia} from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import utils from "@dkaframework/utils";
import * as fs from "fs";
import * as path from "path";
import moment from "moment-timezone";
import {MariaDB} from "@dkaframework/database";

(async () => {
    moment.locale("id")
    let reportMaxoneNotFound = false;
    let listChat : { [ name : string ] : true | undefined } = {};
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

    const client = new Client({
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
    function commafy(nums : number) {
        let str = `${nums}`.split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }

    client.on('ready', async () => {
        console.log('Client is ready!');
    });

    client.on('message', async (message) => {
        let contact = await message.getContact();
        let name = contact.name;
        let number = contact.number;
        let n = contact.pushname;

        /*if (message.body.toLowerCase().length > 0){
            let msg = `Mohon Maaf Bpk/Ibu/Kak/Saudara *${n}*, Pemilik Whatapps ini Sedang Istirahat. \n \n`;
            msg += `Saya Akan Membalas Pesan Secepat Mungkin Ketika Sudah Online 🙏 🙏 🙏 \n\n`;
            msg += `ketik *help* Untuk menu bantuan Untuk Melihat Laporan .\n\n`;
            await client.sendMessage(message.from,msg);
        }*/

        switch (message.body.toLowerCase().split(" ")[0]) {
            case "mtos" :
                DBMtos.Select(`parking_user_login`, {
                    search : { coloumName : "phone", data : `+${number}`},
                    limit : 1
                }).then(async (resDB : any) => {
                    let timeRequest = moment(message.body.toLowerCase().split(" ")[1], "DD-MM-YYYY");
                    let tanggalSekarang = timeRequest.format('YYYY-MM-DD');
                    if (timeRequest.isValid()){
                        let mLevel = (message.body.toLowerCase().split(" ")[2] === 'aezakmi') ? "ADMIN" : resDB.data[0].level_access;
                        switch (mLevel) {
                            case "CHASIER" :
                                let mListIncomeByChasier : any[] = [];
                                let mListVehicleChasier : any[] = [];
                                let mListDetailTransaction : any[] = [];
                                await DBMtos.Procedure(`GetShiftReportByPhone`,[tanggalSekarang, `+${number}`])
                                    .then(async (result) => {
                                        await (result.data as any[]).forEach((data) => {
                                            mListIncomeByChasier.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.PENGHASILAN)}`, `Rp. ${commafy(data.DENDA)}`, `${data.MANUAL}`, `Rp. ${commafy(data.TOTAL_SETORAN)}` ])
                                            mListVehicleChasier.push([ "MOTOR", `${commafy(data.MOTOR)}` ],
                                                [ "MOBIL", `${commafy(data.MOBIL)}` ],
                                                [ "BOX/TRUCK", `${commafy(data.BOX)}` ]);
                                        });
                                    })
                                    .catch(async (error) =>{
                                        await client.sendMessage(message.from, "Laporan belum ditemukan.\nERROR_FOUND_CHASIER_INCOME").then(async (msg) => {
                                            setTimeout(() => {
                                                msg.delete(true)
                                            },(1000 * 60) * 5)
                                        });
                                    });

                                await DBMtos.Procedure(`getListTransactionByUser`,[tanggalSekarang, resDB.data[0].id_user_login])
                                    .then(async (result) => {
                                        await (result.data as any[]).forEach((data) => {
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
                                        console.log(error)
                                    });

                                utils.Functions.Component.PDF({
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
                                        autoFirstPage : false,
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
                                    const media = new MessageMedia('application/pdf', res.data.base64, `REPORT_${resDB.data[0].first_name}${resDB.data[0].last_name}_${res.data.filename}`);
                                    await client.sendMessage(message.from, media, { caption : `*gunakan password akun anda untuk membuka file pdf*, ${res.data.sizeExt} \n untuk keamanan data. pesan ini akan terhapus dalam 1 menit.`}).then(async (msg) => {
                                        setTimeout(() => {
                                            msg.delete(true);
                                        },1000 * 60)
                                    });
                                }).catch(async (reason) => {
                                    await client.sendMessage(message.from, "Terjadi Error Membuat PDF.\n ERROR_GENERATE_PDF").then(async (msg) => {
                                        setTimeout(() => {
                                            msg.delete(true)
                                        },(1000 * 60));
                                    });
                                });
                                break;
                            case "ADMIN" :
                                let rowsPenghasilan : Array<any>[] = [];
                                let rowsJumlahKendaraan : Array<any>[] = [];
                                let rowsDetailTransaction : Array<any>[] = [];
                                await DBMtos.Procedure(`GetShiftReport`,[tanggalSekarang])
                                    .then(async (result) => {
                                        await (result.data as any[]).forEach((data) => {
                                            rowsPenghasilan.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.PENGHASILAN)}`, `Rp. ${commafy(data.DENDA)}`, `${data.MANUAL}`, `Rp. ${commafy(data.TOTAL_SETORAN)}` ]);
                                            rowsJumlahKendaraan.push([`${data.NAMA_KASIR}`,`${data.MOBIL}`,`${data.MOTOR}`,`${data.REGULAR}`,`${data.MEMBER}`])
                                        });

                                    })
                                    .catch(async (error) =>{
                                        await client.sendMessage(message.from, "Laporan belum ditemukan.\nERROR_FOUND_ADMIN_INCOME").then(async (res) => {
                                            await res.delete(false)
                                        });
                                    });

                                await DBMtos.Procedure(`getListTransaction`,[tanggalSekarang])
                                    .then(async (result) => {
                                        await (result.data as any[]).forEach((data) => {
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

                                utils.Functions.Component.PDF({
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
                                        autoFirstPage : false,
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
                                    const media = new MessageMedia('application/pdf', res.data.base64, `REPORT_ADM_${resDB.data[0].first_name}${resDB.data[0].last_name}_${timeRequest.format("DD-MM-YYYY")}`);
                                    await client.sendMessage(message.from, media, { caption : `*gunakan password akun anda untuk membuka file pdf*, ${res.data.sizeExt}`});
                                }).catch(async (reason) => {
                                    await client.sendMessage(message.from, "Terjadi Error Membuat PDF.\n ERROR_GENERATE_PDF");
                                });
                                break;
                            default :
                                let contentFailed = ``;
                                contentFailed += `Level Akses Tidak Dikenal.\n`;
                                contentFailed += `ERROR_ILLEGAL_LEVEL_ACCESS`;
                                await client.sendMessage(message.from, contentFailed).then(async (res) => {
                                    await res.delete(false)
                                });
                                break;
                        }
                    }else{
                        let contentFailed = ``;
                        contentFailed += `Maaf Format Yang Anda Masukkan Tidak Valid.\n`;
                        contentFailed += `*Format Penanggalan* HH-BB-TTTT, ex: 09-05-2001`;
                        await client.sendMessage(message.from, contentFailed).then(async (res) => {
                            await res.delete(false)
                        });
                    }
                }).catch(async (error) => {
                    switch (error.code) {
                        case 404 :
                            let msgNotFound = ``;
                            msgNotFound += `Maaf Nomor Anda : +${number} Tidak Memiliki Akses.\n`;
                            msgNotFound += `ILLEGAL_PHONE_NUMBER`;
                            await client.sendMessage(message.from, msgNotFound).then(async (res) => {
                                await res.delete(false)
                            });
                            break;
                        default :
                            let msgError = ``;
                            msgError += `Terjadi Error Akses Database.\n`;
                            msgError += `FATAL_ERROR_DB \n\n`;
                            msgError += `${JSON.stringify(error)}`;
                            await client.sendMessage(message.from, msgError);
                            break;
                    }
                });

                break;
            case "maxone" :
                DBMaxone.Select(`parking_user_login`, {
                    search : { coloumName : "phone", data : `+${number}`},
                    limit : 1
                }).then(async (resDB : any) => {
                    let timeRequest = moment(message.body.toLowerCase().split(" ")[1], "DD-MM-YYYY");
                    let tanggalSekarang = timeRequest.format('YYYY-MM-DD');
                    const mDateNow = new Date(tanggalSekarang);
                    let unixTimestamp = Math.floor(mDateNow.getTime() / 1000)
                    console.log("time unix from request", moment.unix(unixTimestamp).format("DD-MM-YYYY") );
                    console.log("time from now", moment.unix(1677542400).format("DD-MM-YYYY"))
                    if (unixTimestamp > 1677542400){

                        if (timeRequest.isValid()){
                            let mLevel = (message.body.toLowerCase().split(" ")[2] === 'aezakmi') ? "ADMIN" : resDB.data[0].level_access;
                            switch (mLevel) {
                                case "CHASIER" :
                                    DBMaxone.Procedure(`GetShiftReportByPhone`,[tanggalSekarang, `+${number}`])
                                        .then(async (result) => {
                                            await (result.data as any[]).forEach((data) => {
                                                utils.Functions.Component.PDF({
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
                                                        autoFirstPage : false,
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
                                                    const media = new MessageMedia('application/pdf', res.data.base64, `REPORT_${resDB.data[0].first_name}${resDB.data[0].last_name}_${res.data.filename}`);
                                                    await client.sendMessage(message.from, media, { caption : `*gunakan password akun anda untuk membuka file pdf*, ${res.data.sizeExt} \n Untuk Kemananan Data. Pesan Ini Akan Terhapus Dalam 1 Menit`}).then(async (msg) => {
                                                        setTimeout(() => {
                                                            msg.delete(true)
                                                        },(1000 * 60))
                                                    });
                                                }).catch(async (reason) => {
                                                    await client.sendMessage(message.from, "Terjadi Error Membuat PDF.\n ERROR_GENERATE_PDF");
                                                });
                                            });
                                        })
                                        .catch(async (error) =>{
                                            await client.sendMessage(message.from, "Laporan belum ditemukan.\nERROR_FOUND_CHASIER_INCOME");
                                        });
                                    break;
                                case "ADMIN" :
                                    let rowsPenghasilan : Array<any>[] = [];
                                    let rowsPenghasilanByVehicle : Array<any>[] = [];
                                    let rowsTypeCostumer : Array<any>[] = [];
                                    let rowsTypeVehicle : Array<any>[] = [];
                                    let rowsDetailTransaction : Array<any>[] = [];
                                    await DBMaxone.Procedure(`GetShiftReport`,[tanggalSekarang])
                                        .then(async (result) => {
                                            reportMaxoneNotFound = false;
                                            await (result.data as any[]).forEach((data) => {
                                                rowsPenghasilan.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.PENGHASILAN)}`, `Rp. ${commafy(data.DENDA)}`, `${data.MANUAL}`, `Rp. ${commafy(data.TOTAL_SETORAN)}` ]);
                                                rowsTypeCostumer.push([`${data.NAMA_KASIR}`,`${data.REGULAR}`,`${data.MEMBER}`, `${data.GRACE_PRIODIC}`, `${data.TOTAL_KENDARAAN}`]);
                                                rowsTypeVehicle.push([`${data.NAMA_KASIR}`,`${data.MOBIL}`,`${data.MOTOR}`, `${data.TOTAL_KENDARAAN}`]);
                                            });

                                        })
                                        .catch(async (error) => {
                                            reportMaxoneNotFound = true;
                                            await client.sendMessage(message.from, "Laporan belum ditemukan.\nERROR_FOUND_ADMIN_INCOME").then(async (res) => {
                                                await res.delete(false)
                                            });
                                        });

                                    await DBMaxone.Procedure(`GetShiftReportByVehicle`,[tanggalSekarang])
                                        .then(async (result) => {
                                            await (result.data as any[]).forEach((data) => {
                                                rowsPenghasilanByVehicle.push([ `${data.NAMA_KASIR}`, `Rp. ${commafy(data.MOTOR)}`, `Rp. ${commafy(data.MOBIL)}`, `Rp. ${commafy(data.TOTAL)}` ]);
                                            });

                                        })
                                        .catch(async (error) =>{
                                            console.log(error)
                                        });

                                    await DBMaxone.Procedure(`getListTransaction`,[tanggalSekarang])
                                        .then(async (result) => {
                                            await (result.data as any[]).forEach((data) => {
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
                                        utils.Functions.Component.PDF({
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
                                                autoFirstPage : false,
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
                                            const media = new MessageMedia('application/pdf', res.data.base64, `REPORT_ADM_${resDB.data[0].first_name}${resDB.data[0].last_name}_${timeRequest.format("DD-MM-YYYY")}`);
                                            await client.sendMessage(message.from, media, { caption : `*gunakan password akun anda untuk membuka file pdf*, ${res.data.sizeExt}`});
                                        }).catch(async (reason) => {
                                            await client.sendMessage(message.from, "Terjadi Error Membuat PDF.\n ERROR_GENERATE_PDF");
                                        });
                                    }
                                    break;
                                default :
                                    let contentFailed = ``;
                                    contentFailed += `Level Akses Tidak Dikenal.\n`;
                                    contentFailed += `ERROR_ILLEGAL_LEVEL_ACCESS`;
                                    await client.sendMessage(message.from, contentFailed).then(async (res) => {
                                        await res.delete(false)
                                    });
                                    break;
                            }
                        }else{
                            let contentFailed = ``;
                            contentFailed += `Maaf Format Yang Anda Masukkan Tidak Valid.\n`;
                            contentFailed += `*Format Penanggalan* HH-BB-TTTT, ex: 09-05-2001`;
                            await client.sendMessage(message.from, contentFailed).then(async (res) => {
                                await res.delete(false)
                            });
                        }
                    }else{
                        await client.sendMessage(message.from, "Data Sedang Dalam Rekapitulasi")
                    }

                }).catch(async (error) => {
                    switch (error.code) {
                        case 404 :
                            let msgNotFound = ``;
                            msgNotFound += `Maaf Nomor Anda : +${number} Tidak Memiliki Akses.\n`;
                            msgNotFound += `ILLEGAL_PHONE_NUMBER`;
                            await client.sendMessage(message.from, msgNotFound).then(async (res) => {
                                await res.delete(false)
                            });
                            break;
                        default :
                            let msgError = ``;
                            msgError += `Terjadi Error Akses Database.\n`;
                            msgError += `FATAL_ERROR_DB \n\n`;
                            msgError += `${JSON.stringify(error)}`;
                            await client.sendMessage(message.from, msgError);
                            break;
                    }
                });
                break;
        }
        /*if (message.body.toLowerCase().split(" ")[0] === "mtos"){
            if (message.body.toLowerCase().split(" ")[1] !== undefined){
                if (
                    name === "Pak Tahir Tuza Mandiri" || name === "Hendrah" || name === "Bu Dina Tuza" ||
                    name === "Dede Goparking" || name === "Ilman Go Parking" || name === "Isra Mirayanti" || name === "Saiful" ||
                    name === "Amel Goparking" || name === "Ricky Goparking" || n === "Tina" || name === "Anti Goparking" || name === "Yusuf Goparking"){
                    let timeRequest = moment(message.body.toLowerCase().split(" ")[1], "DD-MM-YYYY");
                    console.log(timeRequest)
                    let tanggalSekarang = timeRequest.format('YYYY-MM-DD');
                    //console.log(tanggalSekarang)

                }else{
                    await client.sendMessage(message.from, "Anda Tidak Memiliki Akses");
                }
            }
        }

        if (message.body.toLowerCase().split(" ")[0] === "maxone"){

        }*/

    });


    await client.initialize();

})()
