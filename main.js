"use strict"
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)
import "./settings.js"
const {Browsers,
  makeInMemoryStore,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  MessageRetryMap,
  fetchLatestBaileysVersion,
  PHONENUMBER_MCC,
  getContentType,
} = (await import('@adiwajshing/baileys')).default
import fs, { readdirSync, existsSync, readFileSync, watch } from "fs";
import logg from 'pino'
import axios from "axios"
import { Socket, smsg, protoType, serialize } from "./lib/simple.js";
import {Fearless} from './message/case.js'
import _ from 'lodash'
import { fileURLToPath, pathToFileURL } from "url";
import CFonts from 'cfonts'
import path  from 'path'
import moment from "moment-timezone"
import chalkAnimation from 'chalk-animation'
import { platform } from "process";
import { format } from "util";
import syntaxerror from "syntax-error";
import {memberUpdate,groupsUpdate } from "./message/group.js"
import {connect} from "./server.js"
import { antiCall } from "./message/anticall.js"
import {connectionUpdate} from "./message/connection.js"
import HttpProxyAgent from 'http-proxy-agent'
import {sleep} from "./lib/myfunc.js" 
import fetch from 'node-fetch'
import { createRequire } from 'module'
import { join, dirname } from 'path'
import yargs from "yargs";
var require = createRequire(import.meta.url) 
const PORT = process.env.PORT || 3000   
const proxy = process.env.http_proxy || 'http://168.63.76.32:3128';
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const __dirname = dirname(fileURLToPath(import.meta.url));
global.__filename = function filename(
  pathURL = import.meta.url,
  rmPrefix = platform !== "win32"
) {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
/*
global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true))
};
*/
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};
global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);

protoType();
//Function untuk menghapus sampah tmp di database
setInterval(() => {
fs.readdir('./database', async function (err, files) {
let tmpFile = await files.filter(item => item.endsWith(".tmp"))
if(tmpFile.length > 0){
console.log("Menghapus file sampah tmp")
await tmpFile.forEach(function (file) {
fs.unlinkSync(`./database/${file}`)
});
console.log("Berhasil menghapus semua sampah tmp")
}
})
}, 10_000)

//Function Auto delete sampah 
setInterval(() => {
let directoryPath = path.join();
fs.readdir(directoryPath, async function (err, files) {
var filteredArray = await files.filter(item =>
item.endsWith("gif") ||
item.endsWith("png") || 
item.endsWith("mp3") ||
item.endsWith("mp4") || 
item.endsWith("jpg") ||
item.endsWith("webp") ||
item.endsWith("webm") ||
item.endsWith("zip") 
)
if(filteredArray.length > 0){
let teks =`Terdeteksi ${filteredArray.length} file sampah`
console.log(teks)
setInterval(() => {
if(filteredArray.length == 0) return console.log("File sampah telah hilang")
filteredArray.forEach(function (file) {
let sampah = fs.existsSync(file)
if(sampah) fs.unlinkSync(file)
})
}, 15_000)
}
});
}, 30_000)
	
 
CFonts.say('GamonBot', {
font: 'chrome',
align: 'left',
gradient: ['red', 'magenta']
})
 
setTimeout(() => {
chalkAnimation.rainbow('Cheers-MD Botz').start(); // Animation resumes
}, 2000);


//Connect to WhatsApp
const connectToWhatsApp = async () => {
await(await import("./message/database.js")).default()

//Function untuk update runtime di database
setInterval(() => {
let data = global.db.data.others['runtime']

if(data){ 
if((new Date - data.lastTime) > (60000*60)){
data.runtime = + new Date
data.lastTime = + new Date
console.log("Runtime di perbarui")
} else data.lastTime = + new Date
} else{ global.db.data.others['runtime'] = {
runtime: + new Date,
lastTime: + new Date
}
console.log("New update runtime")
}

},60_000)




const { state, saveCreds } = await useMultiFileAuthState("session")
const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) }) 
const { version, isLatest } = await fetchLatestBaileysVersion()


//Funtion agar bisa pake button di bailey terbaru  
const patchMessageBeforeSending = (message) => {
const requiresPatch = !!(
message.buttonsMessage ||
message.listMessage || 
message.templateMessage
);
if (requiresPatch) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {   
deviceListMetadataVersion: 2,  
deviceListMetadata: {},
},
...message,
},
},
};
}
return message
}

//Funtion agar pesan bot tidak pending  
const getMessage = async (key) => {
if(store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'hallo'
}
}

//Untuk menyimpan session  
const auth = {
creds: state.creds,
/** caching makes the store faster to send/recv messages */
keys: makeCacheableSignalKeyStore(state.keys, logg().child({ level: 'fatal', stream: 'store' })),
}


 

  

//Koneksi nih silakan di isi
const connectionOptions = {
version,
printQRInTerminal: true,
logger: logg({ level: 'fatal' }),
auth,
patchMessageBeforeSending,
getMessage,
MessageRetryMap,
//agent? :new HttpProxyAgent(proxy),
browser: Browsers.macOS('Desktop'),
keepAliveIntervalMs: 20000,
defaultQueryTimeoutMs: 20000,
connectTimeoutMs: 30000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
}


global.conn = Socket(connectionOptions)
connect(conn, PORT)
store.bind(conn.ev)
//conn.waVersion = version




  
conn.ev.process(async(events) => {

//Cnnection Update
if(events['connection.update']) {
if (db.data == null) await loadDatabase()
const update = events['connection.update']
await connectionUpdate(connectToWhatsApp,conn,update)
}

// credentials updated -- save them
if(events['creds.update']) { await saveCreds() }

// history received
if(events['messaging-history.set']) {
const { chats, contacts, messages, isLatest } = events['messaging-history.set']
console.log(`recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`)
}



// received a new message
if(events['messages.upsert']) {
const chatUpdate = events['messages.upsert']	
if (global.db.data) await global.db.write() 
if (!chatUpdate.messages) return;
let m = chatUpdate.messages[0] || chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m.message) return

if (m.key.remoteJid === 'status@broadcast') {
let bot = conn.decodeJid(conn.user.id)

conn.readMessages([m.key])
let mt = getContentType(m.message)
console.log((/protocolMessage/i.test(mt)) ? `${m.key.participant.split('@')[0]} Telah menghapus Story nya` : 'Melihat story user : '+m.key.participant.split('@')[0]);
if (/protocolMessage/i.test(mt)) conn.sendMessage(nomerOwner+ '@s.whatsapp.net' , {text:'Status dari @'+m.key.participant.split('@')[0]+' Telah dihapus', mentions: [m.key.participant]})
if (/(imageMessage|videoMessage|extendedTextMessage)/i.test(mt)) {
let keke = (mt == 'extendedTextMessage') ? `\nStory Teks Berisi : ${m.message.extendedTextMessage.text} `: (mt == 'imageMessage') ? `\nStory Gambar dengan Caption : ${m.message.imageMessage.caption}` : (mt == 'videoMessage') ?` \nStory Video dengan Caption : ${m.message.videoMessage.caption} `: '\nTidak diketahui cek saja langsung!!!'
conn.sendMessage(nomerOwner+'@s.whatsapp.net',{text: 'Melihat story dari @'+m.key.participant.split('@')[0] + keke, mentions: [m.key.participant]});
}
}

if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = await smsg(conn, m, store) 
Fearless(conn, m, chatUpdate,store)
}
  
//Anti Call
if(events.call) {
const node = events.call
antiCall(db,node, conn)
}

//Member Update  
if(events['group-participants.update']) {
const anu = events['group-participants.update']
if (global.db.data == null) await loadDatabase()
memberUpdate(conn,anu)
}

//Group Update  
if(events['groups.update']) {
const anu = events['groups.update']
groupsUpdate(conn,anu)
}

  
//------------------------------------[BATAS]--------------------------------\\

})
  
const pluginFolder = path.join(__dirname, "./plugins"); //global.__dirname(join(__dirname, './plugins/index'))
  const pluginFilter = (filename) => /\.js$/.test(filename);
  global.plugins = {};

  async function filesInit() {
    for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
      try {
        let file = global.__filename(join(pluginFolder, filename));
        const module = await import(file);
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(e);
        delete global.plugins[filename];
      }
    }
  }

  filesInit(); //.then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

  global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
      let dir = global.__filename(join(pluginFolder, filename), true);
      if (filename in global.plugins) {
        if (existsSync(dir))
          conn.logger.info(`re - require plugin '${filename}'`);
        else {
          conn.logger.warn(`deleted plugin '${filename}'`);
          return delete global.plugins[filename];
        }
      } else conn.logger.info(`requiring new plugin '${filename}'`);
      let err = syntaxerror(readFileSync(dir), filename, {
        sourceType: "module",
        allowAwaitOutsideFunction: true,
      });
      if (err)
        conn.logger.error(
          `syntax error while loading '${filename}'\n${format(err)}`
        );
      else
        try {
          const module = await import(
            `${global.__filename(dir)}?update=${Date.now()}`
          );
          global.plugins[filename] = module.default || module;
        } catch (e) {
          conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
        } finally {
          global.plugins = Object.fromEntries(
            Object.entries(global.plugins).sort(([a], [b]) =>
              a.localeCompare(b)
            )
          );
        }
    }
  };

  Object.freeze(global.reload);
  watch(pluginFolder, global.reload);
  //await global.reloadHandler()
  //  Function(conn);

//Function untuk update gempa BMKG
let gempa = db.data.others['updateGempa']
let data1 = db.data.others['infogempa']
if(!gempa) db.data.others['updateGempa'] = []

if(gempa && gempa.length > 0){
	
setInterval(async() => {
const {data} = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
let nana = /TimurLaut|Tenggara|BaratDaya|BaratLaut|Utara|Timur|Selatan|Barat/
let lokasi = data.Infogempa.gempa.Wilayah.split("km")[1].replace(nana,"").replace(" ",'').replace(" ","")
let waktu = data.Infogempa.gempa.Jam
let teks = `📢 INFO GEMPA 📢

📆 *Tanggal:* ${data.Infogempa.gempa.Tanggal}
⏲️ *Waktu:* ${data.Infogempa.gempa.Jam}
📈 *Kordinat:* ${data.Infogempa.gempa.Coordinates}
📊 *Magnitudo:* ${data.Infogempa.gempa.Magnitude}
🔋 *Kedalaman:* ${data.Infogempa.gempa.Kedalaman}
🌐 *Lokasi:* ${data.Infogempa.gempa.Wilayah}
🎟️ *Potention:* ${data.Infogempa.gempa.Potensi}
🌈 *Effect:* ${data.Infogempa.gempa.Dirasakan}
`
if(data1){
let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)
let image = {url:"https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap}
if(data1.lokasi !== lokasi && data1.lokasi !== waktu){

data1.lokasi = lokasi
data1.waktu = waktu
  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(2000)
const contextInfo = {
externalAdReply:{
showAdAttribution: true, 
title: `CLICK HERE || INFO BMKG`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: image.url,
sourceUrl:`https://www.bmkg.go.id/`
}
}  
conn.sendMessage(i ,{ text : teks, contextInfo})
//conn.sendMessage(i,{image,teks}) 


}
}
}

  
} else {
let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)

db.data.others['infogempa'] = {
lokasi : lokasi,
waktu: waktu
}
  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(2000)
const contextInfo = {
externalAdReply:{
showAdAttribution: true, 
title: `CLICK HERE || INFO BMKG`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: image.url,
sourceUrl:`https://www.bmkg.go.id/`
}
}  
conn.sendMessage(i ,{ text : teks, contextInfo})
//conn.sendMessage(i,{image,caption})
         

}
}
 
} 

}, 60_000*10)// akhir dari set interval

}// akhir dari gempa.length










  


  
const toFirstCase = (str) =>{
let first = str.split(" ")              // Memenggal nama menggunakan spasi
.map(nama => 
nama.charAt(0).toUpperCase() + 
nama.slice(1))                 // Ganti huruf besar kata-kata pertama
.join(" ");

return first
 }


 const Log = (text) =>{
 console.log(text)
 }
  


let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString("id", {
day: 'numeric',
month: 'long',
year: 'numeric'
})


function clockString(ms) {
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
let dDisplay = d > 0 ? d +  " hari, ": "";
let hDisplay = h > 0 ? h +  " jam, " : "";
let mDisplay = m > 0 ? m +  " menit, " : "";
let sDisplay = s > 0 ? s +  " detik" : "";
let time = d > 0 ? dDisplay + hDisplay + mDisplay  : hDisplay + mDisplay + sDisplay
return time
}

function tmp(file) {
return file+".tmp"
}

global.tmp = tmp
global.clockString = clockString
global.week = week
global.calender = calender  
global.Log = Log
global.toFirstCase = toFirstCase
//global.webUrl =  db.data.settings["webUrl"]? db.data.settings["webUrl"].link : webImg
return conn
 }

connectToWhatsApp()
    


    
    
