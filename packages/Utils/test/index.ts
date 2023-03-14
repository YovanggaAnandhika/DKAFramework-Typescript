import {estimationCostFromTime} from "../src";

let data = estimationCostFromTime({
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
})
console.log(data)