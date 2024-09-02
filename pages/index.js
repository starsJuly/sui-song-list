import React, { memo, useCallback, useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Image from "next/legacy/image"

import styles from '../styles/Home.module.css'
import 'react-toastify/dist/ReactToastify.css'

import { Col, Container, Form } from 'react-bootstrap'

import Title from '../components/Title.component'
import SongList from '../components/SongList.component'
import BiliPlayerModal from '../components/BiliPlayerModal.component'
import SongListFilter from '../components/SongListFilter.component'
import MusicPlayerView from '../components/MusicPlayerView.component'
import HeaderView from '../components/HeaderView.component'
import FeaturedSongList from '../components/FeaturedSongList.component'

import imageLoader from '../utils/ImageLoader'

import config, { theme } from '../config/constants'

import { eff_get, eff_set } from '../config/controllers'

import styled, { css } from "styled-components";

import { song_list } from '../config/song_list'

import headerImage from '../public/assets/images/header.png'

const BackgroundView = () => {
  return (
    <div
      className={styles.outerContainer}
      style={{ cursor: theme.cursor.normal }}
    />
  );
};

export default function Home() {
  // EffThis
  const [ EffThis ] = useState({
    set_current_album: (album) => {
      EffThis.current_album = album;
    }
  });

  // state variables
  const [ bili_player_visibility ] = EffThis.modalPlayerShow     = useState(false);

  const [ bili_player_title      ] = EffThis.modalPlayerSongName = useState('');

                                     EffThis.BVID                = useState('');

  const [ bvid_list              ] = EffThis.bvid_list           = useState([]);

  const [ bvid_selected          ] = EffThis.bvid_selected       = useState('');

  const [ currently_playing ] = EffThis.currently_playing = useState(-1);

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
    
    EffThis.play_music_at = (idx) => {
      eff_set(EffThis, 'currently_playing', idx);
    }
    EffThis.play_music_for_name = (name) => { 
      console.error("find name: "+name)
      const idx = EffThis.current_album.findIndex(song => song.song_name === name);
      if (idx !== -1) {
        eff_set(EffThis, 'currently_playing', idx);
      }
    }
  }, [ EffThis ]);

  // state variables
  const [filter_state] = EffThis.filter_state = useState({
    lang: "",
    initial: "",
    paid: false,
    remark: "",
    sorting_method: "not_recently",
    is_local: false,
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

    EffThis.do_filter_local = (is_local) => eff_set(EffThis, 'filter_state', {
      ...eff_get(EffThis, 'filter_state'),
      is_local: is_local
    });

    EffThis.do_set_search = (search) => eff_set(EffThis, 'searchBox', search);

  }, [EffThis]);
  
  const title = `${config.Name}的歌单`;
  return (
    <div>
      <BackgroundView/>
      <Head>
        <title>{title}</title>
        <meta
          name = "keywords"
          content = { `B站,bilibili,哔哩哔哩,vtuber,虚拟主播,电台唱见,歌单,${ config.Name }` }
        />
        <meta name = "description" content = { `${ config.Name }的歌单` }/>
        <link rel = "icon" type = "image/x-icon" href = "/favicon.png"></link>
        <link rel='preload' href='/assets/images/emoticon_love.webp' as='image' />
        <link rel='preload' href='/assets/images/emoticon_stars_in_your_eyes.webp' as='image' />
        <link rel='preload' href='/assets/images/emoticon_bgs1314baobaomuamualovelove.webp' as='image' />
      </Head>

      <div className='z-[100] bg-gradient-to-b 
        from-transparent to-[30rem] w-screen'>
        <div className='absolute right-0 top-0 w-full sm:w-[80%]'>
          <Image src={headerImage}
            className='header-image'
            alt="header" unoptimized layout='responsive' 
            loader={({src}) => src}
          />
        </div>
        <section className = { styles.main }>
          <HeaderView />
          <FeaturedSongList props={[EffThis]}/>
          <SongListFilter props={[filter_state, searchBox, EffThis]} />
          <FilteredList props={[ filter_state, searchBox, EffThis ]} />
          <MusicPlayerView
            props={[currently_playing, EffThis]}
          />
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
            {/* <a>{ config.Footer }</a> */}
          </footer>
        </Link>
        <BiliPlayerModal
          props = {[
            bili_player_title, bili_player_visibility, bvid_list, bvid_selected, EffThis
          ]}
        />
      </div>
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

import { content_contains } from '../utils/search_engine'

/** 过滤器控件 */
const FilteredList = memo(function FilteredList({ props: [ filter_state, searchBox, EffThis ] }) {

  //过滤歌单列表
  const filteredSongList = song_list
    .map((song) => {
      if (typeof window !== 'undefined' && localStorage.getItem(song.song_name) !== null) {
        song.is_local = true;
      } else {
        song.is_local = false;
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
      } else if (filter_state.sorting_method === 'recently') {
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
        let a_time = localStorage.getItem(a.song_name);
        let b_time = localStorage.getItem(b.song_name);
        if (a_time && b_time) {
          return b_time - a_time;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });

  EffThis.set_current_album(filteredSongList);

  return (
    <>
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
        <div className='flex flex-row items-center'>
          <div className='w-[1.5rem] h-[1.5rem] relative mr-1 rounded-full overflow-hidden'>
            <Image src={'/assets/images/emoticon_hengheng.webp'}
              width={0} height={0} sizes='100vw' layout='fill'
              unoptimized objectFit='cover' alt='hengheng'
            />
          </div>
          <span className='text-subtitle text-secondary-label font-semibold'>
            全部歌曲
          </span>
        </div>
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
