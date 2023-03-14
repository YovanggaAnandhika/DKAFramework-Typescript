import * as Server from "./Server";
import ansiColors from "ansi-colors";
import path from "path";

export interface PackageJson {
    author : string | undefined,
    version : string | undefined
}
const mInformation : PackageJson = {
    author: require(path.join(__dirname, "./../../package.json")).author,
    version: require(path.join(__dirname, "./../../package.json")).version
}


export const Options = {
    Server : Server,
    Information : mInformation,
    DELAY_DEFAULT : 0,
    READY_STATE : `${ansiColors.blue('Ready')}`,
    LOADING_STATE : `${ansiColors.blue('Loading')}`,
    LOADED_STATE : `${ansiColors.green('Loaded')}`,
    COMPLETE_STATE : `${ansiColors.green('Complete')}`,
    START_STATE : `${ansiColors.green('Start')}`,
    STOP_STATE : `${ansiColors.red('Stop')}`,
    ERROR_STATE : `${ansiColors.red('Error')}`,
    WARNING_STATE : `${ansiColors.bgYellow('Warning')}`,
}


export { Server };
export default Options;