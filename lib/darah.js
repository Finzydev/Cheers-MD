import "../settings.js"
import fs from 'fs'
import toMs from 'ms'

let darah = rpg.darahawal
export const  addInventoriDarah = (sender, _darahOrg) => {
       const  obj = {id: sender, healt : darah}
         _darahOrg.push(obj)
//fs.writeFileSync('./database/darah.json', JSON.stringify(_darahOrg))
   }
export const  cekDuluJoinAdaApaKagaDiJson = (sender,_darahOrg) => {
            let status = false
            Object.keys(_darahOrg).forEach((i) => {
                if (_darahOrg[i].id === sender) {
                    status = true
                }
            })
            return status
        }
export const  addDarah = (sender, amount,_darahOrg) => {
            let position = false
            Object.keys(_darahOrg).forEach((i) => {
                if (_darahOrg[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _darahOrg[position].healt += amount
//fs.writeFileSync('./database/darah.json', JSON.stringify(_darahOrg))
            }
        }
 export const  kurangDarah = (sender, amount,_darahOrg) => {
            let position = false
            Object.keys(_darahOrg).forEach((i) => {
                if (_darahOrg[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _darahOrg[position].healt -= amount
//fs.writeFileSync('./database/darah.json', JSON.stringify(_darahOrg))
            }
        }
export const  getDarah = (sender, _darahOrg) => {
            let position = false
            Object.keys(_darahOrg).forEach((i) => {
                if (_darahOrg[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
               return  _darahOrg[position].healt
            }
        }      
         