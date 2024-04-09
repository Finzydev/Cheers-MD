import {
    Cerpen
} from 'dhn-api'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
await m.reply('_wait......_')
            try {
                let item = await Cerpen()
                let cap = ` ${botName}\n🔍 *[ RESULT ]*

${item}
`
                await m.reply(cap)
            } catch (e) {
                await m.reply('_sistem sedang eror_')
            }
}
handler.help = ["cerpen"]
handler.tags = ["internet"]
handler.command = /^(cerpen)$/i
export default handler

/* New Line */