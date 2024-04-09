var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
try {
  await m.reply(wait)
  var apii = await fetch(`https://api.betabotz.eu.org/api/search/bard-ai?apikey=${api.erlan}&text=${text}`)
  var res = await apii.json()
  await m.reply(res.message)
} catch (err) {
  console.error(err)
  throw "Terjadi kesalahan dalam menjawab pertanyaan"
}
}
handler.command = /^(bard|bardai(dl)?)$/i;
handler.help = ['bard','bardai'];
handler.tags = ['ai'];
handler.premium = false
module.exports = handler;
