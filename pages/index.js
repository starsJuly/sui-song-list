import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import 'react-toastify/dist/ReactToastify.css'

import { Button, Col, Container, Form, Offcanvas, Row, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import copy from 'copy-to-clipboard'

import MusicList from '../public/music_list.json'

import Banner from '../components/banner/Banner.component'
import BannerMobile from '../components/banner/BannerMobile.component'
import SongDetail from '../components/SongDetail.component'
import BiliPlayerModal from '../components/BiliPlayerModal.component'
import SongListFilter from '../components/SongListFilter.component'

import imageLoader from '../utils/ImageLoader'
import * as utils from '../utils/utils'
import { config } from '../config/constants'

export default function Home() {
  //状态保存: 类别选择, 搜索框, 回到顶部按钮, 移动端自我介绍, 试听窗口
  const [categorySelection, setCategorySelection] = useState({
    lang: "",
    initial: "",
    paid: false,
    remark: "",
  });
  const [searchBox, setSearchBox] = useState("");
  const [showToTopButton, setToTopShowButton] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [modalPlayerShow, setPlayerModalShow] = useState(false);
  const [modalPlayerSongName, setPlayerModalSongName] = useState("");
  const [BVID, setBVID] = useState("");

  const bvid_list_selector = (([list, set_list], [selected, set_selected]) => {
    return {
      list,
      set_list,
      selected,
      set_selected: (text) => (text && selected !== text) && set_selected(text)
    }
  }) (useState([]), useState(''));

  useEffect(() => {
    //检测窗口滚动
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 600) {
        setToTopShowButton(true);
      } else {
        setToTopShowButton(false);
      }
    });
  }, []);

  //根据首字母和搜索框进行过滤
  const filteredSongList = MusicList.filter(
    (song) =>
      //搜索框搜歌名
      (utils.include(song.song_name, searchBox) || utils.include(song.language, searchBox) ||
        utils.include(song.remarks, searchBox) || utils.include(song.artist, searchBox)) &&
      //语言过滤按钮
      (categorySelection.lang != ""
        ? song.language?.includes(categorySelection.lang)
        : true) &&
      //首字母过滤按钮
      (categorySelection.initial != ""
        ? song.initial?.includes(categorySelection.initial)
        : true) &&
      //类型过滤按钮
      (categorySelection.remark != ""
        ? song.remarks?.toLowerCase().includes(categorySelection.remark)
        : true) &&
      //付费过滤按钮
      (categorySelection.paid ? song.paid == 1 : true)
  );

  //处理用户复制行为
  const copy_show_text_max_count = 100;
  const handleClickToCopy = text => {
    if (typeof text !== 'string' || !text.length) return;
    copy(`${text}`);
    toast.success( `${ (text.length < copy_show_text_max_count)
                        ?text
                        :text.substring(0, copy_show_text_max_count) + '...'
                    } 成功复制到剪贴板!` );
  };

  //改变语言过滤状态
  const setLanguageState = (lang) => {
    setCategorySelection({ lang: lang, initial: "", paid: false, remark: "" });
  };

  //改变首字母过滤状态
  const setInitialState = (initial) => {
    setCategorySelection({
      lang: "华语",
      initial: initial,
      paid: false,
      remark: "",
    });
  };

  //改变备注过滤状态
  const setRemarkState = (remark) => {
    setCategorySelection({
      lang: "",
      initial: "",
      paid: false,
      remark: remark,
    });
  };

  //改变收费过滤状态
  const setPaidState = (paid) => {
    setCategorySelection({ lang: "", initial: "", paid: paid, remark: "" });
  };

  //随便听听
  const handleRandomSong = () => {
    let random = Math.floor(Math.random() * MusicList.length);
    handleClickToCopy(MusicList[random].song_name)
  };

  //移动端自我介绍off canvas开关
  const handleCloseIntro = () => setShowIntro(false)
  // const handleShowIntro = () => setShowIntro(true);
  const handleShowIntro = () => window.open(config.VRMember)

  //滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showBiliPlayer = ({title, bvid, url}) => {
    if (BVID !== bvid) {
      setBVID(bvid);
      const list = bvid.split(/，/g);
      bvid_list_selector.set_list(list);
      bvid_list_selector.set_selected(list[0]);
      setPlayerModalShow(true);
      setPlayerModalSongName(title);
    } else if (url) {
      window.open('https://music.163.com/#/dj?id=' + url)
    }
  }

  return (
    <div className={styles.outerContainer}>
      <Link href={"https://live.bilibili.com/" + config.BiliLiveRoomID} passHref>
        <a target="_blank" style={{ textDecoration: "none", color: "#1D0C26" }}>
          <div className={styles.goToLiveDiv}>
            <div className={styles.cornerToggle}>
              <Image
                loader={imageLoader}
                src="assets/icon/bilibili_logo_padded.png"
                alt="去直播间"
                width={50}
                height={50}
              />
              <b>
                <i>直 播 间</i>
              </b>
            </div>
          </div>
        </a>
      </Link>
      <div className={styles.offCanvasToggleDiv} onClick={handleShowIntro}>
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
      <Head>
        <title>{config.Name}的歌单</title>
        <meta name="keywords" content="B站,bilibili,哔哩哔哩,电台唱见,歌单" />
        <meta name="description" content={`${config.Name}的歌单`} />
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>

        <section className={styles.main}>
          {/** 头像和标题 */}
          <div>
          <Banner
              songCount={MusicList.length}
            />
          </div>

          {/** 过滤器控件 */}
          <div>
          <Col xs={12} md={12}>
              <Form.Control
                className={styles.filters}
                type="search"
                aria-label="搜索"
                placeholder="搜索"
                onChange={(e) => setSearchBox(e.target.value)}
              />
            </Col>
            
          </div>
          <div>
          <SongListFilter
              categorySelection={categorySelection}
              setLanguageState={setLanguageState}
              setRemarkState={setRemarkState}
              setPaidState={setPaidState}
              setInitialState={setInitialState}
              handleRandomSong={handleRandomSong}
            />
          </div>

          {/** 歌单表格 */}
          <Container fluid style={{minWidth: 'min-content'}}>
            <div className={styles.songListMarco}>
              <SongDetail
                        filteredSongList={filteredSongList}
                        handleClickToCopy={handleClickToCopy}
                        showBiliPlayer={showBiliPlayer}
                      />
            </div>
          </Container>
        </section>
        {showToTopButton ? (
          <button
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            title="返回顶部"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </button>
        ) : (
          <div></div>
        )}
        <Link href={ config.Repository } passHref>
          <footer className={styles.footer}>
            <Image loader={imageLoader} alt='' width={32} height={32} src='assets/images/github.png' />
            <a>{config.Footer}</a>
          </footer>
        </Link>

      <Offcanvas show={showIntro} onHide={handleCloseIntro}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{config.Name}的自我介绍</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <BannerMobile />
        </Offcanvas.Body>
      </Offcanvas>

      <BiliPlayerModal // BVIDList, SelectedBVID, OnSelectedChanged
        props = {[  modalPlayerSongName,
                    {
                      visible: modalPlayerShow,
                      on_hide: () => setPlayerModalShow(false)
                    },
                    bvid_list_selector,
                ]}
      />
    </div>
  );
}
