const fs = require('fs')

/**
 * Add badword in database
 * @param {String} kata
 * @param {Object} data
 */
export const addBadword = function(kata, _toxic){
    _toxic.push(kata)
    //fs.writeFileSync('./database/badword.json', JSON.stringify(_toxic))
}

/**
 * delete badword in database
 * @param {String} kata
 * @param {Object} data
 */
 export const delBadword = function(kata, _toxic){
    anu = _toxic.indexOf(kata)
    _toxic.splice(anu, 1)
    //fs.writeFileSync('./database/badword.json', JSON.stringify(_toxic))
}

/**
 * check badword in database
 * @param {String} kata
 * @param {Object} data
 */
 export const isKasar = function(kata, _toxic){
    let status = false
    if (_toxic.includes(kata)){
        status = true
    }
    return status
}

/**
 * AddCount badword in database
 * @param {String} sender
 * @param {Object} data
 */
 export const addCountKasar = function(sender, _toxic){
    var found = false;
    Object.keys(_toxic).forEach((i) => {
        if(_toxic[i].id == sender){
            found = i
        }
    })
    if (found !== false) {
        _toxic[found].count += 1;
        //fs.writeFileSync('./database/senbadword.json',JSON.stringify(_toxic));
    }
}

/**
 * isCOuntKasr badword in database
 * @param {String} sender
 * @param {Object} data
 */
 export const isCountKasar = function(sender, _toxic){
    let found = false
    for (let i of _toxic) {
        if (i.id === sender) {
            let counts = i.count
            if (counts >= 5) {
                found = true
                return true
            } else {
                found = true
                return false
            }
        }
    }
    if (found === false){
        const obj = { id: sender, count: 1 }
        _toxic.push(obj)
        //fs.writeFileSync('./database/senbadword.json', JSON.stringify(_toxic))
        return false
    }
}

/**
 * Delete Count Kasar badword in database
 * @param {String} sender
 * @param {Object} data
 */
 export const delCountKasar = function(sender, _toxic){
    Object.keys(_toxic).forEach((i) => {
        if (_toxic[i].id === sender) {
            _toxic.splice(i, 1)
            //fs.writeFileSync('./database/senbadword.json', JSON.stringify(_toxic))
        }
    })
    return true
}