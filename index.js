import { createRequire } from 'module'
import moment from "moment-timezone"
import cluster from'cluster'
import { join, dirname } from 'path'
import fs from'fs'
import { createServer } from "http"
import { Server } from "socket.io"
import Readline from 'readline'
import yargs from 'yargs/yargs'
import chalk from 'chalk'
const rl = Readline.createInterface(process.stdin, process.stdout)

import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method

var isRunning = false
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
if (isRunning) return
isRunning = true
let args = [join(__dirname, file), ...process.argv.slice(2)]
/*  CFonts.say([process.argv[0], ...args].join(' '), {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
})*/
cluster.setupMaster({
exec: join(__dirname, file),
args: args.slice(1),
})
let p = cluster.fork()
p.on('message', data => {
console.log('[RECEIVED]', data)
switch (data) {
case "reset":
console.log("saatnya reset");
p.process.kill();
isRunning = false;
start.apply(this, arguments);
break;
case "null":
p.process.kill();
isRunning = false;
start.apply(this, arguments);
break;
case "SIGKILL":
p.process.kill();
isRunning = false;
start.apply(this, arguments);
break;
case 'SIGBUS':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'SIGTERM':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break

case 'uptime':
p.send(process.uptime())
break
}
})
//exit
p.on("exit", (_, code) => {
console.error(chalk.red(`🛑 Exited with code: ${code}`));
console.error(chalk.red(`❌ Script will restart...`));

if (code == null) {
p.process.kill();
isRunning = false;
start.apply(this, arguments);
} else if (code == "SIGKILL") {
p.process.kill();
isRunning = false;
start.apply(this, arguments);
} else if (code === 0) {
p.process.kill();
isRunning = false;
start.apply(this, arguments);
}

isRunning = false;

fs.watchFile(args[0], () => {
fs.unwatchFile(args[0]);
start(file);
});
});

//unhandledRejection
p.on("unhandledRejection", () => {
console.error(
chalk.red(`❌ Unhandled promise rejection. Script will restart...`)
);
p.process.kill();
isRunning = false;
start.apply(this, arguments);
});

//error
p.on("error", (err) => {
console.error(chalk.red(`❌ Error: ${err}`));
p.process.kill();
isRunning = false;
start.apply(this, arguments);
});

let opts = new Object(
yargs(process.argv.slice(2)).exitProcess(false).parse()
);
if (!opts["test"])
if (!rl.listenerCount())
rl.on("line", (line) => {
p.emit("message", line.trim());
});
// console.log(p)
}

start("main.js");

//KEEP ALIVE
function keepAlive() {
const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
if (/(\/\/|\.)undefined\./.test(url)) return;
setInterval(() => {
fetch(url).catch(console.error);
}, 5 * 1000 * 60);
}



