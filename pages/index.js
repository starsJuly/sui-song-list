import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import 'react-toastify/dist/ReactToastify.css'

import { Col, Container, Form } from 'react-bootstrap'

import Title from '../components/Title.component'
import SongList from '../components/SongList.component'
import BiliPlayerModal from '../components/BiliPlayerModal.component'
import SongListFilter from '../components/SongListFilter.component'

import imageLoader from '../utils/ImageLoader'
import * as utils from '../utils/utils'

import config from '../config/constants'

import { eff_get, eff_set } from '../config/controllers'

export default function Home() {
  // EffThis
  const [ EffThis ] = useState({});

  // state variables
  const [ bili_player_visibility ] = EffThis.modalPlayerShow     = useState(false);

  const [ bili_player_title      ] = EffThis.modalPlayerSongName = useState('');

                                     EffThis.BVID                = useState('');

  const [ bvid_list              ] = EffThis.bvid_list           = useState([]);

  const [ bvid_selected          ] = EffThis.bvid_selected       = useState('');

  // EffThis.functions
  useEffect(() => {
    EffThis.show_bili_player = ({title, bvid, url}) => {
      if (bvid) {
        eff_set(EffThis, 'modalPlayerShow', true);
        eff_set(EffThis, 'modalPlayerSongName', title);
        eff_set(EffThis,'BVID', bvid);
        const list = bvid.split(/，/g);
        const selected = list[0];
        if (selected && eff_get(EffThis, 'bvid_selected') !== selected) {
          eff_set(EffThis, 'bvid_selected', selected);
          eff_set(EffThis, 'bvid_list', list);
        }
      } else if (url) {  // netease url
        window.open('https://music.163.com/#/dj?id=' + url)
      }
    };
    EffThis.hide_bili_player = () => eff_set(EffThis, 'modalPlayerShow', false);
  }, [ EffThis ]);

  return (
    <div className = { styles.outerContainer }>
      <Head>
        <title>{ config.Name }的歌单</title>
        <meta
          name = "keywords"
          content = { `B站,bilibili,哔哩哔哩,vtuber,虚拟主播,电台唱见,歌单,${ config.Name }` }
        />
        <meta name = "description" content = { `${ config.Name }的歌单` }/>
        <link rel = "icon" type = "image/x-icon" href = "/favicon.png"></link>
        <link rel = 'preload' href = '/assets/images/background_2x_opt.webp' as = 'image'/>
      </Head>

      <CornerIcons />

      <section className = { styles.main }>
        <Title />
        <FilteredList props={[ EffThis, ]} />
      </section>

      <FixedTool />
        
      <Link href = { config.Repository } passHref>
        <footer className = { styles.footer }>
          <Image
            loader = { imageLoader }
            alt = ''
            width = {32}
            height = {32}
            src = 'assets/images/github.png'
          />
          <a>{ config.Footer }</a>
        </footer>
      </Link>

      <BiliPlayerModal
        props = {[ bili_player_title, bili_player_visibility, bvid_list, bvid_selected, EffThis, ]}
      />
    </div>
  );
}

function CornerIcons () {
  return (
    <>
      <Link href = { "https://live.bilibili.com/" + config.BiliLiveRoomID } passHref>
        <a target = "_blank" style = {{ textDecoration: "none", color: "#1D0C26" }}>
          <div className = { styles.goToLiveDiv }>
            <div className = { styles.cornerToggle }>
              <Image
                loader = { imageLoader }
                src = "assets/icon/bilibili_logo_padded.png"
                alt = "去直播间"
                width = {50}
                height = {50}
              />
              <b>
                <i>直 播 间</i>
              </b>
            </div>
          </div>
        </a>
      </Link>
      <div className={styles.offCanvasToggleDiv} onClick={() => window.open(config.VRMember)}>
        <div className={styles.cornerToggle}>
          <Image
            loader={imageLoader}
            src="assets/images/self_intro.png"
            alt="打开自我介绍"
            width={50}
            height={50}
          />
          <b>
            <i>官网介绍</i>
          </b>
        </div>
      </div>
    </>
  );
}

import MusicList from '../public/music_list.json'

/** 过滤器控件 */
function FilteredList({ props: [ EffThis ] }) {
  //状态保存: 类别选择, 搜索框, 回到顶部按钮, 移动端自我介绍, 试听窗口
  const [filter_state, set_filter_state] = EffThis.filter_state = useState({
    lang: "",
    initial: "",
    paid: false,
    remark: "",
  });
  const [searchBox, setSearchBox] = EffThis.searchBox = useState('');

  //过滤歌单列表
  const filteredSongList = MusicList.filter(
    (song) =>
      //搜索
      ( utils.include(song.song_name, searchBox)
        || utils.include(song.language, searchBox)
        || utils.include(song.remarks, searchBox)
        || utils.include(song.artist, searchBox) )
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
  );

  return (
    <>
      <div>
        <Col xs = {12} md = {12}>
          <Form.Control
            className = {styles.filters}
            type = 'search'
            aria-label = '搜索'
            placeholder = '搜索'
            onChange = { (e) => setSearchBox(e.target.value) }
          />
        </Col>
      </div>
      <div>
        <SongListFilter props = {[ filter_state, set_filter_state ]}/>
      </div>
      <SongListWrapper props = {[ filteredSongList, EffThis ]}/>
    </>
  )
}

/** 歌单表格 */
function SongListWrapper ({ props: [ List, EffThis, ] }) {
  return (
    <Container fluid style = {{ minWidth: 'min-content' }}>
     <div className = { styles.songListMarco }>
        <SongList props = {[ List, EffThis ]}/>
     </div>
   </Container>
  );
}

function FixedTool() {
  const [to_top_btn_is_visible, set_to_top_btn_visibility] = useState(false);

  useEffect(() => {
    //检测窗口滚动
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        set_to_top_btn_visibility(true);
      } else {
        set_to_top_btn_visibility(false);
      }
    });
  }, []);
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!to_top_btn_is_visible) return (<div></div>);

  return (
    <button
      onClick = { scrollToTop }
      className = { styles.backToTopBtn }
      title="返回顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
        />
      </svg>
    </button>
  )
}
