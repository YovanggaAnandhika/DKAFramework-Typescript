import {Aminos, Time} from "../src";
(async () => {

    const data = Time.estimationCostFromTime({
        data : {
            jam : 7
        },
        settings : {
            jam : {
                cost : 1500,
                firstCost : 1500,
                resetAfter : 24,
                costMax : 10000
            }
        }
    })

    console.log(data);


})()
