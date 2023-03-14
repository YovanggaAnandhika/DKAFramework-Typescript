export interface estimationCostFromTimeInterfaceTemp {
    data ?: string | undefined,
    type ?: string | undefined,
    summationCost ?: number | undefined,
    unitCost ?: number | undefined,
    maxCost ?: number | undefined,
    costCategory ?: "MAX" | "REMAINING" | "INFINITY"
    estimationCost ?: number | undefined
}
export interface estimationCostFromTimeInterfaceSettingsParameter {
    cost : number,
    costMax : number
}

export type  estimationCostFromTimeInterfaceSettings = {
    [key : string]: estimationCostFromTimeInterfaceSettingsParameter;
};

export interface estimationCostFromTimeInterface {
    data ?: any
    settings ?: estimationCostFromTimeInterfaceSettings
}