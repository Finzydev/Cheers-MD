import fs from 'fs';
import fetch from 'node-fetch';
let handler = async (m, { conn, args}) => { 

var teknya = args.join(" ")
 var call = {
 scheduledCallCreationMessage: {
 callType: 1,
 scheduledTimestampMs:  Date.now(),
 title: `${teknya}`
 }
}
conn.relayMessage(m.chat, call, {})
}
 handler.help = ['pler', 'warcall', 'call', 'ehanz', 'tlpn'];
handler.tags = ['warcall-gc'];
handler.command = /^pler|ehzcall|tlpn$/i;
handler.owner = true
export default handler;