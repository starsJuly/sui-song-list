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
      name: '没有想好',
      dynamic: false,
    },
    'lazy': {
      name: '懒倦慵吟守岁诗',
      dynamic: false,
    },
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

export default config
export const theme = generate_theme();
