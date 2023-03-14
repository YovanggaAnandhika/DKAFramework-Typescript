import {
    estimationCostFromTimeInterface,
    estimationCostFromTimeInterfaceTemp
} from "../../Types/EstimationCostFromTimeTypes";
import {merge} from "lodash";

export function estimationCostFromTime (config : estimationCostFromTimeInterface){
    let mCostConfig = config;
    let costBase = {};
    let mSettings = mCostConfig.settings;
    Object.keys(mSettings).map(async (key) => {
        if (mCostConfig.data[key] !== undefined) {
            let mBaseKey = mCostConfig.data[key] * mSettings[key].cost;
            let mTempContentBase : estimationCostFromTimeInterfaceTemp = {};
            mTempContentBase.data = mCostConfig.data[key];
            mTempContentBase.type = key;
            mTempContentBase.summationCost = mBaseKey;
            mTempContentBase.unitCost = mSettings[key].cost;
            mTempContentBase.maxCost = mSettings[key].costMax;
            mTempContentBase.costCategory = (mSettings[key].costMax !== Infinity) ? ((mBaseKey > mSettings[key].costMax) ? "MAX" : "REMAINING") : "INFINITY";
            mTempContentBase.estimationCost = (mSettings[key].costMax !== Infinity) ? ((mBaseKey > mSettings[key].costMax) ? mSettings[key].costMax : mBaseKey) : mBaseKey;
            costBase[key] = mTempContentBase
        }
    })

    let finalCost = {
        allCostRemaining: 0
    };

    for (const key of Object.keys(costBase)) {
        finalCost.allCostRemaining += costBase[key].estimationCost;
    }
    return merge(costBase, {finalCost})
}