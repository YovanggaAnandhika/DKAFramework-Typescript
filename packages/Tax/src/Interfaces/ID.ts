export type OptionsPPNCheckerManipulator<T = OptionsPPN> = T extends { isMarriage: true }
    ? T & { isMixed: boolean }
    : Omit<T, 'isMixed'>;


export interface OptionsPPNMarriage {
    isMarriage: true;
    isMixed: boolean;
    dependents: number;
}

export interface OptionsPPNSingle {
    isMarriage: false;
    dependents: number;
}

export type OptionsPPN = OptionsPPNMarriage | OptionsPPNSingle;