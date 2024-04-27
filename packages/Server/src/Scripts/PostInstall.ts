#!/usr/bin/env node
import path from "path";
import {execSync, exec} from "child_process";

console.log("install requirement packages ...");
let packageRootPath = path.join(path.dirname(require.main.filename), '../..');
console.log(packageRootPath)
exec(`yarn -D add typescript ts-node @types/node`, { encoding : "utf8", cwd : packageRootPath }, (error, stdout, stderr) => {
    console.log("STDOUT:", stdout, ", STDERR:", stderr);
});