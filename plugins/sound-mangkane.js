import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
m.reply('SIAP UNTUK DJ OM')
let audio = `https://raw.githubusercontent.com/hyuura/Rest-Sound/main/HyuuraKane/${command}.mp3`
await conn.sendFile(m.chat, audio, 'error.mp3', null, repPy, true, {
type: 'audioMessage', 
ptt: false, seconds: 0,contextInfo: {
         externalAdReply: { showAdAttribution: true,
 mediaUrl: `${sig}`,
    mediaType: 2, 
    description: 'sinpel Bot WhatsApp',
    title: "Now Playing...",
    body: `${botName}`,
    thumbnail: await (await fetch('https://telegra.ph/file/f6c18050af760c4882d55.jpg')).buffer(),
    sourceUrl: `${sig}`
}
     }
    })
}
handler.help = ['mangkane1','mangkane2','mangkane3','mangkane4','mangkane5','mangkane6','mangkane7','mangkane8','mangkane9','mangkane10','mangkane11','mangkane12','mangkane13','mangkane14','mangkane15','mangkane16','mangkane17','mangkane18','mangkane19','mangkane20','mangkane21','mangkane22','mangkane23','mangkane24']
handler.tags = ['sound']
handler.command = /^(mangkane1|mangkane2|mangkane3|mangkane4|mangkane5|mangkane6|mangkane7|mangkane8|mangkane9|mangkane10|mangkane11|mangkane12|mangkane13|mangkane14|mangkane15|mangkane16|mangkane17|mangkane18|mangkane19|mangkane20|mangkane21|mangkane22|mangkane23|mangkane24)$/i
handler.limit = true
export default handler
