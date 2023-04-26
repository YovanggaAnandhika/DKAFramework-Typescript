#!/usr/bin/env node
import path from "path";
import fs from "fs";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
const { program } = require("@caporal/core");

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
    await console.log(chalk.whiteBright(
            figlet.textSync('DKA-CLI', { horizontalLayout: 'default' })
        )
    );

    const Packages = fs.existsSync(path.join(__dirname, "./../package.json")) ? require("./../package.json") : undefined;

    program
        .version(`${Packages.version}`)
        .command("server", "running a apps dka framework")
        .argument("<mainFiles>","The Services File Main Point")
        .option("-n, --nodemon", `nodemon`)
        .option("-nw, --watch <dir>","watch folder nodemon",{
            default : []
        })
        .option("-t, --typescript [config]", `use typescript engine`)
        // @ts-ignore
        .action(async ({args, options, logger}) => {
            console.log(options.typescript)
            if (options.nodemon){
                if (checkModuleExist("nodemon")){
                    let nodemon = await require("nodemon");
                    if (options.typescript){
                        if (checkModuleExist("ts-node")){
                            await nodemon({
                                script : args.mainFiles,
                                watch : options.watch,
                                exec : `ts-node ${(options.typescript === true) ? `` : `--project ${options.typescript}`}`,

                            })
                        }else{
                            logger.error("ts-node module is used. but modules not found");
                        }
                    }else{
                        await nodemon({
                            script : args.mainFiles,
                            watch : options.watch,
                            exec : "node"
                        })
                    }

                }else{
                    logger.error("nodemon module is used. but modules not found");
                }
            }
        })

        .command("login", "function for authentification")
        .option(`-u,--username <username>`, `login function`)
        .option(`-p,--password <password>`, `login function`)
        // @ts-ignore
        .action(async ({args, options, logger}) => {
            logger.info("Order canceled: %s", options)
        });

   await program.run(process.argv.slice(2));

})();