const config = {
  Name: "岁己SUI", // 主页名字

  BiliLiveRoomID: "25788785", // Bilibili直播间id

  VRMember: "https://vrp.live/member/SUI",

  Footer: "Github",

  Repository: "https://github.com/starsJuly/sui-song-list.git",

  customCursorEnabled: true, // 使用自定义光标图片

  LanguageCategories: ["日语", "英语"], // 语言分类
  RemarkCategories: [], // 标签分类

  // 自定义按钮 （可以复制生成更多）
  HomeList: [
    {
      url: "https://pome.vip/Gz75k7hF",
      name: "提问箱",
      icon: "/assets/icon/pome.png",
    },
    {
      url: "https://weibo.com/u/7785772638",
      name: "微博",
      icon: "/assets/icon/weibo.png",
    },
  ],
}

const generate_theme = () => {
  let theme = {};

  const cursor_types = [ 'normal', 'pointer', 'text' ];
  const custom_cursor_dirpath = './assets/cursor/';
  const custom_cursor_suffix = '.png';
  theme.cursor = {};
  for (const type of cursor_types) {
      theme.cursor[type] =  config.customCursorEnabled
                            ? `url("${custom_cursor_dirpath + type + custom_cursor_suffix}"), ${type}`
                            : `${type}`
  }

  return theme;
};

export default config
export const theme = generate_theme();
