#!/usr/bin/env node

import {exec} from "child_process";

import path from "path";
console.log("install requirement packages ...");
let packageRootPath = path.join(path.dirname(require.main.filename), '../..');
exec(`yarn -D add typescript ts-node @types/node`, { encoding : "utf8", cwd : packageRootPath }, (error, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
});