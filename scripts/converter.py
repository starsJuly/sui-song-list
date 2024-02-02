import json
import pandas as pd
import math
import time
from pypinyin import Style, lazy_pinyin
song_df = pd.read_excel('./music.xlsx', dtype={'网易云播客id': str})
song_df = song_df.where(pd.notnull(song_df), None)
song_list = []


print('开始生成歌单')
for index, row in song_df.iterrows():
    if (not row[1]): continue

    print(row[1])
    
    song_data = {}
    song_data['index'] = index
    song_data['song_name'] = row[1] or ''
    song_data['artist'] = row[3] or ''
    song_data['language'] = row[6] or ''
    song_data['remarks'] = row[5] or ''

    assert(len(song_data['song_name']) > 0)
    song_data['initial'] = lazy_pinyin(song_data['song_name'], 
                                       style=Style.FIRST_LETTER)[0].upper()

    song_data['sticky_top'] = 0
    song_data['paid'] = 0
    song_data['BVID'] = ''
    song_data['url'] = ''

    song_list.append(song_data)

with open("../public/music_list.json", 'w') as f:
    f.write(json.dumps(song_list))
print('生成歌单完成')
time.sleep(5000)

