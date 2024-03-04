let config = {
    Name: "岁己SUI", // 主页名字
  
    BiliLiveRoomID: "25788785", // Bilibili直播间id

    VRMember: "https://vrp.live/member/SUI",

    Footer: "Github",

    Repository: "https://github.com/starsJuly/sui-song-list.git",
  
    Cursor: false, // 使用自定义光标图片
  
    LanguageCategories: ["日语", "英语"], // 语言分类
    RemarkCategories: [], // 标签分类
  
    BannerTitle: "岁己SUI", // banner 标题
  
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
};


module.exports = {
    config
}