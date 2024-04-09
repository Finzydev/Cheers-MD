import fs from 'fs'
import toMs from 'ms'
import { reSize } from "../lib/myfunc.js" 

/**
 * Add Sewa group.
 * @param {String} gid 
 * @param {String} expired 
 * @param {Object} _dir 
 */
const addSewaGroup = (gid, subject, link, expired, _dir) => {
 let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === gid) {
            position = i
        }
    })
    if (position !== null) {
       _dir[position].expired = Date.now() + toMs(expired)
     // fs.writeFileSync('./database/sewa.json', JSON.stringify(_dir))
    } else {
 const obj = { id: gid, group: subject, linkgc: link, expired: Date.now() + toMs(expired)}
    _dir.push(obj)
   // fs.writeFileSync('./database/sewa.json', JSON.stringify(_dir))
      
    }

  
   
}

/**
 * Get sewa group position.
 * @param {String} gid 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getSewaPosition = (gid, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === gid) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

/**
 * Get sewa group expire.
 * @param {String} gid 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getSewaExpired = (gid, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === gid) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].expired
    }
}

/**
 * Check group is sewa.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const checkSewaGroup = (gid, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === gid) {
            status = true
        }
    })
    return status
}

/**
 * Constantly checking sewa.
 * @param {object} WAConnection
 * @param {Object} _dir 
 */
const expiredCheck = async (conn, _dir) => {

let position = null
Object.keys(_dir).forEach(async (i) => {
if(Date.now() >= _dir[i].expired) {
 position = i   
}
})
if (position !== null) { 
console.log(`Sewa expired: ${_dir[position].id}`)
let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)
//Log(anus)
if(_dir[position].id == undefined) return
if(anus.includes(_dir[position].id)){

let image = { url : `https://telegra.ph/file/39d61035804d961dbf89f.jpg`}
const imgg = await reSize(image, 300, 300) 
	
const muk = [
{urlButton: { displayText: `Sewa Bot`,
url: `https://wa.me/p/8960486383991478/6285811965686`}}]

let teks =  `Waktu sewa di grup ini sudah habis, bot akan keluar otomatis`

let buttonMessage = {
location: { jpegThumbnail: imgg } ,
caption: teks,
footer: copyright,
templateButtons: muk,
headerType: "LOCATION"
}

await conn.sendMessage(_dir[position].id,buttonMessage)

  
await conn.groupLeave(_dir[position].id)
await _dir.splice(position, 1)
//await fs.writeFileSync('./database/sewa.json', JSON.stringify(_dir))
} else {
console.log('Menghapus data sewa yang tidak tersedia')
await _dir.splice(position, 1)
//await fs.writeFileSync('./database/sewa.json', JSON.stringify(_dir))
  
}
    

        }

}


          
         



/**
 * Get all premium user ID.
 * @param {Object} _dir 
 * @returns {String[]}
 */
const getAllPremiumUser = (_dir) => {
    const array = []
    Object.keys(_dir).forEach((i) => {
        array.push(_dir[i].id)
    })
    return array
}

export default {
    addSewaGroup,
    getSewaExpired,
    getSewaPosition,
    expiredCheck,
    checkSewaGroup,
    getAllPremiumUser
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
