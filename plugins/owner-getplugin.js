let handler = async (m, { usedPrefix, command, text }) => {
  let ar = Object.keys(plugins)
  let ar1 = ar.map((v) => v.replace(".js", ""));
  if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} menu`;
  const stringSimilarity = require("string-similarity");
let matches = await stringSimilarity.findBestMatch(text.toLowerCase(), ar1)
let teks = `Plugin *${text}* tidak ditemukan\nMungkin yang kamu maksud adalah *${matches.bestMatch.target.toLowerCase()}*`
  if (!ar1.includes(text)) return m.reply(teks)
  m.reply(require("fs").readFileSync("./plugins/" + text + ".js", "utf-8"));
};

handler.help = ["getplugin"].map((v) => v + " <teks>");
handler.tags = ["host"];
handler.command = /^(getplugin|gp)$/i;

handler.rowner = true;

export default handler;