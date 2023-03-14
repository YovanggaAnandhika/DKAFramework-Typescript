import * as BaseFramework from "../../Const/index"
import {existsSync} from "fs";
import path from "path";
import winston, {format, Logger} from "winston";

const { combine, timestamp, label, printf, colorize } = format;

export let location = existsSync(path.join(require.main?.filename!, "./../Logs/")) ? path.join(require.main?.filename!,"./../logs/") : path.join(require.main?.filename!, "./../");
export let mLogger = {
    logger : winston.createLogger({
        format: winston.format.combine(
            winston.format.label({ label : `DKA_FRAMEWORK`}),
            timestamp({format : "DD-MM-YYYY HH:mm:ss:SS"}),
            printf(({ level, message, label, timestamp }) => {
                return `DEV::[${label}] - V.${BaseFramework.Options.Information.version} - Time : ${timestamp} - [${level}] - ${message}`;
            })
        ),
        transports: [
            //
            // - Write all logs with importance level of `error` or less to `error.log`
            // - Write all logs with importance level of `info` or less to `combined.log`
            //

            new winston.transports.Console({
                format: combine(
                    winston.format.label({ label : `DKA_FRAMEWORK`}),
                    winston.format.colorize(),
                    timestamp({format : "DD-MM-YYYY HH:mm:ss:SS"}),
                    printf(({ level, message, label, timestamp }) => {
                        return `DEBUG - [${label}] - V.${BaseFramework.Options.Information.version} - Time : ${timestamp} - [${level}] - ${message}`;
                    })
                )
            }),
            new winston.transports.File({ filename: path.join(location,"./error.log"), level: 'error'}),
            new winston.transports.File({filename: path.join(location,"./info.log"), level : 'info' }),
        ],
    })

}
export default mLogger;