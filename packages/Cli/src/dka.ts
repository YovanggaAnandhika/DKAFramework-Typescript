#!/usr/bin/env node
import path from "path";
import fs from "fs";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import {Command} from "commander";
import * as process from "process";

import inquirer, { PromptFunction } from "inquirer";

function checkModuleExist(name : string){
    try {
        require.resolve(name);
        return true;
    }catch (e) {
        return false;
    }
}

(async () => {
    await clear();
    const program = new Command();
    await console.log(chalk.redBright(
            figlet.textSync('DKA-FRAMEWORK', { horizontalLayout: 'default', width : 350 })
        )
    );

    const Packages = fs.existsSync(path.join(__dirname, "./../package.json")) ? require("./../package.json") : undefined;

    program
        .name(`${Packages.name}`)
        .version(`${Packages.version}`)
        .description(`${Packages.description}`);

    program
        .option('-cx, --create',"Create")
        .option('-db, --create',"Create")
    await program.parse()
   //program.parse(process.argv)

})();