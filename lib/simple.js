const {default: makeWASocket,
makeWALegacySocket,
extractMessageContent,
makeInMemoryStore,
proto,
prepareWAMessageMedia,
downloadContentFromMessage,
getBinaryNodeChild,
jidDecode,
areJidsSameUser,
generateWAMessage,
generateForwardMessageContent,
generateWAMessageFromContent,
WAMessageStubType,
getContentType,
relayMessage,
WA_DEFAULT_EPHEMERAL
} = (await import('@adiwajshing/baileys')).default
import chalk from 'chalk'
import fetch from 'node-fetch'
import jimp from 'jimp'
import {fileTypeFromBuffer as fromBuffer} from 'file-type'
import PhoneNumber from 'awesome-phonenumber'
//import fs  from 'fs'
import fs from 'fs-extra'
import pino from'pino'
import path from'path'
import moment from "moment-timezone"
import { getRandomFile,getBuffer,sleep} from "./myfunc.js"
import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import { join, dirname } from 'path'
import { fileURLToPath, URL } from 'url'
import { format } from 'util'
import {fileTypeFromFile} from 'file-type';
const __dirname = dirname(fileURLToPath(import.meta.url))
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

export const Socket = (connectionOptions, options = {}) => {
const conn = (baileysMd ? makeWASocket : makeWALegacySocket)(connectionOptions)

//Funtion to get file buffer
const buffer = async (path) => {
let result = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? {url: path} : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return result
}


conn.sendImageAsSticker = async (jid, media, t, options = {}) => {
let jancok = new Sticker(media, {
pack: "Cheers-MD", // The pack name
author: "Created By Finzys.", // The author name
type: StickerTypes.FULL, // The sticker type
categories: ['🤩', '🎉'], // The sticker category
id: '12345', // The sticker id
quality: 50, // The quality of the output file
background: '#FFFFFF00' // The sticker background color (only for full stickers)
})
let stok = getRandomFile(".webp")
  let nono = await jancok.toFile(stok)
  let nah = fs.readFileSync(nono)
  await conn.sendMessage(jid, { contextInfo: { externalAdReply: { showAdAttribution: true,
  title: `${fake1}`,body: 'MARI BERTEMAN👇',previewType:"PHOTO",thumbnail: fs.readFileSync('./stik/thumb.jpeg'),
  sourceUrl:'https://instagram.com/finnn.zy'																																
  }}, sticker: nah }, { quoted: t})   				
  return await fs.unlinkSync(stok)
  }

//LOAD MESSAGES
conn.loadMessage = (messageID) => {
return Object.entries(conn.chats)
.filter(([_, { messages }]) => typeof messages === 'object')
.find(([_, { messages }]) => Object.entries(messages)
.find(([k, v]) => (k === messageID || v.key?.id === messageID)))
?.[1].messages?.[messageID]
}

  //Button Gif ✓
  conn.send5ButGif = async (id, text1, desc1, gam1, but = [],gam, options = {}) => {
   let buff = /^https?:\/\//.test(gam) ? await getBuffer(gam) : gam
  let buttonMessage = {
  video: await buffer(gam1),
  caption: text1,
  footer: desc1,
  templateButtons: but,
  gifPlayback: true,
  jpegThumbnail: buff, 
  fileLength : 99, 
  headerType: 'VIDEO'
  }
  return await conn.sendMessage(id, buttonMessage, options)
  }
//SETTING
conn.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

if (conn.user && conn.user.id) conn.user.jid = conn.decodeJid(conn.user.id)
conn.chats = {}
conn.contacts = {}

//sendmessgae type 2
conn.sendMessageV2 = async (chatId, message, options = {}) => {
let generate = await generateWAMessage(chatId, message, options)
let type2 = getContentType(generate.message)
if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
return await conn.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}

//Funtion o geing file
conn.getFile = async (PATH, returnAsFilename) => {
let res, filename
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
if (data && returnAsFilename && !filename) (filename = path.join(__dirname,  '../' +new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
return {
res,
filename,
...type,
data
}
}




/**
* waitEvent
* @param {*} eventName
* @param {Boolean} is
* @param {Number} maxTries
* @returns
*/
conn.waitEvent = (eventName, is = () => true, maxTries = 25) => {
return new Promise((resolve, reject) => {
let tries = 0
let on = (...args) => {
if (++tries > maxTries) reject('Max tries reached')
else if (is()) {
conn.ev.off(eventName, on)
resolve(...args)
}
}
conn.ev.on(eventName, on)
})
}


//Funtion Send Media All Type
conn.sendMedia = async (jid, path, quoted, options = {}) => {
let { ext, mime, data } = await conn.getFile(path)
let messageType = mime.split("/")[0]
let pase = messageType.replace('application', 'document') || messageType
return await conn.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
}







/**
* Send Contact
* @param {String} jid
* @param {String} number
* @param {String} name
* @param {Object} quoted
* @param {Object} options
*/
conn.sendContact = async (jid, number, name, quoted, options) => {
let njid = number.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD
`
return await conn.sendMessage(jid, {
contacts: {
displayName: `${name}`,
contacts: [{ vcard }],
...options
}
},
{
quoted,
...options
})
}

/**
* Send Contact Array
* @param {String} jid
* @param {String} number
* @param {String} name
* @param {Object} quoted
* @param {Object} options
*/
conn.sendContactArray = async (jid, data, quoted, options) => {
let contacts = []
for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
number = number.replace(/[^0-9]/g, '')
let contextInfo = { 
//mentionedJid: [sender],
externalAdReply:{
showAdAttribution: true,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: 'https://telegra.ph/file/c8b52ca0d1cf33667b565.jpg',
}
}  
let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET: notfinzy@gmail.com
item2.X-ABLabel:📧 Email
item3.ADR:;; Tangerang;;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:https://fanhost.my.id
item4.X-ABLabel:Website
item5.X-ABLabel:Cheers-MD By Finzydev. 
END:VCARD`.trim()
contacts.push({ contextInfo,vcard, displayName: name })

}
return await conn.sendMessage(jid, {
contacts: {
displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
contacts,
}
},
{
quoted,
...options
})
}


/**
*
* @param {*} jid
* @param {*} text
* @param {*} quoted
* @param {*} options
* @returns
*/
conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })


/**
* Reply to a message
* @param {String} jid
* @param {String|Object} text
* @param {Object} quoted
* @param {Object} mentions [m.sender]
*/
conn.reply = (jid, text = '', quoted, options) => {
return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { ...options, text }, { quoted, ...options })
}




/**
* Send a list message
* @param jid the id to send to
* @param button the optional button text, title and description button
* @param rows the rows of sections list message
*/
conn.sendListM = (jid, button, rows, quoted, options = {}) => {
const sections = [
{
title: button.title,
rows: [...rows]
}
]
const listMessage = {
text: button.description,
footer: button.footerText,
mentions: conn.parseMention(button.description, button.footerText),
title: '',
buttonText: button.buttonText,
sections
}
conn.sendMessage(jid, listMessage, {
quoted,
...options
})
}










/**
* sendGroupV4Invite
* @param {String} jid
* @param {*} participant
* @param {String} inviteCode
* @param {Number} inviteExpiration
* @param {String} groupName
* @param {String} caption
* @param {*} options
* @returns
*/
conn.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
let msg = proto.Message.fromObject({
groupInviteMessage: proto.GroupInviteMessage.fromObject({
inviteCode,
inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
groupJid: jid,
groupName: groupName ? groupName : this.getName(jid),
caption
})
})
let message = await this.prepareMessageFromContent(participant, msg, options)
await this.relayWAMessage(message)
return message
}

/**
*Message
*/
conn.relayWAMessage = async (pesanfull) => {
var mekirim = await conn.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id })
conn.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
return mekirim
}

/**
* cMod
* @param {String} jid
* @param {*} message
* @param {String} text
* @param {String} sender
* @param {*} options
* @returns
*/
conn.cMod = async (jid, message, text = '', sender = conn.user.jid, options = {}) => {
if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
let copy = message.toJSON()
delete copy.message.messageContextInfo
delete copy.message.senderKeyDistributionMessage
let mtype = Object.keys(copy.message)[0]
let msg = copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') {
msg[mtype] = { ...content, ...options }
msg[mtype].contextInfo = {
...(content.contextInfo || {}),
mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
}
}
if (copy.participant) sender = copy.participant = sender || copy.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false
return proto.WebMessageInfo.fromObject(copy)
}







/**
* Exact Copy Forward
* @param {String} jid
* @param {Object} message
* @param {Boolean|Number} forwardingScore
* @param {Object} options
*/
conn.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
let m = generateForwardMessageContent(message, !!forwardingScore)
let mtype = Object.keys(m)[0]
if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
m = generateWAMessageFromContent(jid, m, { ...options, userJid: conn.user.id })
await conn.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options }})
return m
}





/**
* Download media message
* @param {Object} m
* @param {String} type
* @param {fs.PathLike|fs.promises.FileHandle} filename
* @returns {Promise<fs.PathLike|fs.promises.FileHandle|Buffer>}
*/
conn.downloadM = async (m, type, filename = '') => {
if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
const stream = await downloadContentFromMessage(m, type)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
if (filename) await fs.promises.writeFile(filename, buffer)
return filename && fs.existsSync(filename) ? filename : buffer
}

conn.downloadMed = async (message, filename, attachExtension = true) => {
let mime = (message.msg || message).mimetype || ''
let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await fromBuffer(buffer)
let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
//trueFileName = attachExtension ? filename : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}




/*
conn.saveName = async (id, name = '') => {
if (!id) return
id = conn.decodeJid(id)
let isGroup = id.endsWith('@g.us')
if (id in conn.contacts && conn.contacts[id][isGroup ? 'subject' : 'name'] && id in conn.chats) return
let metadata = {}
if (isGroup) metadata = await conn.groupMetadata(id)
let chat = { ...(conn.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
conn.contacts[id] = chat
conn.chats[id] = chat
}
*/

/**
* Get name from jid
* @param {String} jid
* @param {Boolean} withoutContact
*/
conn.getName = async (jid = '', withoutContact = false) => {
let myUser = Object.keys(db.data.users)
let nana = myUser.includes(jid)?'User terdeteksi' : 'User tidak terdeteksi'
let jod = jid

jid = conn.decodeJid(jid)
withoutContact = conn.withoutContact || withoutContact
let v
if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
v = conn.chats[jid] || {}
if (!(v.name || v.subject)) v = await conn.groupMetadata(jid) || {}
resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = jid === '0@s.whatsapp.net' ? {
jid,
vname: 'WhatsApp'
} : areJidsSameUser(jid, conn.user.id) ?
conn.user :
(conn.chats[jid] || {}) // (withoutContact ? '' : v.name) 
return  v.subject || v.vname || v.notify || v.verifiedName || (myUser.includes(jod)? db.data.users[jod].name : PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international').replace(new RegExp("[()+-/ +/]", "gi"), ""))
}








conn.processMessageStubType = async(m) => {
/**
* to process MessageStubType
* @param {import('@adiwajshing/baileys').proto.WebMessageInfo} m
*/
if (!m.messageStubType) return
const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
if (!chat || chat === 'status@broadcast') return
const emitGroupUpdate = (update) => {
ev.emit('groups.update', [{ id: chat, ...update }])
}
switch (m.messageStubType) {
case WAMessageStubType.REVOKE:
case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
emitGroupUpdate({ revoke: m.messageStubParameters[0] })
break
case WAMessageStubType.GROUP_CHANGE_ICON:
emitGroupUpdate({ icon: m.messageStubParameters[0] })
break
default: {
console.log({
messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType]
})
break
}
}
const isGroup = chat.endsWith('@g.us')
if (!isGroup) return
let chats = conn.chats[chat]
if (!chats) chats = conn.chats[chat] = { id: chat }
chats.isChats = true
const metadata = await conn.groupMetadata(chat).catch(_ => null)
if (!metadata) return
chats.subject = metadata.subject
chats.metadata = metadata
}
conn.insertAllGroup = async() => {
const groups = await conn.groupFetchAllParticipating().catch(_ => null) || {}
for (const group in groups) conn.chats[group] = { ...(conn.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
return conn.chats
}



conn.pushMessage = async(m) => {
/**
* pushMessage
* @param {import('@adiwajshing/baileys').proto.WebMessageInfo[]} m
*/
if (!m) return
if (!Array.isArray(m)) m = [m]
for (const message of m) {
try {
// if (!(message instanceof proto.WebMessageInfo)) continue // https://github.com/adiwajshing/Baileys/pull/696/commits/6a2cb5a4139d8eb0a75c4c4ea7ed52adc0aec20f
if (!message) continue
if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error)
const _mtype = Object.keys(message.message || {})
const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
(_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
_mtype[_mtype.length - 1]
const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
/**
* @type {import('@adiwajshing/baileys').proto.IContextInfo}
*/
let context = message.message[mtype].contextInfo
let participant = conn.decodeJid(context.participant)
const remoteJid = conn.decodeJid(context.remoteJid || participant)
/**
* @type {import('@adiwajshing/baileys').proto.IMessage}
*
*/
let quoted = message.message[mtype].contextInfo.quotedMessage
if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
let qMtype = Object.keys(quoted)[0]
if (qMtype == 'conversation') {
quoted.extendedTextMessage = { text: quoted[qMtype] }
delete quoted.conversation
qMtype = 'extendedTextMessage'
}

if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
const isGroup = remoteJid.endsWith('g.us')
if (isGroup && !participant) participant = remoteJid
const qM = {
key: {
remoteJid,
fromMe: areJidsSameUser(conn.user.jid, remoteJid),
id: context.stanzaId,
participant,
},
message: JSON.parse(JSON.stringify(quoted)),
...(isGroup ? { participant } : {})
}
let qChats = conn.chats[participant]
if (!qChats) qChats = conn.chats[participant] = { id: participant, isChats: !isGroup }
if (!qChats.messages) qChats.messages = {}
if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
let qChatsMessages
if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)) // maybe avoid memory leak
}
}
if (!chat || chat === 'status@broadcast') continue
const isGroup = chat.endsWith('@g.us')
let chats = conn.chats[chat]
if (!chats) {
if (isGroup) await conn.insertAllGroup().catch(console.error)
chats = conn.chats[chat] = { id: chat, isChats: true, ...(conn.chats[chat] || {}) }
}
let metadata, sender
if (isGroup) {
if (!chats.subject || !chats.metadata) {
metadata = await conn.groupMetadata(chat).catch(_ => ({})) || {}
if (!chats.subject) chats.subject = metadata.subject || ''
if (!chats.metadata) chats.metadata = metadata
}
sender = conn.decodeJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || '')
if (sender !== chat) {
let chats = conn.chats[sender]
if (!chats) chats = conn.chats[sender] = { id: sender }
if (!chats.name) chats.name = message.pushName || chats.name || ''
}
} else if (!chats.name) chats.name = message.pushName || chats.name || ''
if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
chats.isChats = true
if (!chats.messages) chats.messages = {}
const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id)
if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
delete message.message.messageContextInfo
delete message.message.senderKeyDistributionMessage
chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
let chatsMessages
if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
}
} catch (e) {
console.error(e)
}
}
}

conn.getBusinessProfile = async (jid) => {
const results = await conn.query({
tag: 'iq',
attrs: {
to: 's.whatsapp.net',
xmlns: 'w:biz',
type: 'get'
},
content: [{
tag: 'business_profile',
attrs: { v: '244' },
content: [{
tag: 'profile',
attrs: { jid }
}]
}]
})
const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile')
if (!profiles) return {} // if not bussines
const address = getBinaryNodeChild(profiles, 'address')
const description = getBinaryNodeChild(profiles, 'description')
const website = getBinaryNodeChild(profiles, 'website')
const email = getBinaryNodeChild(profiles, 'email')
const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category')
return {
jid: profiles.attrs?.jid,
address: address?.content.toString(),
description: description?.content.toString(),
website: website?.content.toString(),
email: email?.content.toString(),
category: category?.content.toString(),
}
}



conn.msToDate = (ms) => {
let days = Math.floor(ms / (24 * 60 * 60 * 1000))
let daysms = ms % (24 * 60 * 60 * 1000)
let hours = Math.floor((daysms) / (60 * 60 * 1000))
let hoursms = ms % (60 * 60 * 1000)
let minutes = Math.floor((hoursms) / (60 * 1000))
let minutesms = ms % (60 * 1000)
let sec = Math.floor((minutesms) / (1000))
return days + " Hari " + hours + " Jam " + minutes + " Menit"
}

conn.msToTime = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

conn.msToHour = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
return [h + ' Jam '].map(v => v.toString().padStart(2, 0)).join(' ')
}

conn.msToMinute = (ms) => {
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
return [m + ' Menit '].map(v => v.toString().padStart(2, 0)).join(' ')
}

conn.msToSecond = (ms) => {
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

conn.clockString = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

conn.filter = (text) => {
let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
if (/[aiueo][aiueo]([qwrtypsdfghjklzxcvbnm])?$/i.test(text)) return text.substring(text.length - 1)
else {
let res = Array.from(text).filter(v => mati.includes(v))
let resu = res[res.length - 1]
for (let huruf of mati) {
if (text.endsWith(huruf)) {
resu = res[res.length - 2]
}
}
let misah = text.split(resu)
return resu + misah[misah.length - 1]
}
}



conn.serializeM = (m) => {
return exports.smsg(conn, m)
}


conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path)
? path
: /^data:.*?\/.*?;base64,/i.test(path)
? Buffer.from(path.split`,`[1], 'base64')
: /^https?:\/\//.test(path)
? await await getBuffer(path)
: fs.existsSync(path)
? fs.readFileSync(path)
: Buffer.alloc(0);
return await conn.sendMessage(
jid,
{ image: buffer, caption: caption, ...options },
{ quoted }
);
};


conn.sendVideo = async (jid, yo, caption = '', quoted = '', gif = false, options) => {
return await conn.sendMessage(jid, { video: yo, caption: caption, gifPlayback: gif, ...options }, {quoted })
}


/**
*
* @param {*} jid
* @param {*} path
* @param {*} quoted
* @param {*} mime
* @param {*} options
* @returns
*/
conn.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await conn.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}


conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })



conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}



conn.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', jpegThumbnail, caption = 'Invitation to join my WhatsApp group', options = {}) => {
let msg = WAProto.Message.fromObject({
groupInviteMessage: WAProto.GroupInviteMessage.fromObject({
inviteCode,
inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : + new Date(new Date + (3 * 86400000)),
groupJid: jid,
groupName: groupName ? groupName : (await conn.groupMetadata(jid)).subject,
jpegThumbnail: jpegThumbnail ? (await getBuffer(jpegThumbnail)).buffer : '',
caption
})
})
const m = generateWAMessageFromContent(participant, msg, options)
return await conn.relayMessage(participant, m.message, { messageId: m.key.id })
}



//SEND 1 KONTAK
conn.sendKontak = (jid, nomor, nama, org = "", quoted = '', opts = {} ) => {
const vcard ="BEGIN:VCARD\n"
+"VERSION:3.0\n"
+ "FN:" +nama +"\n"
+"ORG:" + org + "\n"
+"TEL;type=CELL;type=VOICE;waid=" +nomor + ":+" +nomor +"\n"
+"item1.X-ABLabel:Ponsel\n"
+"item2.EMAIL;type=INTERNET:okeae2410@gmail.com\n"
+"item2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\n"
+"item3.X-ABLabel:Instagram\n"
+"item4.ADR:;;Indonesia;;;;\n"
+"item4.X-ABLabel:Region\n"
+"END:VCARD"
conn.sendMessage(jid,{contacts: {displayName: nama, contacts: [{ vcard }] }, ...opts},{quoted})
};


/**
*
* @param {*} message
* @param {*} filename
* @param {*} attachExtension
* @returns
*/
conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await fromBuffer(buffer)

let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

conn.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.type ? message.type.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}


conn.sendPayment = async (jid, amount, currency, text = '', from, image, options) => {
const requestPaymentMessage = { amount: {
currencyCode: currency || 'USD',
offset: 0,
value: amount || 9.99
},
expiryTimestamp: 0,
amount1000: (amount || 9.99) * 1000,
currencyCodeIso4217: currency || 'USD',
requestFrom: from || '0@s.whatsapp.net',
noteMessage: {
extendedTextMessage: {
text: text || 'Example Payment Message'
}
},
background: !!image ? (await makeBackgroundRequestPayment(image, {
upload: conn.waUploadToServer
})) : undefined
};
return await conn.relayMessage(jid, { requestPaymentMessage }, { ...options });
}

/**
* Send a list message
* @param jid the id to send to
* @param button the optional button text, title and description button
* @param rows the rows of sections list message
*/
conn.sendListM = async (jid, button, rows, quoted, options = {}) => {
const sections = [
{
title: button.title,
rows: [...rows]
}
]
const listMessage = {
text: button.description,
footer: button.footerText,
mentions: await conn.parseMention(button.description),
ephemeralExpiration: global.ephemeral,
title: '',
buttonText:button.buttonText,
sections
}
conn.sendMessage(jid, listMessage, {
quoted,
contextInfo: {
forwardingScore: 999999,
isForwarded: true,
...options
}
})
}


//Funtion untuk mengganti nama file
conn.renameFile = async(path, newPath) => {
return new Promise((res, rej) => {
fs.rename(path, newPath, (err, data) =>
err
? rej(err)
: res(data));
});
}

//Function agar bisa ngetag orang
conn.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


//Function download media tanpa tersimpan
conn.downloadMedia = async (message) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}


//Function to Send Media/File with Automatic Type Specifier
conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
let type = await conn.getFile(path, true)
let { res, data: file, filename: pathFile } = type
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }
}
let opt = { filename }
if (quoted) opt.quoted = quoted
if (!type) if (options.asDocument) options.asDocument = true
let mtype = '', mimetype = type.mime
if (/webp/.test(type.mime)) mtype = 'sticker'
else if (/image/.test(type.mime)) mtype = 'image'
else if (/video/.test(type.mime)) mtype = 'video'
else if (/audio/.test(type.mime)) (
//convert = await (ptt ? toPTT : toAudio)(file, type.ext),
//file = convert.data,
//pathFile = convert.filename,
mtype = 'audio',
mimetype = 'audio/ogg; codecs=opus'
)
else mtype = 'document'
await conn.sendMessage(jid, {
...options,
caption,
ptt,
[mtype]: { url: pathFile },
mimetype
}, {
...opt,
...options
})
return fs.unlinkSync(pathFile)
}

//send ExternlAdReply
conn.sendAdReply = async (jid,text, title, body,link,quoted = {}) => {

let contextInfo = {
forwardingScore: 50,
isForwarded: true,
externalAdReply:{
mediaType: 1,
renderLargerThumbnail : true,
showAdAttribution: false,
title: title,
body: body,
thumbnailUrl: link
}
}
conn.sendMessage(jid,{contextInfo,text},quoted)

}



conn.logger = {
info(...args) {
console.log(
chalk.bold.bgRgb(51, 204, 51)('INFO '),
`[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
chalk.cyan(format(...args))
)
},
error(...args) {
console.log(
chalk.bold.bgRgb(247, 38, 33)('ERROR '),
`[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
chalk.rgb(255, 38, 0)(format(...args))
)
},
warn(...args) {
console.log(
chalk.bold.bgRgb(255, 153, 0)('WARNING '),
`[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
chalk.redBright(format(...args))
)
},
trace(...args) {
console.log(
chalk.grey('TRACE '),
`[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
chalk.white(format(...args))
)
},
debug(...args) {
console.log(
chalk.bold.bgRgb(66, 167, 245)('DEBUG '),
`[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
chalk.white(format(...args))
)
}
}



conn.adReply = async (jid, text, title = '', body = '', buffer, source = '', quoted, options) => {
let { data } = await conn.getFile(buffer, true)
return conn.sendMessage(jid, { text: text,
contextInfo: {
mentionedJid: await conn.parseMention(text),
externalAdReply: {
showAdAttribution: true,
mediaType: 1,
title: title,
body: body,
thumbnail: data,
renderLargerThumbnail: true,
sourceUrl: source
}
}
}, { quoted: quoted, ...options })
}


conn.resize = (buffer, uk1, uk2) => {
return new Promise(async(resolve, reject) => {
let baper = await jimp.read(buffer);
let result = await baper.resize(uk1, uk2).getBufferAsync(jimp.MIME_JPEG)
resolve(result)
})
}


conn.loadMime = async (path) => {
let data = await fileTypeFromFile(path)
Log(data)
return data.mime
}





Object.defineProperty(conn, 'name', {
value: { ...(options.chats || {}) },
configurable: true,





})
if (conn.user?.id) conn.user.jid = conn.decodeJid(conn.user.id)
//bind(conn)
store.bind(conn.ev)
return conn









//------------------------------[ BATAS KATULISTIWA ]----------------------------\\
}

/**
* Serialize Message
* @param {WAConnection} conn
* @param {Object} m
* @param {Boolean} hasParent
*/
export const smsg = async (conn, m, hasParent) => {
if (!m) return m
let M = proto.WebMessageInfo
m = M.fromObject(m)
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
m.chat = conn.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
m.now = m.messageTimestamp
m.isGroup = m.chat.endsWith('@g.us')
m.sender = conn.decodeJid(m.key.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, conn.user.id)
m.from  = m.key.remoteJid


if(m.isGroup){
m.groupMetadata = (m.isGroup ? await conn.groupMetadata(m.from) : {}) || {}
m.groupName =  (m.isGroup ? m.groupMetadata.subject : []) || []
m.groupId =  (m.isGroup ? m.groupMetadata.id : []) || []
m.groupMembers = (m.isGroup ? m.groupMetadata.participants : []) || []
m.groupDesc =  (m.isGroup ? m.groupMetadata.desc : []) || []
m.groupOwner =  (m.isGroup ? m.groupMetadata.subjectOwner : []) || []
m.user = (m.isGroup ? m.groupMembers.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
m.bot = (m.isGroup ? m.groupMembers.find(u => conn.decodeJid(u.id) == conn.user.jid) : {}) || {} // Your Data
m.isRAdmin = m.user && m.user.admin == 'superadmin' || false
m.isAdmin = m.isRAdmin || m.user && m.user.admin == 'admin' || false
m.isBotAdmin = m.bot && m.bot.admin == 'admin' || false // Are you Admin?
}

}



if (m.message) {
let mtype = Object.keys(m.message)
m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) ||
(mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || mtype[mtype.length - 1]
m.type = getContentType(m.message)
m.content = JSON.stringify(m.message)
m.botNumber = conn.user.id ? conn.user.id.split(":")[0]+"@s.whatsapp.net" : conn.user.jid
m.senderNumber = m.sender.split("@")[0]
m.pushname = m.pushName || "No Name"
m.itsMe = m.sender == m.botNumber ? true : false
m.mentionByTag = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : false
m.download = (filepath) => {
if (filepath) return conn.downloadMediaMessage(m, filepath)
else return conn.downloadMediaMessage(m)
}
m.mentionByReply = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
m.users = m.mentionByReply? m.mentionByReply : m.mentionByTag[0]
m.budy = (m.type === 'conversation') ? m.message.conversation : (m.type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
m.body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId ) : ''
m.args = m.body.trim().split(/ +/).slice(1)
m.numberQuery = m.args.join(' ').replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`


m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.type])
if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
if (m.mtype == 'protocolMessage' && m.msg.key) {
if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
}

m.myButton = m.isGroup && (m.type == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.contextInfo.participant !== m.botNumber
|| m.type == 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.contextInfo.participant !== m.botNumber
|| m.type == 'listResponseMessage' && m.message.listResponseMessage.contextInfo.participant !== m.botNumber)


try{
var virus = m.message.extendedTextMessage.contextInfo.externalAdReply.title.length
}catch{
var virus = 100
}

m.virtex = m.type == "groupInviteMessage" && m.message.groupInviteMessage.caption.length > 8000 ||  m.type == "contactMessage" && m.message.contactMessage.displayName.length > 8000 || m.type == "imageMessage" && m.message.imageMessage.caption.length > 8000 || m.budy.length > 8000 && !m.fromMe  || m.type == "extendedTextMessage" && virus > 8000 && !m.fromMe ||  m.type == "productMessage" && m.message.productMessage.product.description.length > 8000 && !m.fromMe


//Ucapan Waktu
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(timeWib < "23:59:00"){ var ucapanWaktu = 'Selamat malam' }
if(timeWib < "19:00:00"){ var ucapanWaktu = 'Selamat malam'}
if(timeWib < "18:00:00"){ var ucapanWaktu = 'Selamat sore'}
if(timeWib < "15:00:00"){ var ucapanWaktu = 'Selamat siang'}
if(timeWib < "11:00:00"){ var ucapanWaktu = 'Selamat pagi'}
if(timeWib < "06:00:00"){ var ucapanWaktu = 'Selamat pagi'}
m.ucapanWaktu = ucapanWaktu

//m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
m.text =  m.body


m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
if (m.quoted) {
let type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = conn.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === conn.user.jid
m.quoted.download = (filepath) => {
if (filepath) return conn.downloadMediaMessage(m, filepath)
else return conn.downloadMediaMessage(m)
}
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
m.quoted.name = conn.getName(m.quoted.sender)
m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
let vM = m.quoted.fakeObj = M.fromObject({
key: {
fromMe: m.quoted.fromMe,
remoteJid: m.quoted.chat,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return null
let q = M.fromObject(await conn.loadMessage(m.quoted.id) || vM)
return exports.smsg(conn, q)
}
if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => conn.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)

/**
* Reply to quoted message
* @param {String|Object} text
* @param {String|false} chatId
* @param {Object} options
*/
m.quoted.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, vM, options)
m.quoted.replys = (text, chatId, options) => conn.replys(chatId ? chatId : m.chat, text, vM, options)
/**
* Copy quoted message
*/
m.quoted.copy = () => exports.smsg(conn, M.fromObject(M.toObject(vM)))

/**
* Forward Quoted Message
* @param {String} jid
* @param {Boolean} forceForward
*/
m.quoted.forward = (jid, forceForward = false) => conn.forwardMessage(jid, vM, forceForward)

/**
* Exact Forward quoted message
* @param {String} jid
* @param {Boolean|Number} forceForward
* @param {Object} options
*/
m.quoted.copyNForward = (jid, forceForward = true, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

/**
* Modify quoted Message
* @param {String} jid
* @param {String} tex
* @param {String} sender
* @param {Object} options
*/
m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => conn.cMod(jid, vM, text, sender, options)

/**
* Delete quoted message
*/
m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
}
}
m.name = !nullish(m.pushName) && m.pushName || conn.getName(m.sender)
if (m.msg && m.msg.url) m.download = (saveToFile = false) => conn.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)

/**
* Reply to this message
* @param {String|Object} text
* @param {String|false} chatId
* @param {Object} options
*/
m.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m, options)
m.replys = (text, chatId, options) => conn.replys(chatId ? chatId : m.chat, text, m, options)
/**
* Exact Forward this message
* @param {String} jid
* @param {Boolean} forceForward
* @param {Object} options
*/
m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => conn.copyNForward(jid, m, forceForward, options)
/**
* Modify this Message
* @param {String} jid
* @param {String} text
* @param {String} sender
* @param {Object} options
*/
m.cMod = (jid, text = '', sender = m.sender, options = {}) => conn.cMod(jid, m, text, sender, options)

/**
* Delete this message
*/
m.delete = () => conn.sendMessage(m.chat, { delete: m.key })
try {
// conn.saveName(m.sender, m.name)
conn.pushMessage(m)
// if (m.isGroup) conn.saveName(m.chat)
if (m.msg && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', m.msg.key)
} catch (e) {
console.error(e)
}
return m
}

let logic = (check, inp, out) => {
if (inp.length !== out.length) throw new Error('Input and Output must have same length')
for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
return null
}




// https://github.com/Nurutomo/wabot-aq/issues/490
export function serialize() {
const MediaType = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage']
return Object.defineProperties(proto.WebMessageInfo.prototype, {
conn: {
value: undefined,
enumerable: false,
writable: true
},
id: {
get() {
return this.key?.id
}
},
isBaileys: {
get() {
return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id?.length === 12 || false
}
},
chat: {
get() {
const senderKeyDistributionMessage = this.message?.senderKeyDistributionMessage?.groupId
return (
this.key?.remoteJid ||
(senderKeyDistributionMessage &&
senderKeyDistributionMessage !== 'status@broadcast'
) || ''
).decodeJid()
}
},
isGroup: {
get() {
return this.chat.endsWith('@g.us')
},
enumerable: true
},
sender: {
get() {
return this.conn?.decodeJid(this.key?.fromMe && this.conn?.user.id || this.participant || this.key.participant || this.chat || '')
},
enumerable: true
},
fromMe: {
get() {
return this.key?.fromMe || areJidsSameUser(this.conn?.user.id, this.sender) || false
}
},
mtype: {
get() {
if (!this.message) return ''
const type = Object.keys(this.message)
return (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(type[0]) && type[0]) || // Sometimes message in the front
(type.length >= 3 && type[1] !== 'messageContextInfo' && type[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3
type[type.length - 1] // common case
},
enumerable: true
},
msg: {
get() {
if (!this.message) return null
return this.message[this.mtype]
}
},
mediaMessage: {
get() {
if (!this.message) return null
const Message = ((this.msg?.url || this.msg?.directPath) ? { ...this.message } : extractMessageContent(this.message)) || null
if (!Message) return null
const mtype = Object.keys(Message)[0]
return MediaType.includes(mtype) ? Message : null
},
enumerable: true
},

mediaType: {
get() {
let message
if (!(message = this.mediaMessage)) return null
return Object.keys(message)[0]
},
enumerable: true,
},
quoted: {
get() {
/**
* @type {ReturnType<typeof makeWASocket>}
*/
const self = this
const msg = self.msg
const contextInfo = msg?.contextInfo
const quoted = contextInfo?.quotedMessage
if (!msg || !contextInfo || !quoted) return null
const type = Object.keys(quoted)[0]
let q = quoted[type]
const text = typeof q === 'string' ? q : q.text
return Object.defineProperties(JSON.parse(JSON.stringify(typeof q === 'string' ? { text: q } : q)), {
mtype: {
get() {
return type
},
enumerable: true
},
mediaMessage: {
get() {
const Message = ((q.url || q.directPath) ? { ...quoted } : extractMessageContent(quoted)) || null
if (!Message) return null
const mtype = Object.keys(Message)[0]
return MediaType.includes(mtype) ? Message : null
},
enumerable: true
},
mediaType: {
get() {
let message
if (!(message = this.mediaMessage)) return null
return Object.keys(message)[0]
},
enumerable: true,
},
id: {
get() {
return contextInfo.stanzaId
},
enumerable: true
},
chat: {
get() {
return contextInfo.remoteJid || self.chat
},
enumerable: true
},
isBaileys: {
get() {
return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id.length === 12 || false
},
enumerable: true
},
sender: {
get() {
return (contextInfo.participant || this.chat || '').decodeJid()
},
enumerable: true
},
fromMe: {
get() {
return areJidsSameUser(this.sender, self.conn?.user.jid)
},
enumerable: true,
},
text: {
get() {
return text || this.caption || this.contentText || this.selectedDisplayText || ''
},
enumerable: true
},
mentionedJid: {
get() {
return q.contextInfo?.mentionedJid || self.getQuotedObj()?.mentionedJid || []
},
enumerable: true
},
name: {
get() {
const sender = this.sender
return sender ? self.conn?.getName(sender) : null
},
enumerable: true

},
vM: {
get() {
return proto.WebMessageInfo.fromObject({
key: {
fromMe: this.fromMe,
remoteJid: this.chat,
id: this.id
},
message: quoted,
...(self.isGroup ? { participant: this.sender } : {})
})
}
},
fakeObj: {
get() {
return this.vM
}
},
download: {
value(saveToFile = false) {
const mtype = this.mediaType
return self.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile)
},
enumerable: true,
configurable: true,
},
reply: {
/**
* Reply to quoted message
* @param {String|Object} text
* @param {String|false} chatId
* @param {Object} options
*/
value(text, chatId, options) {
return self.conn?.reply(chatId ? chatId : this.chat, text, this.vM, options)
},
enumerable: true,
},
copy: {
/**
* Copy quoted message
*/
value() {
const M = proto.WebMessageInfo
return smsg(conn, M.fromObject(M.toObject(this.vM)))
},
enumerable: true,
},
forward: {
/**
* Forward quoted message
* @param {String} jid
*  @param {Boolean} forceForward
*/
value(jid, force = false, options) {
return self.conn?.sendMessage(jid, {
forward: this.vM, force, ...options
}, { ...options })
},
enumerable: true,
},
copyNForward: {
/**
* Exact Forward quoted message
* @param {String} jid
* @param {Boolean|Number} forceForward
* @param {Object} options
*/
value(jid, forceForward = false, options) {
return self.conn?.copyNForward(jid, this.vM, forceForward, options)
},
enumerable: true,

},
cMod: {
/**
* Modify quoted Message
* @param {String} jid
* @param {String} text
* @param {String} sender
* @param {Object} options
*/
value(jid, text = '', sender = this.sender, options = {}) {
return self.conn?.cMod(jid, this.vM, text, sender, options)
},
enumerable: true,

},
delete: {
/**
* Delete quoted message
*/
value() {
return self.conn?.sendMessage(this.chat, { delete: this.vM.key })
},
enumerable: true,

}
})
},
enumerable: true
},
_text: {
value: null,
writable: true,
},
text: {
get() {
const msg = this.msg
const text = (typeof msg === 'string' ? msg : msg?.text) || msg?.caption || msg?.contentText || ''
return typeof this._text === 'string' ? this._text : '' || (typeof text === 'string' ? text : (
text?.selectedDisplayText ||
text?.hydratedTemplate?.hydratedContentText ||
text
)) || ''
},
set(str) {
return this._text = str
},
enumerable: true
},
mentionedJid: {
get() {
return this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid || []
},
enumerable: true
},
name: {
get() {
return !nullish(this.pushName) && this.pushName || this.conn?.getName(this.sender)
},
enumerable: true
},
download: {
value(saveToFile = false) {
const mtype = this.mediaType
return this.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile)
},
enumerable: true,
configurable: true
},
reply: {
value(text, chatId, options) {
return this.conn?.reply(chatId ? chatId : this.chat, text, this, options)
}
},
copy: {
value() {
const M = proto.WebMessageInfo
return smsg(this.conn, M.fromObject(M.toObject(this)))
},
enumerable: true
},
forward: {
value(jid, force = false, options = {}) {
return this.conn?.sendMessage(jid, {
forward: this, force, ...options
}, { ...options })
},
enumerable: true
},
copyNForward: {
value(jid, forceForward = false, options = {}) {
return this.conn?.copyNForward(jid, this, forceForward, options)
},
enumerable: true
},
cMod: {
value(jid, text = '', sender = this.sender, options = {}) {
return this.conn?.cMod(jid, this, text, sender, options)
},
enumerable: true
},
getQuotedObj: {
value() {
if (!this.quoted.id) return null
const q = proto.WebMessageInfo.fromObject(this.conn?.loadMessage(this.quoted.id) || this.quoted.vM)
return smsg(this.conn, q)
},
enumerable: true
},
getQuotedMessage: {
get() {
return this.getQuotedObj
}
},
delete: {
value() {
return this.conn?.sendMessage(this.chat, { delete: this.key })
},
enumerable: true
}
})
}








export function protoType() {
Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
const ab = new ArrayBuffer(this.length);
const view = new Uint8Array(ab);
for (let i = 0; i < this.length; ++i) {
view[i] = this[i];
}
return ab;
}
/**
* @returns {ArrayBuffer}
*/
Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
}
/**
* @returns {Buffer}
*/
ArrayBuffer.prototype.toBuffer = function toBuffer() {
return Buffer.from(new Uint8Array(this))
}
// /**
//  * @returns {String}
//  */
// Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
//     return util.format(this)
// }
Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
return await fileTypeFromBuffer(this)
}
/**
* @returns {Boolean}
*/
String.prototype.isNumber = Number.prototype.isNumber = isNumber
/**
*
* @returns {String}
*/
String.prototype.capitalize = function capitalize() {
return this.charAt(0).toUpperCase() + this.slice(1, this.length)
}
/**
* @returns {String}
*/
String.prototype.capitalizeV2 = function capitalizeV2() {
const str = this.split(' ')
return str.map(v => v.capitalize()).join(' ')
}
String.prototype.decodeJid = function decodeJid() {
if (/:\d+@/gi.test(this)) {
const decode = jidDecode(this) || {}
return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
} else return this.trim()
}
/**
* number must be milliseconds
* @returns {string}
*/
Number.prototype.toTimeString = function toTimeString() {
// const milliseconds = this % 1000
const seconds = Math.floor((this / 1000) % 60)
const minutes = Math.floor((this / (60 * 1000)) % 60)
const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
const days = Math.floor((this / (24 * 60 * 60 * 1000)))
return (
(days ? `${days} day(s) ` : '') +
(hours ? `${hours} hour(s) ` : '') +
(minutes ? `${minutes} minute(s) ` : '') +
(seconds ? `${seconds} second(s)` : '')
).trim()
}
Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}

function isNumber() {
const int = parseInt(this)
return typeof int === 'number' && !isNaN(int)
}


function getRandom() {
if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
return Math.floor(Math.random() * this)
}


/**
* ??
* @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
* @returns {boolean}
*/
function nullish(args) {
return !(args !== null && args !== undefined)
}




