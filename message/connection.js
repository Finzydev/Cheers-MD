"use strict"
const  { default: makeWASocket,
Browsers,
DisconnectReason,
fetchLatestBaileysVersion
} = (await import('@adiwajshing/baileys')).default
import chalk from 'chalk'
import { Boom } from '@hapi/boom'
import spin from 'spinnies'
import CFonts from 'cfonts'
import fs from "fs"
import chalkAnimation from 'chalk-animation'



const spinnies = new spin();
const spinner = { 
  "interval": 120,
  "frames": [
"0% [====================]",
"1% [≠===================]",
"2% [≠≠==================]",
"3% [≠≠≠=================]",
"4% [≠≠≠≠================]",
"5% [≠≠≠≠≠===============]",
"6% [≠≠≠≠≠≠==============]",
"6% [≠≠≠≠≠≠≠=============]",
"6% [≠≠≠≠≠≠≠≠============]",
"7% [≠≠≠≠≠≠≠≠≠===========]",
"7% [≠≠≠≠≠≠≠≠≠≠==========]",
"7% [≠≠≠≠≠≠≠≠≠≠≠=========]",
"8% [≠≠≠≠≠≠≠≠≠≠≠≠========]",
"8% [≠≠≠≠≠≠≠≠≠≠≠≠≠=======]",
"8% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠======]",
"9% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠=====]",
"9% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠====]",
"9% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠====]",
"10% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠===]",
"10% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠==]",
"10% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠=]",
"10% [≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠]"
  ]}
let globalSpinner;
const getGlobalSpinner = (disableSpins = false) => {
if(!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
return globalSpinner;
}
let spins = getGlobalSpinner(false)
  
  
const start = (id, text) => {
spins.add(id, {text: text})
}
const success = (id, text) => {
spins.succeed(id, {text: text})
}

const prefix = '.'

export const connectionUpdate = async(connectToWhatsApp,conn,update) => {
const { version, isLatest } = await fetchLatestBaileysVersion()
const { connection, lastDisconnect,receivedPendingNotifications,isNewLogin,qr } = update


let teks = `Hai apan ganteng, Cheers-MD telah aktif!`

	
//receivedPendingNotifications = false  
const  reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (connection === 'close') {

console.log(chalk.red(lastDisconnect.error));

if(lastDisconnect.error == "Error: Stream Errored (unknown)"){
process.send('reset')

} else if (reason === DisconnectReason.badSession) { 
  
console.log(`Bad Session File, Please Delete Session and Scan Again`); 
process.send('reset')
  
} else if (reason === DisconnectReason.connectionClosed) { 
  
console.log("[SYSTEM]",chalk.red('Connection closed, reconnecting...')); 
process.send('reset')
  
} else if (reason === DisconnectReason.connectionLost) { 
  
console.log(chalk.red("[SYSTEM]", "white"), chalk.green('Connection lost, trying to reconnect'));
process.send('reset')
  
} else if (reason === DisconnectReason.connectionReplaced) { 
  
console.log(chalk.red("Connection Replaced, Another New Session Opened, Please Close Current Session First"));
conn.logout(); 
  
} else if (reason === DisconnectReason.loggedOut) { 
  
console.log(chalk.red(`Device Logged Out, Please Scan Again And Run.`)); 
conn.logout(); 
  
} else if (reason === DisconnectReason.restartRequired) {
  
console.log("Restart Required, Restarting..."); 
connectToWhatsApp(); 
process.send('reset')
  
} else if (reason === DisconnectReason.timedOut) {
  
console.log(chalk.red("Connection TimedOut, Reconnecting..."));
connectToWhatsApp(); 

}
	
} else if (connection === 'connecting') {
//console.log(`${chalk.white(`[`)+chalk.red(`1`)+chalk.white(`]`)}`,`WA v${version.join('.')}`)
//await sleep(400) 
//console.log(`${chalk.white(`[`)+chalk.red(`2`)+chalk.white(`]`)}`,`${calender}`)
//await sleep(400) 
//console.log(`${chalk.white(`[`)+chalk.red(`2`)+chalk.white(`]`)}`,`https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`)
//await sleep(400)  
//console.log(`${chalk.white(`[`)+chalk.red(`2`)+chalk.white(`]`)}`,`data 5`)
//await sleep(400) 

console.log(chalk.magenta(`]─`),`「`,  chalk.red(`Cheers-MD`), `」`,  chalk.magenta(`─[`))  
start(`1`,`Connecting...`)
} else if (connection === 'open') {
    
conn.sendMessage(`6285866103817@s.whatsapp.net`, {
      text: teks,
      contextInfo: {
      externalAdReply: {
      title: "Cheers-MD notifikasi online ",
      thumbnailUrl: "https://telegra.ph/file/df0b17b8a816f74780133.jpg",
      mediaType: 1,
      renderLargerThumbnail: true
      }}})    //conn.sendMessage(`6281398274790@s.whatsapp.net`, {image: {url: "https://telegra.ph/file/6e63c395ddc4d12f50aa0.jpg" }, caption: `Hai sayangku bot mu telah aktif!`})
success(`1`,`Berhasil Terkoneksi`) 
}
/*  console.log(
      chalk.bold.bgRgb(51, 204, 51)("INFO "),
      chalk.cyan(
        `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      )
    );*/
    const bot = db.data.others["restart"];
    if (bot) {
      const m = bot.m;
      const from = bot.from;
      let text = "Bot is connected";
      await conn.sendMessage(from, { text }, { quoted: m });
      delete db.data.others["restart"];
    }
	

}//akhir connection