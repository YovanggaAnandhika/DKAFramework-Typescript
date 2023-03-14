import cliProgress from "cli-progress";
import ansiColors from "ansi-colors";

export const CliProgress = new cliProgress.Bar({
        format: '{state} - [DKA_FRAMEWORK] ' + ansiColors.blue('{bar}') + ' [{status}] - {descriptions} | {percentage}% || {value} Chunks',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
});