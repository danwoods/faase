#!/usr/bin/env node

const pkg = require("../package.json");

console.log(`${pkg.name}::${pkg.version}`);
console.log(__dirname);

/**
 * @fileoverview Runs `npm start`
 */

const path = require("path");
const { exec, execSync, spawn } = require("child_process");

/** Find the `bin` folder in the local module scope for a point of reference */
const binDir = execSync("npm bin", { encoding: "utf8", cwd: __dirname });

/** Root of local module scope */
const rootDir = path.join(binDir, "../..");

/** `npm start` process */
const child = spawn("npm", ["start"], { cwd: rootDir });

// Setup stdout
child.stdout.setEncoding("utf8");
child.stdout.on("data", console.log);

// Setup stderr
child.stderr.setEncoding("utf8");
child.stderr.on("data", console.error);

// Log on close
child.on("close", code => {
  console.log(`child process exited with code ${code}`);
});

// Log on error
child.on("error", error => {
  console.error(`child process errored with ${error}`);
});
