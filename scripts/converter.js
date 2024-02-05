let path = require('path')
let fs = require('fs')
let ExcelJS = require('exceljs')
const assert = require('assert')

const indexToExcelRow = index => (index + 1)

const src = path.resolve(__dirname, './music.xlsx')
const dest = path.resolve(__dirname, '../public/music_list.json')

const loadMusicList = async ({src, dest}) => {
    const buffer = fs.readFileSync(src)

    const workbook = new ExcelJS.Workbook()
    workbook.calcProperties.fullCalcOnLoad = true
    await workbook.xlsx.load(buffer)

    let song_list = []

    if (workbook.worksheets.length > 0) {
        let index = 0
        workbook.worksheets[0].eachRow((r, i) => {
            const song_name = r.getCell(2).text
            if (!song_name) { return }
            if (song_name === '歌名') { return }
            console.log(`${song_name}`)

            let song_data = {}
            song_data.index = index++
            song_data.song_name = song_name || ''
            song_data.artist = r.getCell(4).text || ''
            song_data.language = r.getCell(7).text || ''
            song_data.remarks = r.getCell(6).text || ''

            assert(song_data.song_name.length > 0, JSON.stringify(song_data.song_name))
            song_data.initial = 'A'  // TODO

            song_data.sticky_top = 0
            song_data.paid = 0
            song_data.BVID = ''
            song_data.url = ''

            song_list.push(song_data)
        })
    }
    
    fs.writeFileSync(dest, JSON.stringify(song_list))
    console.log('生成歌单完成')
}

loadMusicList({src, dest})
