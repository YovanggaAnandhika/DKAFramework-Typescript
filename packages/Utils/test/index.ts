
// @ts-ignore
import moment from "moment-timezone";
import {MariaDB} from "@dkaframework/database";
import Utils from "../src";

(async () => {
    moment.locale("id")

    let time = Utils.Functions.Component.TimeManagement.estimationCostFromTime({
        data : {
            hour : 30,
            minutes : 5
        },
        settings : {
            hour : {
                cost : 2000,
                costMax : 0
            },
            minutes : {
                cost : 1000,
                costMax : 0
            }
        }
    });

    console.log(time)


})()
