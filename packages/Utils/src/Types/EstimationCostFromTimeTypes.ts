export interface estimationCostFromTimeInterfaceTemp {
    data ?: number,
    type ?: string | undefined,
    summationCost ?: number | undefined,
    unitCost ?: number | undefined,
    maxCost ?: number | undefined,
    costCategory ?: "MAX" | "REMAINING" | "INFINITY"
    estimationCost ?: number | undefined
}
export interface estimationCostFromTimeInterfaceSettingsParameter {
    cost : number,
    costMax ?: number | undefined | typeof Infinity
}


export type estimationCostFromTimeInterfaceSettings = {
    [key : "hour" | "second" | "millisecond" | "week" | "day" | string ]: estimationCostFromTimeInterfaceSettingsParameter;
};

export type estimationCostFromTimeInterfaceDatas = {
    [key : "hour" | "second" | "millisecond" | "week" | "day" | string ]: number;
};


export interface estimationCostFromTimeInterfaceCallbackFinalCost {
    finalCost : {
        allCostRemaining : number
    }
}
export interface estimationCostFromTimeInterfaceCallbackObject {
    [ key : string ] : estimationCostFromTimeInterfaceTemp
}

export type estimationCostFromTimeInterfaceCallback  = estimationCostFromTimeInterfaceCallbackObject & estimationCostFromTimeInterfaceCallbackFinalCost

export interface estimationCostFromTimeInterface {
    data ?: estimationCostFromTimeInterfaceDatas
    settings ?: estimationCostFromTimeInterfaceSettings
}