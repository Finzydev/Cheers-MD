import chalk from 'chalk'
import moment from "moment-timezone"
import {fetchJson,sleep} from "../lib/myfunc.js"
import _spam from '../lib/antispam.js'
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
//Log text di group dan private chat
export const message = async(conn,m,budy,AntiSpam) =>{
if(budy && m.key.remoteJid !== 'status@broadcast') await console.log(m.isGroup? 
chalk.bgMagentaBright(chalk.black("[  GROUP  ]")): //group chat
chalk.bgGreenBright(chalk.black("[ PRIVATE ]")),  //private chat
chalk.green(moment.tz('Asia/Jakarta').format('HH:mm')), //waktu
chalk.hex('#9767FC').overline(budy), chalk.cyan('dari'),  //teks 
chalk.hex('#A8E643').overline(`${m.pushname}`), //nama users
m.isGroup? `${chalk.red('di gc')} ${chalk.red(m.groupName)}` : "") 
if(budy && m.key.remoteJid !== 'status@broadcast') console.log(chalk.hex('#FF8800').inverse(`ID: ${m.senderNumber}`))

 //Reply status user 
if(m.key.remoteJid == 'status@broadcast'){
if (_spam.check("NotCase",m.senderNumber, AntiSpam)) return
_spam.add("NotCase",m.senderNumber, "10s", AntiSpam)
let simi = await fetchJson(`https://api.simsimi.net/v2/?text=${budy}&lc=id`, {methods: "GET"})
let sami = simi.success   
if(sami.startsWith("Aku tidak mengerti")) return
let teksnya = sami
await sleep(2000)
conn.sendMessage(m.sender,{text: teksnya},{quoted: m})    
}  
}

//Log command bot
export const commands = async(m,command) =>{

console.log(chalk.bgCyanBright(chalk.black("[ COMMAND ]")),// command
chalk.green(moment.tz('Asia/Jakarta').format('HH:mm')), //waktu
chalk.blue(`${command} [${m.args.length}]`), chalk.cyan('dari'),// teks
chalk.red(`${m.pushname}`),// nama
m.isGroup? `${chalk.red('di gc')} ${chalk.red(m.groupName)}` : "")//keterangan  
console.log(chalk.hex('#FF8800').inverse(`ID: ${m.senderNumber}`))//number
}

//Log error
export const error = async(m,command) =>{

console.log(chalk.bgRed(chalk.black("[ ERROR ]")), chalk.green(moment.tz('Asia/Jakarta').format('HH:mm')), 
chalk.blue(`${command} [${m.args.length}]`))  
  
}