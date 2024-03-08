# SUI的歌单网站

岁己SUI的歌单网站。也可用于简单构建其他vup/vtb的个人歌单网站。

> Fork自 [雨纪Ameki的歌单](https://www.ameki.online/)

## Features

```
# sui-song-list
rules:
+ 永久禁用后台数据统计工具的支持
+ 响应式页面

features:
+ 从xlsx歌单文件自动获取歌单信息
  - 通过 converter.js 构建时 (dev, build) 自动更新
  - base
    - 需要手动调用 converter.exe/converter.py 进行更新
      - source: vup-song-list-main

+ 歌单信息
  - 支持 序号，歌曲名，歌名翻译，原唱，语言，备注，次数，歌切 列数据
    - 歌曲名为空的数据行，被视为空行忽略
    - 歌切支持B站BV号，B站合集BV号
      `BV[0-9a-zA-Z]{10}` `BV[0-9a-zA-Z]{10}&p=[0-9]+`
      Reference [https://player.bilibili.com/](https://player.bilibili.com/)
  - base
    - source: vup-song-list-main

+ 基础歌单信息显示
  - 支持单页歌单信息显示
    - 支持显示 序号，歌曲名，原唱，语言， 备注 数据
  - base
    - source: vup-song-list-main

+ 基础歌单信息检索
  - 
    - 支持通过歌曲名检索
    - 支持通过歌曲语言检索
    - 支持通过歌曲名首字拼音检索
  - base
    - source: vup-song-list-main

+ 歌曲音视频播放
  - 
    - Bilibili/video: playable
    - 网易云/audio: linkable
  - base
    - source: vup-song-list-main

+ 点击歌单自动复制选中歌曲名

+ 显示vup信息
  - 
    - vup头像
    - Bilibili链接
    - Bilibili直播房间链接
    - 微博链接
    - VirtuaReal官网介绍链接
    - Twitter链接
  - base
    - source: vup-song-list-main

+ 单图背景
  - base
    - source: vup-song-list-main

```

当前版本用于基础构建并试运行。后续拟添加功能包括但不限于，

+ 基于 *岁己SUI* 个人特色的页面风格
+ 完善歌单信息，显示xlsx歌单文件中的更多内容
+ 添加更多歌单显示和检索功能，如显示上一次演唱时间，显示总演唱频次，列表项隐藏，和快捷操作等
+ 优化页面
+ 完善文档
+ ...

另外，会尽可能同步更新 *岁己SUI* 最新歌单信息。如有歌单方面的遗漏或错误，或者使用时出现BUG，欢迎发issue和pull-request。

感谢每一位贡献者。

## Related Repositories

[song-list-of-nanakaie](https://github.com/alan314m/song-list-of-nanakaie)

[vup-song-list](https://github.com/Akegarasu/vup-song-list)

[vup-song-list-main](https://github.com/Rndlab/vup-song-list-main)

## License

见LICENSE文件

> 本项目源码，当下及未来均遵循MIT开源协议；本项目，当下及未来均不用于任何商业用途。
> 本项目内非源码资源（图片，音乐，图标等）不可商用，如需商业用途，请另获取商用许可。
