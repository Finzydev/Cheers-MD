import fs from 'fs'


const add = (msg, _data) => {
    const obj = {
        cmd: msg
    }
    _data.push(obj)
    //fs.writeFileSync('./database/blockcmd.json', JSON.stringify(_data))

    return true
}


const del = (command, _data) => {
    Object.keys(_data).forEach((i) => {
        if (_data[i].cmd === command) {
            _data.splice(i, 1)
            //fs.writeFileSync('./database/blockcmd.json', JSON.stringify(_data))
        }
    })
    return true
}



const check = (command, _data) => {
    let status = false
    Object.keys(_data).forEach((i) => {
        if (_data[i].cmd === command) {
            status = true
        }
    })

    return status
}




export default {
    add,
    del,
    check
}


import { fileURLToPath, URL } from 'url'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
import chalk from'chalk'
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")),chalk.white(`${__filename}`) )
import(`${file}?update=${Date.now()}`)
})

