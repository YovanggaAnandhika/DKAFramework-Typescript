import {Moment} from "moment-timezone";


type HH = '00'|'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23';
type MM = '00'|'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36'|'37'|'38'|'39'|'40'|'41'|'42'|'43'|'44'|'45'|'46'|'47'|'48'|'49'|'50'|'51'|'52'|'53'|'54'|'55'|'56'|'57'|'58'|'59';
type TimeIsBetweenDataTime = `${HH}:${MM}`;
export interface TimeIsBetweenModel {
    id ?: string | number,
    start : TimeIsBetweenDataTime,
    end : TimeIsBetweenDataTime,
}

export type TimeIsBetweenData<Extra = any> = TimeIsBetweenModel & Extra;

export interface ReturnTimeFunctionBiggerThan {
    hour : any,
    minutes : any,
}
export interface ReturnTimeFunction {
    hour : any,
    minutes : any,
    isBiggerThan : (other : ReturnTimeFunctionBiggerThan) => boolean
}

export type TimeIsBetweenConfig<Extra = any> = Array<TimeIsBetweenData<Extra>>;