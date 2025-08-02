const config = {
  Name: "岁己SUI", // 主页名字

  BiliLiveRoomID: "25788785", // Bilibili直播间id

  VRMember: "https://vrp.live/member/SUI",

  Footer: "Github",

  Repository: "https://github.com/starsJuly/sui-song-list.git",

  customCursorEnabled: true, // 使用自定义光标图片
  cursorVersion: "v2",

  LanguageCategories: ["日语", "英语"], // 语言分类
  RemarkCategories: [], // 标签分类

  // 自定义按钮 （可以复制生成更多）
  HomeList: [
    {
      url: "https://live.bilibili.com/25788785",
      name: "直播间",
      icon: "/assets/icon/bilibili_logo_padded.png",
      background: "bg-bilibili-bg",
      textcolor: "text-bilibili-fg",
      shadowcolor: "shadow-bilibili-fg"
    },
    {
      url: "https://pome.vip/Gz75k7hF",
      name: "提问箱",
      icon: "/assets/icon/pome.png",
      background: "bg-pome-bg",
      textcolor: "text-pome-fg",
      shadowcolor: "shadow-pome-fg"
    },
    {
      url: "https://weibo.com/u/7785772638",
      name: "微博",
      icon: "/assets/icon/weibo.png",
      background: "bg-weibo-bg",
      textcolor: "text-weibo-fg",
      shadowcolor: "shadow-weibo-fg"
    },
    {
      url: "https://vrp.live/member/SUI",
      name: "官网介绍",
      icon: "/assets/images/self_intro.png",
      background: "bg-vr-bg",
      textcolor: "text-vr-fg",
      shadowcolor: "shadow-vr-fg"
    },
  ],

  theme: {
    'light':  {
      name: '爱之类的话语',
      dynamic: false,
    },
    'dark': {
      name: '魔偶马戏团',
      dynamic: false,
    },
    'flower': {
      name: '花做成的海',
      dynamic: false,
    },
    'marvelous': {
      name: '奇妙夜',
      dynamic: false,
    },
    'brisk': {
      name: '白云红叶两悠悠',
      dynamic: true,
    },
    'idol': {
      name: '娉婷似不任罗绮',
      dynamic: false,
    },
    'lazy': {
      name: '懒倦慵吟守岁诗',
      dynamic: false,
    },
    'shining': {
      name: 'Effulgence',
      dynamic: false,
    },
    'neon': {
      name: 'Neon',
      dynamic: false,
    }
  }
}

const generate_theme = () => {
  let theme = {};

  // theme.cursor

  const cursor_types = [ 'normal', 'pointer', 'text' ];
  let custom_cursor_dirpath = '/assets/cursor';
  const custom_cursor_suffix = '.png';

  theme.cursor = {};

  if (config.cursorVersion === "v2") {
    custom_cursor_dirpath = '/assets/cursor/v2';
  }

  for (const type of cursor_types) {
      theme.cursor[type] =  config.customCursorEnabled
                            ? `url("${custom_cursor_dirpath + '/' + type + custom_cursor_suffix}"), pointer`
                            : `${type}`
  }

  return theme;
};

import { content_contains } from '../utils/search_engine'
import { is_favorite_song, favorite_date } from '../config/controllers';

export const filterSong = (songlist, searchBox, filter_state) => {
  return songlist
    .map((song) => {
      if (typeof window !== 'undefined' && is_favorite_song(song.song_name)) {
        song.is_local = true;
      } else {
        song.is_local = false;
      }
      if (searchBox === "bgs1314baobaomuamualovelove" && song.song_name === "One more time, One more chance") {
        song.BVID = "BV1eVnueEEoc";
        song.date_list = "2024-4-23";
        song.song_count = 1;
      }
      return song;
    })
  .filter(
    (song) =>
      //搜索
      content_contains([
        song.language,
        song.song_name,
        song.song_translated_name,
        song.artist,
        song.remark,
      ], searchBox === "bgs1314baobaomuamualovelove" ? "One more time, One more chance" : searchBox)
      //语言
      && (filter_state.lang != ""
        ? song.language?.includes(filter_state.lang)
        : true)
      //首字母
      && (filter_state.initial != ""
        ? song.initial?.includes(filter_state.initial)
        : true)
      //类型
      && (filter_state.remark != ""
        ? song.remarks?.toLowerCase().includes(filter_state.remark)
        : true)
      //付费
      && (filter_state.paid
        ? song.paid == 1
        : true)
      && (filter_state.is_local
        ? song.is_local
        : true))
  .sort((a, b) => {
    if (filter_state.sorting_method === 'not_recently') {
      const a_date = a.date_list.split(/，/g)
        .map(a => Date.parse(a)).filter(a => !isNaN(a))
        .sort();
      const b_date = b.date_list.split(/，/g)
        .map(a => Date.parse(a)).filter(a => !isNaN(a))
        .sort();
      return a_date[a_date.length - 1] - b_date[b_date.length - 1];
    } else if (filter_state.sorting_method === 'infrequently') {
      return a.song_count - b.song_count;
    } else if (filter_state.sorting_method === 'recently' || filter_state.sorting_method === 'default') {
      const a_date = a.date_list.split(/，/g)
        .map(a => Date.parse(a)).filter(a => !isNaN(a))
        .sort();
      const b_date = b.date_list.split(/，/g)
        .map(a => Date.parse(a)).filter(a => !isNaN(a))
        .sort();
      return b_date[b_date.length - 1] - a_date[a_date.length - 1];
    } else if (filter_state.sorting_method === 'frequently') {
      return b.song_count - a.song_count;
    } else if (filter_state.is_local) {
      let a_time = favorite_date(a.song_name);
      let b_time = favorite_date(b.song_name);
      if (a_time && b_time) {
        return b_time - a_time;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  })
  .map((song, idx) => {
    song.idx = idx;
    return song;
  });
}

export default config
export const theme = generate_theme();
