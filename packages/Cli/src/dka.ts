#!/usr/bin/env node
import path from "path";
import fs from "fs";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { Command } from "commander";
import * as process from "process";
const inquirer = require('inquirer');

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
    await console.log(chalk.whiteBright(
            figlet.textSync('DKA-CLI', { horizontalLayout: 'default' })
        )
    );

    const Packages = fs.existsSync(path.join(__dirname, "./../package.json")) ? require("./../package.json") : undefined;

    // @ts-ignore

    program
        .version(`${Packages.version}`)
        .description(`${Packages.description}`)
        .command("create-server-app", "create a project with DKA Framework")
        .action(async (action) => {
            //let mCurrentDir = (action.args.name !== undefined) ? path.join(process.cwd(), `${action.args.name}`) : path.join(process.cwd());
            // @ts-ignore
            inquirer.prompt([
                {
                    name : "lang",
                    type : "list",
                    message : "select your language ?",
                    choices: ['Indonesia', 'English'],
                    filter(val : string) {
                        return val.toLowerCase();
                    },
                }
            ])
        })

    await program.parse(process.argv.slice(1))
    //program.parse(process.argv)

})();