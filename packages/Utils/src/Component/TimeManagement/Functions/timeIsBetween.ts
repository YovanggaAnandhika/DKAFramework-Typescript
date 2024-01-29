import {ReturnTimeFunction, TimeIsBetweenConfig, TimeIsBetweenData} from "../../../Interfaces/TimeIsBetweenConfig";
import moment, {Moment} from "moment-timezone";

export function timeIsBetween(options : TimeIsBetweenConfig, timeData ?: Moment | undefined) : TimeIsBetweenData {

    let callback : TimeIsBetweenData;

    function Time(timeString : string) : ReturnTimeFunction {
        let t = timeString.split(":");
        let timeUnit = { hour : parseInt(t[0]), minutes : parseInt(t[1]) };
        return {
            ... timeUnit,
            isBiggerThan : (other) => {
                return (timeUnit.hour > other.hour) || (timeUnit.hour === other.hour) && (timeUnit.minutes > other.minutes);
            }
        };
    }

    function timeIsBetweenChecker(start : ReturnTimeFunction, end : ReturnTimeFunction, check : ReturnTimeFunction) : boolean {
        return (start.hour <= end.hour) ? check.isBiggerThan(start) && !check.isBiggerThan(end)
            : (check.isBiggerThan(start) && check.isBiggerThan(end)) || (!check.isBiggerThan(start) && !check.isBiggerThan(end));
    }

    options.forEach((timeIsBetweenData) => {
        let time = (timeData !== undefined) ? timeData.format("HH:mm") : moment(moment.now()).format("HH:mm");
        let start = timeIsBetweenData.start;
        let end = timeIsBetweenData.end;
        let iSBetween = timeIsBetweenChecker(Time(start), Time(end), Time(time));
        if (iSBetween) return callback = timeIsBetweenData;
    });
    return callback;
}