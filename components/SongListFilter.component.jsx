import styles from "../styles/Home.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";

import MandarinBtn from "../components/MandarinBtn.component";
import config from "../config/constants";

import global_controllers from "../config/controllers";

import MusicList from "../public/music_list.json";

let availableAlphabets = [];
MusicList.forEach((x) => {
  if (x.initial.length === 1 && availableAlphabets.indexOf(x.initial) === -1) {
    availableAlphabets.push(x.initial)
  }
});

availableAlphabets.sort()  // sorted by default

const isActive = (selected, execpt) => {
  return selected == execpt
    ? styles.customCategoryButtonActive
    : styles.customCategoryButton;
};

const switchState = (setter, selected, execpt) => {
  return selected == execpt ? setter("") : setter(execpt);
};

export default function SongListFilter({ props: [ filter_state, EffThis, ] }) {
  //语言过滤
  const do_filter_lang = (lang) => {
    set_filter_state({ lang: lang, initial: "", paid: false, remark: "" });
  };

  //首字母过滤
  const do_filter_initial = (initial) => {
    set_filter_state({
      lang: "华语",
      initial: initial,
      paid: false,
      remark: "",
    });
  };

  return (
    <Col>
      <div className = { styles.categorySelectionContainer }>
        <Container fluid>
          <Row>
            <Col xs = {6} md = {3}>
              <MandarinBtn props = {[ filter_state, do_filter_lang, do_filter_initial, availableAlphabets ]} />
            </Col> { config.LanguageCategories.map((lang) => (
            <Col xs = {6} md = {3} key = {lang}>
              <LanguageFilterBtn props = {[ filter_state, do_filter_lang, lang ]} />
            </Col> ))}
            <Col xs = {6} md = {3}>
              <RandomFilterBtn />
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
}

function LanguageFilterBtn ({ props: [ filter_state, do_filter_lang, lang ] }) {
  return (
    <div className = "d-grid">
      <Button
        className = { isActive(filter_state.lang, lang) }
        style = {{ cursor: 'url("/assets/cursor/pointer.png"), pointer' }}
        onClick = { (e) => switchState(do_filter_lang, filter_state.lang, lang) }
      >
        {lang}
      </Button>
    </div>
  );
}

function RandomFilterBtn () {
  //随便听听
  const handleRandomSong = () => {
    let random = Math.floor(Math.random() * MusicList.length);
    global_controllers.copy_to_clipboard(MusicList[random].song_name)
  };

  return (
    <div className="d-grid">
      <Button
        title="从下面的歌单里随机挑一首"
        className = { styles.customRandomButton }
        onClick = { handleRandomSong }
      >
        随便听听
      </Button>
    </div>
  );
}
