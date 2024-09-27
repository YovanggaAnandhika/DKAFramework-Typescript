import {
    estimationCostFromTimeInterface, estimationCostFromTimeInterfaceCallback,
    estimationCostFromTimeInterfaceTemp
} from "../../../Types/EstimationCostFromTimeTypes";


export function estimationCostFromTime (config : estimationCostFromTimeInterface) : estimationCostFromTimeInterfaceCallback {
    let mCostConfig = config;
    let costBase = {};
    let mSettings = mCostConfig.settings;
    Object.keys(mSettings).map(async (key) => {
        if (mCostConfig.data[key] !== undefined) {
            let mTempContentBase : estimationCostFromTimeInterfaceTemp = {};
            mTempContentBase.data = mCostConfig.data[key];
            mTempContentBase.type = key;
            mTempContentBase.summationCost = 0;
            mTempContentBase.firstCost = (mSettings[key].firstCost !== undefined) ? mSettings[key].firstCost : 0
            mTempContentBase.resetAfter = mSettings[key].resetAfter;
            mTempContentBase.unitCost = mSettings[key].cost;
            mTempContentBase.maxCost = mSettings[key].costMax;
            if (mTempContentBase.resetAfter !== undefined && mTempContentBase.resetAfter > 0){
                let satuan = Math.floor(mTempContentBase.data / mTempContentBase.resetAfter);
                let sisa_jam = mTempContentBase.data - (satuan * mTempContentBase.resetAfter);
                if (satuan > 0) mTempContentBase.summationCost = mSettings[key].costMax * satuan;
                let nextGroupCost = (sisa_jam * mSettings[key].cost) + ((satuan > 0) ? 0 : mTempContentBase.firstCost);
                if (nextGroupCost >= mSettings[key].costMax) nextGroupCost = mSettings[key].costMax;
                if (sisa_jam > 0) mTempContentBase.summationCost = mTempContentBase.summationCost + nextGroupCost;
                mTempContentBase.costCategory = (mSettings[key].costMax !== Infinity && mSettings[key].costMax !== undefined && mSettings[key].costMax !== 0) ? ((nextGroupCost >= mSettings[key].costMax) ? "MAX" : "REMAINING") : "INFINITY";
                mTempContentBase.estimationCost = mTempContentBase.summationCost;
            }else{
                mTempContentBase.unitCost = mSettings[key].cost;
                mTempContentBase.maxCost = mSettings[key].costMax;
                mTempContentBase.summationCost = mCostConfig.data[key] * mSettings[key].cost;
                mTempContentBase.costCategory = (mSettings[key].costMax !== Infinity && mSettings[key].costMax !== undefined && mSettings[key].costMax !== 0) ? ((mTempContentBase.summationCost >= mSettings[key].costMax) ? "MAX" : "REMAINING") : "INFINITY";
                mTempContentBase.estimationCost = (mSettings[key].costMax !== Infinity && mSettings[key].costMax !== undefined && mSettings[key].costMax !== 0) ? ((mTempContentBase.summationCost >= mSettings[key].costMax) ? mSettings[key].costMax : mTempContentBase.summationCost + mTempContentBase.firstCost) : mTempContentBase.summationCost  + mTempContentBase.firstCost;
            }
            costBase[key] = mTempContentBase
        }

    })


    let finalCost = {
        allCostRemaining: 0
    };


    for (const key of Object.keys(costBase)) {
        finalCost.allCostRemaining += costBase[key].estimationCost;
    }


    return { unit : costBase, finalCost : finalCost } as estimationCostFromTimeInterfaceCallback;

}


export default estimationCostFromTime;