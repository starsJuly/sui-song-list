const assert = require('assert')
const path = require('path')
const fs = require('fs')
const ExcelJS = require('exceljs')

const cnchar = require('cnchar');

([ 'cnchar-poly',
   'cnchar-trad', ]).map(id => require(id))
                    .forEach(f => cnchar.use(f));
;

const getPinyinFirstLetter = str => cnchar.spell(str);
const cnpy1st = getPinyinFirstLetter;

const src = path.resolve(__dirname, './music.xlsx')
const dest = path.resolve(__dirname, '../public/music_list.json')

const loadMusicList = async ({src, dest}) => {
    const map_title_name = {
        '序号': 'index',
        '歌名': 'song_name',
        '歌名翻译': 'song_translated_name',
        '原唱': 'artist',
        '日期': 'date_list',
        '备注': 'remarks',
        '语言': 'language',
        '次数': 'song_count',
        '歌切': 'BVID'
    }

    const buffer = fs.readFileSync(src)

    const workbook = new ExcelJS.Workbook()
    workbook.calcProperties.fullCalcOnLoad = true
    await workbook.xlsx.load(buffer)

    let song_list = []
    if (workbook.worksheets.length > 0) {
        const ws0 = workbook.worksheets[0]

        const findHead = (ws) => {
            for (let i = 1; i <= ws.rowCount; ++i) {
                var row = ws.getRow(i)
                if (row.actualCellCount > 0) { return row }
            }
            return undefined
        }

        const make_row_group_parser = (head) => {
            let row_parsers = {}

            if (head) {
                head.eachCell((cell, idx) => {
                    const unique_id = map_title_name[cell.text]
                    if (unique_id) {
                        row_parsers[unique_id] = { src: {
                                row: 1, col: idx, name: cell.text
                            }, parse(d) { 
                                return d.getCell(this.src.col).text || '';
                        }}
                    }
                })

                let last = -1
                row_parsers.index = { parse: () => ++last }

                row_parsers.song_name && (row_parsers.song_name = Object.setPrototypeOf({
                    parse(d) { const nm = super.parse(d)
                        return (console.log(nm), assert(nm, `song_name not found`), nm)
                    },
                    post: { initial: (v, d) => {
                        const t0 = cnpy1st(v).toUpperCase()
                        let upper = t0[0]
                        if (undefined === upper) debugger
                        if (upper.toLowerCase() === upper) upper = ''
                        return upper
                    }}
                }, row_parsers.song_name))

                row_parsers.sticky_top = row_parsers.paid = { parse: () => 0 }

                row_parsers.url = { parse: () => '' }
            }

            return {
                row_parsers: row_parsers,
                parse(r) {
                    let d = {}
                    Object.entries(this.row_parsers).forEach(([k0, p0,]) => {
                        const v = p0.parse(r)
                        p0.post && Object.entries(p0.post).forEach(([k1, p1,]) => {
                            d[k1] = p1(v, r)
                        })
                        d[k0] = v
                    })
                    return d
                }
            }
        }

        const rows_filter = (group, r, idx) => {
            // Skip empty rows
            if(r.actualCellCount <= 0) { return false }
            if (group.row_parsers.song_name) {
                const song_name_parser = group.row_parsers.song_name
                const song_name = r.getCell(song_name_parser.src.col).text
                // Skip empty name rows
                if (!song_name) { return false }
                // Skip the head row of the table
                else if (song_name === song_name_parser.src.name) { return false }
            }

            return true
        }

        const row_group_parser = make_row_group_parser(findHead(ws0))
        ws0.eachRow((r, i) => {
            if (!rows_filter(row_group_parser, r, i)) { return }
            const song_data = row_group_parser.parse(r)
            song_list.push(song_data)
        })
    }
    
    fs.writeFileSync(dest, JSON.stringify(song_list))
    console.log('生成歌单完成')
}

loadMusicList({src, dest})
