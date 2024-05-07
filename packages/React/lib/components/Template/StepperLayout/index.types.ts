import React from "react";


export interface StepperLayoutItemModel {
    title : string;
    icon : React.ReactElement;
    children : React.JSX.Element;
    onBack ?: () => void;
    onNext ?: () => void;
}


export type StepperLayoutItem = Array<StepperLayoutItemModel>;


export interface StepperLayoutConfig {
    item : StepperLayoutItem;
    onFinish ?: () => void;
}