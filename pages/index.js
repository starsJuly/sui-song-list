import React, { memo, useEffect, useState } from 'react'

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

import config, { theme } from '../config/constants'

import { eff_get, eff_set } from '../config/controllers'

import styled, { css } from "styled-components";

const calcOffset = (y) => {
  return y * 100 / document.documentElement.scrollHeight;
}

const BackdropContainer = styled.div.attrs(props => ({
  style: {
    backgroundPosition: `0% ${props.offset}%`,
  }
}))``;

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

  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setOffset(calcOffset(window.scrollY));
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <BackdropContainer 
      className={ styles.outerContainer } 
      style={{ cursor: theme.cursor.normal }}
      offset={ offset }
    >
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
        <FilteredList props={[ EffThis ]} />
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
        props = {[
          bili_player_title, bili_player_visibility, bvid_list, bvid_selected, EffThis
        ]}
      />
    </BackdropContainer>
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

import { song_list } from '../config/song_list'
import { content_contains } from '../utils/search_engine'

/** 过滤器控件 */
const FilteredList = memo(function FilteredList({ props: [ EffThis ] }) {
  // state variables
  const [filter_state] = EffThis.filter_state = useState({
    lang: "",
    initial: "",
    paid: false,
    remark: "",
    sorting_method: "not_recently",
  });
  
  const [searchBox, setSearchBox] = EffThis.searchBox = useState('');

  // EffThis.functions
  useEffect(() => {
    //语言过滤
    EffThis.do_filter_lang = (lang) => eff_set(EffThis, 'filter_state', {
      ...eff_get(EffThis, 'filter_state'),
      lang: lang,
      initial: "",
      paid: false,
      remark: ""
    });

    //首字母过滤
    EffThis.do_filter_initial = (initial) => eff_set(EffThis, 'filter_state', {
      ...eff_get(EffThis, 'filter_state'),
      lang: "华语",
      initial: initial,
      paid: false,
      remark: "",
    });

    EffThis.do_sort = (method) => eff_set(EffThis, 'filter_state', {
      ...eff_get(EffThis, 'filter_state'),
      sorting_method: method
    });

  }, [ EffThis ]);

  //过滤歌单列表
  const filteredSongList = song_list.filter(
    (song) =>
      //搜索
      content_contains([
        song.language,
        song.song_name,
        song.song_translated_name,
        song.artist,
        song.remark,
      ], searchBox)
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
  ).sort((a, b) => {
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
    } else {
      return 0;
    }
  });

  return (
    <>
      <div>
        <Col xs = {12} md = {12}>
          <Form.Control
            className = {styles.filters}
            style = {{ cursor: theme.cursor.text }}
            type = 'search'
            aria-label = '搜索'
            placeholder = '搜索'
            onChange = { (e) => setSearchBox(e.target.value) }
          />
        </Col>
      </div>
      <div>
        <SongListFilter props = {[ filter_state, EffThis ]}/>
      </div>
      <SongListWrapper props = {[ filteredSongList, EffThis ]}/>
    </>
  )
}, (prev, next) => {
  console.log(JSON.stringify(prev));
  if (Object.is(prev, next)) return true;
  console.log('objects not equal');
  
  const prev_keys = Object.keys(prev);
  const next_keys = Object.keys(next);
  
  if (prev_keys.length !== next_keys.length) return false;

  const skips = { props: 1 };

  // props
  if (Array.isArray(prev.props) && Array.isArray(next.props)) {
    if (prev.props.length !== next.props.length) return false;
    for (const [idx, prop] of Object.entries(prev.props)) {
      if (!Object.is(prop, prev.props[idx])) {
        console.log('not equal when iterating!!!');
      }
      if (!Object.is(prop, next.props[idx])) return false;
    }
  }

  let flags = {};

  for (const key of prev_keys) {
    if (skips[key]) continue;
    if (!Object.is(prev[key], next[key])) return false;
    flags[key] = 1;
  }

  for(const key of next_keys) {
    if (skips[key] || flags[key]) continue;
    if (!Object.is(next[key], prev[key])) return false;
  }

  console.log('result: equal');
  return true;
});

/** 歌单表格 */
function SongListWrapper ({ props: [ List, EffThis ] }) {
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
