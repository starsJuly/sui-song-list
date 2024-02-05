# SUI的歌单网站

岁己SUI的歌单网站。也可用于简单构建其他vup/vtb的个人歌单网站。

> Fork自 [雨纪Ameki的歌单](https://www.ameki.online/)

## Features

```
# sui-song-list
rules:
+ 响应式页面

features:
+ 从xlsx歌单文件自动获取歌单信息
  - 通过 converter.js 构建时 (dev, build) 自动更新
    - base
      - 需要手动调用 converter.exe/converter.py 进行更新
        - source: vup-song-list-main

+ 基础歌单信息显示
  - 支持单页歌单信息显示

+ 基础歌单信息检索
  - 支持通过歌曲名检索
  - 支持通过歌曲语言检索
  - 支持通过歌曲名首字拼音检索

+ 歌曲音视频播放
  - Bilibili/video: playable
  - 网易云/audio: linkable

+ 点击歌单自动复制选中歌曲名

+ 显示vup信息
  - vup头像
  - Bilibili链接
  - Bilibili直播房间链接
  - 微博链接
  - VirtuaReal官网介绍链接
  - Twitter链接

+ 单图背景

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

> 本项目仅源码部分，当下及未来均遵循开源协议；本项目，当下及未来均不用于任何商业用途。
