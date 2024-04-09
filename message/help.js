

import moment from "moment-timezone"
import fs from "fs"
import chalk from 'chalk'
import ms from "parse-ms"
import speed from "performance-now"
import {runtime,kyun} from "../lib/myfunc.js" 
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const timeWit= moment().tz('Asia/Makassar').format('HH:mm:ss')
const timeWita = moment().tz('Asia/Jayapura').format('HH:mm:ss')
moment.tz.setDefault("Asia/Jakarta").locale("id");

//Total fitur by Official Dittaz
const totalFitur = () =>{
var mytext = fs.readFileSync("./message/case.js").toString()
var numUpper = (mytext.match(/case '/g) || []).length;
return numUpper
}

const timestampp = speed();
const latensi = speed() - timestampp
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)

let dot = new Date(new Date + 3600000)
const dateIslamic = Intl.DateTimeFormat("id" + '-TN-u-ca-islamic', {day: 'numeric',month: 'long',year: 'numeric'}).format(dot)

let yes = "*「 _Error_ 」* ❌"
let no =""
let { userXp, userLeveling } = (await import('../lib/user.js'))

const feat = (q) => {
let status = false
Object.keys(db.data.listerror).forEach((i) => {
if (db.data.listerror[i].cmd === q) {
status = true
}
})
return status
}

const app = `⭓.`
const apz = `❍┈┈`
const Last = `└──···☉`

export const allmenu = async (isPremium,thisHit, publik, sender, prefix, pushname,userLevel) => {
return`
▀██▀─▄███▄─▀██─██▀██▀▀█
─██─███─███─██─██─██▄█
─██─▀██▄██▀─▀█▄█▀─██▀█
▄██▄▄█▀▀▀─────▀──▄██▄▄█
ᯓ★ *Nama:* ${pushname}
ᯓ★ *Nomor:* wa.me/${sender.split("@")[0]}
ᯓ★ *Islamic* : ${dateIslamic}
ᯓ★ *Status:* ${isPremium ? 'Premium user':'Free user'}
ᯓ★ *Total User* : ${Object.keys(db.data.users).length}
ᯓ★ *Speed Bot:* ${latensi.toFixed(4)} Second
ᯓ★ *Level Saat Ini:* ${userLevel}
ᯓ★ *Limit Tersisa:* ${isPremium ? 'Unlimited' : `${db.data.users[sender].limit}`} limit
  𓆝 𓆟 𓆞 𓆝 𓆟
`+readmore+`
「 ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴇʙᴇʀʜᴀsɪʟᴀɴ ʏᴀɴɢ ᴅᴀᴛᴀɴɢ sᴇᴄᴀʀᴀ ɪɴsᴛᴀɴ, ᴛᴇᴛᴀᴘɪ sᴇᴛɪᴀᴘ ʟᴀɴɢᴋᴀʜ ᴋᴇᴄɪʟ ᴍᴇɴᴜᴊᴜ ᴛᴜᴊᴜᴀɴᴍᴜ ᴀᴅᴀʟᴀʜ ᴋᴇᴍᴀᴊᴜᴀɴ ʏᴀɴɢ ʙᴇʀᴀʀᴛɪ 」

кєтιк *.allmenu* υηтυк мєηαмριℓкαη ѕємυα мєηυ 
кєтιк *.menurpg* υηтυк мєηαмριℓкαη rρɠ

➲ Beri Jeda Yah Kak ^ω^
➲ Bot masih dalam tahap pengembangan, mohon dimaklumi ya kak ><

`}

export const fitur = async ( limitCount, isPremium,thisHit, publik, sender, prefix, pushname) => {
const data = global.db.data.others['newinfo']
const info = data ? data.info : ""
const block = await conn.fetchBlocklist()
const timeInfo = data ? clockString(new Date - data.lastinfo)  : "tidak ada"
return`
╔══╗╔╗ ♡ ♡ ♡
╚╗╔╝║║╔═╦╦╦╔╗
╔╝╚╗║╚╣║║║║╔╣
╚══╝╚═╩═╩═╩═╝
ஜ۞ஜ YOU ஜ۞ஜ
✦┈O┈┈O┈ *ɪ ɴ ғ ᴏ - ʙ ᴏ ᴛ ᴢ* ┈✦
│ᯓ★︎ ʀᴜɴɪɴɢ ᴏɴ :  ${runWith}
│ᯓ★︎ ᴍᴏᴅᴇ : ${publik ? "Public" : "Self"}
│ᯓ★ ʜɪᴛ ᴛᴏᴅᴀʏ : ${thisHit  == undefined? "0" : thisHit.toLocaleString()}
│ᯓ★︎ ᴛᴏᴛᴀʟ ғᴇᴀᴛᴜʀᴇ : ${totalFitur()}
│ᯓ★︎ ᴛᴏᴛᴀʟ ᴇʀʀᴏʀ: ${db.data.listerror.length}
│ᯓ★ ᴛᴏᴛᴀʟ ᴜsᴇʀ : ${Object.keys(db.data.users).length}
│ᯓ★︎ ᴜsᴇʀ ʙᴀɴɴᴇᴅ : ${db.data.banned.length}
│ᯓ★ ᴜsᴇʀ ʙʟᴏᴄᴋᴇᴅ : ${block.length}
│ᯓ★︎ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ : ${db.data.premium.length}
│ᯓ★︎ ᴄᴍᴅ ʙʟᴏᴄᴋᴇᴅ : ${db.data.blockcmd.length} 
꒰⚘݄꒱₊_______________________˓🝊
      𓆝 𓆟 𓆞 𓆝 𓆟
╭୧⍤⃝─┈◦• *ɪ ɴ ғ ᴏ - ᴛ ɪ ᴍ ᴇ* 
│ᯓ★︎  ${week}, ${calender} 
│ᯓ★︎  ${timeWib} WIB 
│ᯓ★︎  ${dateIslamic}
꒰⚘݄꒱₊_______________________˓🝊
      𓆝 𓆟 𓆞 𓆝 𓆟
╭୧⍤⃝─┈◦• *ɪ ɴ ғ ᴏ - ᴜ ᴘ ᴅ ᴀ ᴛ ᴇ*
│ᯓ★︎  ${info}
│ᯓ★  di update ${timeInfo} yang lalu
꒰⚘݄꒱₊_______________________˓🝊
`+readmore+`

❍┈┈「 *MAIN MENU* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.totalfitur
╎│•⭓.runtime
╎│•⭓.speed
╎│•⭓.ping
╎│•⭓.gcbot
╎│•⭓.script
╎│•⭓.dashboard
╎│•⭓.owner
╎│•⭓.rules
╎│•⭓.donasi
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU DOWNLOAD* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.play
╎│•⭓.playmp3
╎│•⭓.playmp4
╎│•⭓.ytsearch
╎│•⭓.tiktok
╎│•⭓.tiktok2
╎│•⭓.ttaudio
╎│•⭓.ttsearch
╎│•⭓.instagram
╎│•⭓.remini
╎│•⭓.txt2img
╎│•⭓.jadianime
╎│•⭓.mediafire
╎│•⭓.gdrive
╎│•⭓.snackvideo
╎│•⭓.cocofun
╎│•⭓.twitter
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU CONVERT* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.tovideo
╎│•⭓.toptv
╎│•⭓.tomp3
╎│•⭓.tovn
╎│•⭓.toimg
╎│•⭓.togif
╎│•⭓.terbalik
╎│•⭓.bass
╎│•⭓.blown
╎│•⭓.deep
╎│•⭓.earrape
╎│•⭓.fast
╎│•⭓.fat
╎│•⭓.nightcore
╎│•⭓.reverse
╎│•⭓.robot
╎│•⭓.slow
╎│•⭓.moth
╎│•⭓.tupai
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU STICKER* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.sticker
╎│•⭓.smeme
╎│•⭓.swm
╎│•⭓.ttp
╎│•⭓.attp
╎│•⭓.qc
╎│•⭓.emojimix
╎│•⭓.mukelu
╎│•⭓.gurastick
╎│•⭓.lovestick
╎│•⭓.dogestick
╎│•⭓.paimon
╎│•⭓.patrick
╎│•⭓.cry
╎│•⭓.kill
╎│•⭓.hug
╎│•⭓.pat
╎│•⭓.lick
╎│•⭓.kiss
╎│•⭓.bite
╎│•⭓.yeet
╎│•⭓.bully
╎│•⭓.bonk
╎│•⭓.wink
╎│•⭓.poke
╎│•⭓.nom
╎│•⭓.slap
╎│•⭓.smile
╎│•⭓.wave
╎│•⭓.awoo
╎│•⭓.blush
╎│•⭓.smug
╎│•⭓.glomp
╎│•⭓.happy
╎│•⭓.dance
╎│•⭓.cringe
╎│•⭓.cuddle
╎│•⭓.highfive
╎│•⭓.handhold
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *TOOLS & SEARCH* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.tourl
╎│•⭓.cut30
╎│•⭓.tinyurl
╎│•⭓.lirik
╎│•⭓.get
╎│•⭓.infocuaca
╎│•⭓.ssweb
╎│•⭓.kalkulator
╎│•⭓.translate
╎│•⭓.infogempa
╎│•⭓.updategempa
╎│•⭓.pinterest
╎│•⭓.jarak
╎│•⭓.goggle
╎│•⭓.brainly
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU AI* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.ai
╎│•⭓.miku
╎│•⭓.luffy
╎│•⭓.robin
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *PERDOI'AN* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.tembak
╎│•⭓.terima
╎│•⭓.tolak
╎│•⭓.ikhlas
╎│•⭓.cekpacar
╎│•⭓.putus
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU HAROM* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.asupan
╎│•⭓.paptt
╎│•⭓.hentaivid
╎│•⭓.bkp
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU NSFW* 」
╎╭──────────┈◦•◦❥•◦
╎╎│•⭓.nsfw
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *QUOTE* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.pantun
╎│•⭓.motivasi
╎│•⭓.katabijak
╎│•⭓.kataanime2
╎│•⭓.dilanquote
╎│•⭓.quotesimage
╎│•⭓.quotessad
╎│•⭓.quotesanime
╎│•⭓.quotesbacot
╎│•⭓.quotesbucin
╎│•⭓.quotesgalau
╎│•⭓.quotesgombal
╎│•⭓.quoteshacker
╎│•⭓.quotesislam
╎│•⭓.quotesrenungan
╎│•⭓.quotessenja
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU GROUP* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.public
╎│•⭓.self
╎│•⭓.ban
╎│•⭓.unban
╎│•⭓.listban
╎│•⭓.banchat
╎│•⭓.unbanchat
╎│•⭓.gc ( options )
╎│•⭓.on ( options )
╎│•⭓.banstik
╎│•⭓.unbanstik
╎│•⭓.profi
╎│•⭓.infogc
╎│•⭓.topbalance
╎│•⭓.afk
╎│•⭓.opentime
╎│•⭓.closetime
╎│•⭓.add
╎│•⭓.kick
╎│•⭓.kickme
╎│•⭓.addkick
╎│•⭓.delkick
╎│•⭓.listkick
╎│•⭓.demote
╎│•⭓.demoteall
╎│•⭓.promote
╎│•⭓.hidetag
╎│•⭓.givesaldo
╎│•⭓.givelimit
╎│•⭓.kurangsaldo
╎│•⭓.kuranglimit
╎│•⭓.setppgc
╎│•⭓.delppgc
╎│•⭓.setnamegc
╎│•⭓.setdesc
╎│•⭓.ceksider
╎│•⭓.cekasalmember
╎│•⭓.listonline
╎│•⭓.tagall
╎│•⭓.del
╎│•⭓.tagme
╎│•⭓.getppgc
╎│•⭓.getidgc
╎│•⭓.getpp
╎│•⭓.getname
╎│•⭓.intro
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU FUN* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.wikwik
╎│•⭓.bisakah
╎│•⭓.bagaimanakah
╎│•⭓.apakah
╎│•⭓.kapankah
╎│•⭓.cekwatak
╎│•⭓.cekhobby
╎│•⭓.cekmemek
╎│•⭓.cekkontol
╎│•⭓.cebelapaimutciaku
╎│•⭓.tiktokghea
╎│•⭓.tiktokpanrika
╎│•⭓.tiktokbocil
╎│•⭓.tiktokkayes
╎│•⭓.cosplayangel
╎│•⭓.videogalau
╎│•⭓.wibuvid
╎│•⭓.chinese
╎│•⭓.hijab
╎│•⭓.indo
╎│•⭓.japanese
╎│•⭓.korean
╎│•⭓.malaysia
╎│•⭓.randomgirl
╎│•⭓.randomboy
╎│•⭓.thailand
╎│•⭓.vietnam
╎│•⭓.jjanime
╎│•⭓.jjmeryani
╎│•⭓.bucinserti
╎│•⭓.pacarsertifikat
╎│•⭓.tololsertifikat
╎│•⭓.genjot
╎│•⭓.nenen
╎│•⭓.perkosa
╎│•⭓.curhat
╎│•⭓.jkt48
╎│•⭓.jadian
╎│•⭓.jodohku
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU PRIMBON* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.artinama
╎│•⭓.artimimpi
╎│•⭓.kecocokanpasangan
╎│•⭓.ramalancinta
╎│•⭓.kecocokannama
╎│•⭓.jadiannikah
╎│•⭓.sifatusaha
╎│•⭓.rezeki
╎│•⭓.pekerjaan
╎│•⭓.nasib
╎│•⭓.penyakit
╎│•⭓.artitarot
╎│•⭓.fengshui
╎│•⭓.haribaik
╎│•⭓.harisangar
╎│•⭓.harisial
╎│•⭓.harinaga
╎│•⭓.peruntungan
╎│•⭓.weton
╎│•⭓.karakter
╎│•⭓.masasubur
╎│•⭓.zodiak
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU EPHOTO* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.writetext
╎│•⭓.advancedglow
╎│•⭓.typographytext
╎│•⭓.pixelglitch
╎│•⭓.neonglitch
╎│•⭓.flagtext
╎│•⭓.flag3dtext
╎│•⭓.deletingtext
╎│•⭓.blackpinkstyle
╎│•⭓.glowingtext
╎│•⭓.underwatertext
╎│•⭓.logomaker
╎│•⭓.cartoonstyle
╎│•⭓.papercutstyle
╎│•⭓.watercolortext
╎│•⭓.effectclouds
╎│•⭓.blackpinklogo
╎│•⭓.gradienttext
╎│•⭓.summerbeach
╎│•⭓.luxurygold
╎│•⭓.glitchtext
╎│•⭓.multicoloredneon
╎│•⭓.sandsummer
╎│•⭓.galaxywallpaper
╎│•⭓.1917style
╎│•⭓.makingneon
╎│•⭓.royaltext
╎│•⭓.freecreate
╎│•⭓.galaxystyle
╎│•⭓.lighteffects
╎│•⭓.shadow
╎│•⭓.cup
╎│•⭓.cup1
╎│•⭓.romance
╎│•⭓.smoke
╎│•⭓.burnpaper
╎│•⭓.lovemessage
╎│•⭓.undergrass
╎│•⭓.love
╎│•⭓.coffe
╎│•⭓.woodheart
╎│•⭓.woodenboard
╎│•⭓.summer3d
╎│•⭓.wolfmetal
╎│•⭓.nature3d
╎│•⭓.underwater
╎│•⭓.golderrose
╎│•⭓.summernature
╎│•⭓.letterleaves
╎│•⭓.glowingneon
╎│•⭓.fallleaves
╎│•⭓.flamming
╎│•⭓.harrypotter
╎│•⭓.carvedwood
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU TEXTPRO* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.flaming1
╎│•⭓.flaming2
╎│•⭓.flaming3
╎│•⭓.flaming4
╎│•⭓.flaming5
╎│•⭓.flaming6
╎│•⭓.pornhub
╎│•⭓.glitch
╎│•⭓.avenger
╎│•⭓.space
╎│•⭓.ninjalogo
╎│•⭓.marvelstudio
╎│•⭓.lionlogo
╎│•⭓.wolflogo
╎│•⭓.steel3d
╎│•⭓.wallgravity
╎│•⭓.blackpink
╎│•⭓.neon
╎│•⭓.greenneon
╎│•⭓.advanceglow
╎│•⭓.futureneon
╎│•⭓.sandwriting
╎│•⭓.sandsummer
╎│•⭓.sandengraved
╎│•⭓.metaldark
╎│•⭓.neonlight
╎│•⭓.holographic
╎│•⭓.text1917
╎│•⭓.minion
╎│•⭓.deluxesilver
╎│•⭓.newyearcard
╎│•⭓.bloodfrosted
╎│•⭓.halloween
╎│•⭓.jokerlogo
╎│•⭓.fireworksparkle
╎│•⭓.natureleaves
╎│•⭓.bokeh
╎│•⭓.toxic
╎│•⭓.strawberry
╎│•⭓.bok3d
╎│•⭓.breakwall
╎│•⭓.icecold
╎│•⭓.luxury
╎│•⭓.cloud
╎│•⭓.summersand
╎│•⭓.horrorblood
╎│•⭓.thunder
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *ANONYMOUS* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.confes
╎│•⭓.menfes
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU ANIME* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.anime
╎│•⭓.storyanime
╎│•⭓.randomanime
╎│•⭓.naotomori
╎│•⭓.loli
╎│•⭓.cosplay
╎│•⭓.husbu
╎│•⭓.milf
╎│•⭓.wallml
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU ISLAMIC* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.kisahnabi
╎│•⭓.alquran
╎│•⭓.alquranaudio
╎│•⭓.asmaulhusna
╎│•⭓.islamic
╎│•⭓.jadwalsholat
╎│•⭓.surah
╎│•⭓.listsurah
╎│•⭓.getsurah
╎│•⭓.alkitab [ kristen ]
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU RANDOM* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.cyberspace
╎│•⭓.mountain
╎│•⭓.programming
╎│•⭓.technology
╎│•⭓.memeindo
╎│•⭓.pantun
╎│•⭓.motivasi
╎│•⭓.katabijak
╎│•⭓.dilanquote
╎│•⭓.cogan
╎│•⭓.cecan
╎│•⭓.lisa
╎│•⭓.yulibocil
╎│•⭓.kpop
╎│•⭓.mikey
╎│•⭓.hijaber
╎│•⭓.ngawi
╎│•⭓.waifu
╎│•⭓.husbu
╎│•⭓.pubg
╎│•⭓.boneka
╎│•⭓.art
╎│•⭓.awoo
╎│•⭓.exo
╎│•⭓.elf
╎│•⭓.estetic
╎│•⭓.wallnime
╎│•⭓.quotesimage
╎│•⭓.sound1-119
╎│•⭓.mangkane1-54
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU GAME* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.math
╎│•⭓.family100
╎│•⭓.susunkata
╎│•⭓.caklontong
╎│•⭓.tebakgambar
╎│•⭓.tebaktebakan
╎│•⭓.tebakbendera
╎│•⭓.tebakkata
╎│•⭓.tebaklirik
╎│•⭓.tebakgame
╎│•⭓.tebakbom
╎│•⭓.tebaklagu
╎│•⭓.tekateki
╎│•⭓.suit
╎│•⭓.war
╎│•⭓.claim
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU RPG* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.adventure
╎│•⭓.bank
╎│•⭓.nabung
╎│•⭓.tarik
╎│•⭓.korupsi
╎│•⭓.berburu
╎│•⭓.berdagang
╎│•⭓.berkebun
╎│•⭓.judi
╎│•⭓.judipvp
╎│•⭓.bonus
╎│•⭓.buah
╎│•⭓.build
╎│•⭓.bunuh
╎│•⭓.casino
╎│•⭓.collect
╎│•⭓.cook
╎│•⭓.craft
╎│•⭓.daily
╎│•⭓.dapur
╎│•⭓.dungeon
╎│•⭓.makan
╎│•⭓.feed
╎│•⭓.fight
╎│•⭓.gajian
╎│•⭓.pergi
╎│•⭓.heal
╎│•⭓.hourclaim
╎│•⭓.hunt
╎│•⭓.inventory
╎│•⭓.kandang
╎│•⭓.karung
╎│•⭓.kerja
╎│•⭓.koboy
╎│•⭓.kolam
╎│•⭓.latih
╎│•⭓.peringkat
╎│•⭓.maling
╎│•⭓.mancing
╎│•⭓.membunuh
╎│•⭓.merampok
╎│•⭓.merchant
╎│•⭓.mining
╎│•⭓.minum
╎│•⭓.misirpg
╎│•⭓.monthly
╎│•⭓.mulung
╎│•⭓.nebang
╎│•⭓.nguli
╎│•⭓.ojek
╎│•⭓.open
╎│•⭓.openbo
╎│•⭓.pasar
╎│•⭓.petshop
╎│•⭓.polisi
╎│•⭓.redeem
╎│•⭓.ref
╎│•⭓.repair
╎│•⭓.restoran
╎│•⭓.rob
╎│•⭓.roket
╎│•⭓.nyampah
╎│•⭓.slectskill
╎│•⭓.sell ( *shoprpg* )
╎│•⭓.smelt
╎│•⭓.smith
╎│•⭓.sumbangan
╎│•⭓.taxy
╎│•⭓.kirim ( *ini transfer yang rpg* )
╎│•⭓.upgrade
╎│•⭓.attack
╎│•⭓.war
╎│•⭓.weekly
╎꒰⚘݄꒱₊___________________.⸙͎۫
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU STORAGE* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.addrespon
╎│•⭓.listrespon
╎│•⭓.delrespon
╎│•⭓.addvn
╎│•⭓.listvn
╎│•⭓.delvn
╎│•⭓.addstik
╎│•⭓.liststik
╎│•⭓.delstik
╎│•⭓.getallstik
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *SETTINGS* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.addcmdlimit
╎│•⭓.delcmdlimit
╎│•⭓.listcmdlimit
╎│•⭓.addcmdprem
╎│•⭓.listcmdprem
╎│•⭓.delsmdprem
╎│•⭓.addcmdowner
╎│•⭓.delcmdowner
╎│•⭓.listcmdowner
╎│•⭓.addprem
╎│•⭓.listprem
╎│•⭓.delprem
╎│•⭓.cekprem
╎│•⭓.addowner
╎│•⭓.delowner
╎│•⭓.listowner
╎│•⭓.blockcmd
╎│•⭓.unblockcmd
╎│•⭓.listblockcmd
╎│•⭓.setppbot
╎│•⭓.setbiobot
╎│•⭓.setnamebot
╎│•⭓.setimgreply
╎│•⭓.setimgdoc
╎│•⭓.setimgquoted
╎│•⭓.setfakeimg
╎│•⭓.setvideo
╎│•⭓.setthumb
╎│•⭓.clearban
╎│•⭓.clearhit
╎│•⭓.clearlevel
╎│•⭓.clearallerror
╎│•⭓.clearalluser
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
❍┈┈「 *MENU OWNER* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.addprem
╎│•⭓.delprem
╎│•⭓.listprem
╎│•⭓.cekprem
╎│•⭓.addowner
╎│•⭓.delowner
╎│•⭓.listowner
╎│•⭓.ban
╎│•⭓.unban
╎│•⭓.listban
╎│•⭓.block
╎│•⭓.unblock
╎│•⭓.listblock
╎│•⭓.getcase
╎│•⭓.getfile
╎│•⭓.sms
╎│•⭓.call
╎│•⭓.warcall
╎│•⭓.warclear
╎│•⭓.ehzcall
╎│•⭓.teskal
╎│•⭓.spamchat
╎│•⭓.joincall
╎│•⭓.join
╎│•⭓.out
╎│•⭓.listgc
╎│•⭓.listpc
╎│•⭓.cleartoxic
╎│•⭓.clearreror
╎│•⭓.clearuser
╎│•⭓.clearban
╎│•⭓.clearlevel
╎│•⭓.clearhit
╎│•⭓.clearanonim
╎│•⭓.sf
╎│•⭓.$
╎│•⭓.>
╎꒰⚘݄꒱₊___________________🝳
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦

`+'𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘉𝘺 𝘕𝘰𝘥𝘦𝘫𝘴'
}
export const menuplug = (prefix) => {
return`
❍┈┈「 *MENU RPG* 」
╎╭──────────┈◦•◦❥•◦
╎│•⭓.adventure
╎│•⭓.bank
╎│•⭓.nabung
╎│•⭓.tarik
╎│•⭓.korupsi
╎│•⭓.berburu
╎│•⭓.berdagang
╎│•⭓.berkebun
╎│•⭓.judi
╎│•⭓.judipvp
╎│•⭓.bonus
╎│•⭓.buah
╎│•⭓.build
╎│•⭓.bunuh
╎│•⭓.casino
╎│•⭓.collect
╎│•⭓.cook
╎│•⭓.craft
╎│•⭓.ambil ( *claimrpg* )
╎│•⭓.dapur
╎│•⭓.dungeon
╎│•⭓.makan
╎│•⭓.feed
╎│•⭓.fight
╎│•⭓.gajian
╎│•⭓.pergi
╎│•⭓.heal
╎│•⭓.hourclaim
╎│•⭓.hunt
╎│•⭓.inventory
╎│•⭓.kandang
╎│•⭓.karung
╎│•⭓.kerja
╎│•⭓.koboy
╎│•⭓.kolam
╎│•⭓.latih
╎│•⭓.peringkat
╎│•⭓.maling
╎│•⭓.mancing
╎│•⭓.membunuh
╎│•⭓.merampok
╎│•⭓.merchant
╎│•⭓.mining
╎│•⭓.minum
╎│•⭓.misirpg
╎│•⭓.monthly
╎│•⭓.mulung
╎│•⭓.nebang
╎│•⭓.nguli
╎│•⭓.ojek
╎│•⭓.open
╎│•⭓.openbo
╎│•⭓.pasar
╎│•⭓.petshop
╎│•⭓.polisi
╎│•⭓.redeem
╎│•⭓.ref
╎│•⭓.repair
╎│•⭓.restoran
╎│•⭓.rob
╎│•⭓.roket
╎│•⭓.nyampah
╎│•⭓.slectskill
╎│•⭓.sell ( *shoprpg* )
╎│•⭓.smelt
╎│•⭓.smith
╎│•⭓.sumbangan
╎│•⭓.taxy
╎│•⭓.kirim ( *ini transfer yang rpg* )
╎│•⭓.upgrade
╎│•⭓.attack
╎│•⭓.war
╎│•⭓.weekly
╎꒰⚘݄꒱₊___________________.⸙͎۫
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✦
ꜱɪᴍᴘᴇʟ ʙᴏᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴄᴀꜱᴇ&ᴘʟᴜɢɪɴꜱ
-Finzydevofc-`+'#CheersBotz'
}



