import axios from 'axios'
import cheerio from 'cheerio'
import request from 'request'
import { JSDOM } from 'jsdom'
import FormData  from 'form-data'
import fetch from 'node-fetch';




  async function ephoto(url, texk) {
      let form = new FormData();
      let gT = await axios.get(url, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        },
      });
      let $ = cheerio.load(gT.data);
      let text = texk;
      let token = $('input[name=token]').val();
      let build_server = $('input[name=build_server]').val();
      let build_server_id = $('input[name=build_server_id]').val();
      form.append('text[]', text);
      form.append('token', token);
      form.append('build_server', build_server);
      form.append('build_server_id', build_server_id);
      let res = await axios({
        url: url,
        method: 'POST',
        data: form,
        headers: {
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
          cookie: gT.headers['set-cookie']?.join('; '),
          ...form.getHeaders(),
        },
      });
      let $$ = cheerio.load(res.data);
      let json = JSON.parse($$('input[name=form_value_input]').val());
      json['text[]'] = json.text;
      delete json.text;
      let { data } = await axios.post(
        'https://en.ephoto360.com/effect/create-image',
        new URLSearchParams(json),
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            cookie: gT.headers['set-cookie'].join('; '),
          },
        }
      );
      return build_server + data.image;
  }

async function surah(query){ 
    let { data }= await axios.get(`https://litequran.net/${query}`)
    const $ = cheerio.load(data)
    const Result = []
    const Isi = []
    var surah = $('body > main > article > h1').text()
    var bismillah = $('body > main > article > p').text()
    $('body > main > article > ol > li:nth-child(n)').each((i, e) => {
      const arabic = $(e).find('p.arabic').text()
      const baca = $(e).find('p.translate').text()
      const arti = $(e).find('p.meaning').text()
      Isi.push({
        arabic,
        baca,
        arti,
      });
    });
    Result.push({surah, bismillah}, Isi)
    return Result
}


async function listsurah(){
  let { data }= await axios.get('https://litequran.net/')
  const $ = cheerio.load(data)
  const Result = []
  $('body > main > ol > li:nth-child(n)').each((i, e) => {
    const name_surah = $(e).find('a').text()
    const link = 'https://litequran.net/' + $(e).find('a').attr('href')
    Result.push({
      link,
      name_surah,
    });
  });
  return Result
}

function accesToken(d, e, f) {
	const alfabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('')
    const h = alfabet.slice(0, e)
    const i = alfabet.slice(0, f)
    let j = d.split('').reverse().reduce(function (a, b, c) {
        if (h.indexOf(b) !== -1) return a += h.indexOf(b) * (Math.pow(e, c))
    }, 0)
    let k = ''
    while (j > 0) {
        k = i[j % f] + k
        j = (j - (j % f)) / f
    }
    return k || '0'
}
function decode(h, u, n, t, e, r) {
    r = ''
    for (let i = 0, len = h.length; i < len; i++) {
        let s = ''
        while (h[i] !== n[e]) {
            s += h[i]
            i++
        }
        for (let j = 0; j < n.length; j++) {
            s = s.replace(new RegExp(n[j], 'g'), j.toString())
        }
        r += String.fromCharCode((x(s, e, 10) - t))
    }
    return decodeURIComponent(encodeURIComponent(r))
}

async function tikmateApp(url) {
    const { data } = await axios.post('https://api.tikmate.app/api/lookup',
        'url=' + encodeURIComponent(url),
        {
            headers: {
                referer: 'https://tikmate.app',
            }
        })
    return {
        ...data,
        videoUrl: `https://tikmate.app/download/${data.token}/${data.id}.mp4`,
        videoUrlHd: `https://tikmate.app/download/${data.token}/${data.id}.mp4?hd=1`,
    }
}

function post(url, formdata) {
  return fetch(url, {
    method: 'POST',
    headers: {
      accept: "*/*",
      'accept-language': "en-US,en;q=0.9",
      'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: new URLSearchParams(Object.entries(formdata))
  })
}
const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/

/**
 * Download YouTube Video via y2mate
 * @param {String} url YouTube Video URL
 * @param {String} quality (avaiable: `144p`, `240p`, `360p`, `480p`, `720p`, `1080p`, `1440p`, `2160p`)
 * @param {String} type (avaiable: `mp3`, `mp4`)
 * @param {String} bitrate (avaiable for video: `144`, `240`, `360`, `480`, `720`, `1080`, `1440`, `2160`)
 * (avaiable for audio: `128`)
 * @param {String} server (avaiable: `id4`, `en60`, `en61`, `en68`)
 */
async function yt(url, quality, type, bitrate, server = 'en68') {
  let ytId = ytIdRegex.exec(url)
  url = 'https://youtu.be/' + ytId[1]
  let res = await post(`https://www.y2mate.com/mates/${server}/analyze/ajax`, {
    url,
    q_auto: 0,
    ajax: 1
  })
  let json = await res.json()
  let { document } = (new JSDOM(json.result)).window
  let tables = document.querySelectorAll('table')
  let table = tables[{ mp4: 0, mp3: 1 }[type] || 0]
  let list
  switch (type) {
    case 'mp4':
      list = Object.fromEntries([...table.querySelectorAll('td > a[href="#"]')].filter(v => !/\.3gp/.test(v.innerHTML)).map(v => [v.innerHTML.match(/.*?(?=\()/)[0].trim(), v.parentElement.nextSibling.nextSibling.innerHTML]))
      break
    case 'mp3':
      list = {
        '128kbps': table.querySelector('td > a[href="#"]').parentElement.nextSibling.nextSibling.innerHTML
      }
      break
    default:
      list = {}
  }
  let filesize = list[quality]
  let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
  let thumb = document.querySelector('img').src
  let title = document.querySelector('b').innerHTML
  let res2 = await post(`https://www.y2mate.com/mates/${server}/convert`, {
    type: 'youtube',
    _id: id[1],
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: type,
    fquality: bitrate
  })
  let json2 = await res2.json()
  let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
  let resUrl = /<a.+?href="(.+?)"/.exec(json2.result)[1]
  return {
    dl_link: resUrl.replace(/https/g, 'http'),
    thumb,
    title,
    filesizeF: filesize,
    filesize: KB
  }
}
let servers = ['en136', 'id4', 'en60', 'en61', 'en68','en154']
/**
   * Download YouTube Video as Audio via y2mate
   * @param {String} url YouTube Video URL
   * @param {String} server (avaiable: `id4`, `en60`, `en61`, `en68`)
   */
 function yta(url, resol = '128kbps', server = 'en154') { return yt(url, resol, 'mp3', resol.endsWith('kbps') ? resol.replace(/kbps/g, '') : resol, server) }
  /**
   * Download YouTube Video as Video via y2mate
   * @param {String} url YouTube Video URL
   * @param {String} server (avaiable: `id4`, `en60`, `en61`, `en68`)
   */
 function ytv(url, resol = '360p', server = 'en136') { return yt(url, resol, 'mp4', resol.endsWith('p') ? resol.replace(/p/g, '') : resol, server) }

function hentai() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/'+page)
        .then((data) => {
            const $ = cheerio.load(data.data)
            const hasil = []
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                })
            })
            resolve(hasil)
        })
    })
}

async function randomTiktok(query) {
	return new Promise(async (resolve, reject) => {
		await axios.get('https://brainans.com/search?query=' + query).then(response => {
			const $ = cheerio.load(response.data)
			const User = $('#search-container > div:nth-child(1) > div.content__text > a').attr('href')
			axios.get('https://brainans.com/' + User).then(respon => {
				const soup = cheerio.load(respon.data)
				const Vidlink = []
				const main = soup('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a')
				main.each(function () {
					const Vlink = 'https://brainans.com/' + soup(this).attr('href')
					Vidlink.push(Vlink)
				})
				pickrandom(Vidlink).then(res => {
					axios.get(res).then(resp => {
						const ch = cheerio.load(resp.data)
						const result = {
							username: ch('#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a').text(),
							caption: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.main_list').text(),
							likes: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span').text(),
							comment: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.content_btns.d-flex > div:nth-child(2) > span').text(),
							share: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.content_btns.d-flex > div:nth-child(3) > span').text(),
							video: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.main_image-container > div > video').attr('src')
						}
						resolve(result)
					})
				}).catch(resolve)
			}).catch(resolve)
		}).catch(resolve)
	})
}
function styletext(teks) {

    return new Promise((resolve, reject) => {

        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)

        .then(({ data }) => {

            let $ = cheerio.load(data)

            let hasil = []

            $('table > tbody > tr').each(function (a, b) {

                hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })

            })

            resolve(hasil)

        })

    })

}

export {
ytv,
yta, 
yt,
ephoto,
surah,
listsurah,
hentai,
styletext,
ytIdRegex, 
tikmateApp,
randomTiktok,
servers 
 }


import { fileURLToPath, URL } from 'url'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
import fs from "fs"
import chalk from'chalk'
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")),chalk.white(`${__filename}`) )
//delete require.cache[file]
import(`${file}?update=${Date.now()}`)
})

