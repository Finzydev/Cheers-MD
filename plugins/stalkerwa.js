import moment from "moment-timezone";
import PhoneNum from "awesome-phonenumber";

let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

let handler = async (m, { conn, text, usedPrefix, command: cmd }) => {
  let num = m.quoted?.sender || m.mentionedJid?.[0] || text;
  if (!num) return m.reply(`Ex: ${usedPrefix + cmd} @tag / 628xxx`);
  num = num.replace(/\D/g, "") + "@s.whatsapp.net";
  if (!(await conn.onWhatsApp(num))[0]?.exists)
    return m.reply("User not exists");
  let img = await conn
    .profilePictureUrl(num, "image")
    .catch((_) => "./src/avatar_contact.png");
  let bio = await conn.fetchStatus(num).catch((_) => {});
  let name = await conn.getName(num);
  let business = await conn.getBusinessProfile(num);
  let format = PhoneNum(`+${num.split("@")[0]}`);
  let country = regionNames.of(format.getRegionCode("international"));
  let wea = `\t\t\t\t*▾ WHATSAPP ▾*

*° Country :* ${country.toUpperCase()}
*° Name :* ${name ? name : "-"}
*° Format Number :* ${format.getNumber("international")}
*° Url Api :* wa.me/${num.split("@")[0]}
*° Mentions :* @${num.split("@")[0]}
*° Status :* ${bio?.status || "-"}
*° Date Status :* ${
    bio?.setAt
      ? moment(bio.setAt.toDateString()).locale("id").format("LL")
      : "-"
  }

${
  business
    ? `\t\t\t\t*▾ INFO BUSINESS ▾*
*° BusinessId :* ${business.wid}
*° Website :* ${business.website ? business.website : "-"}
*° Email :* ${business.email ? business.email : "-"}
*° Category :* ${business.category}
*° Address :* ${business.address ? business.address : "-"}
*° Timeone :* 
*° Descripcion* : ${business.description ? business.description : "-"}`
    : "*Standard WhatsApp Account*"
}`;
  img
    ? await conn.sendMessage(
        m.chat,
        { image: { url: img }, caption: wea, mentions: [num] },
        { quoted: m }
      )
    : m.reply(wea);
  return business;
};

handler.help = ["wastalk"];
handler.tags = ["tools"];
handler.command = /^(wa|whatsapp)stalk$/i;
handler.register = true;

export default handler;
