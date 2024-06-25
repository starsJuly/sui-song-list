import styles from "../styles/Home.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";

import MandarinBtn from "../components/MandarinBtn.component";
import config from "../config/constants";

import global_controllers from "../config/controllers";

import { song_list, available_alphabets } from "../config/song_list";
import SortBtn from "./SortButton";

export default function SongListFilter({ props: [ filter_state, EffThis, ] }) {
  return (
    <Col>
      <div className = { styles.categorySelectionContainer }>
        <Container fluid>
          <Row className = { styles.contentRow }>
            <Col xs = {6} md = {2}>
              <MandarinBtn
                props = {[
                  filter_state, available_alphabets, EffThis, 
                ]} 
              />
            </Col> { config.LanguageCategories.map((lang) => (
            <Col xs = {6} md = {2} key = {lang}>
              <LanguageFilterBtn
                props = {[
                  filter_state.lang === lang, lang, EffThis,
                ]}
              />
            </Col> ))
            /* ... */ }
            <Col xs = {6} md = {2}>
              <SortBtn
                props = {[
                  filter_state, 
                  ['default', 'infrequently', 'not_recently'], 
                  EffThis,
                ]}
              />
            </Col>
            <Col xs = {6} md = {2}>
              <RandomFilterBtn />
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
}

function LanguageFilterBtn ({ props: [ is_active, lang, EffThis, ] }) {
  const button_classnames = is_active
                            ? styles.customCategoryButtonActive
                            : styles.customCategoryButton;

  const cancel_or_filter = is_active ? '' : lang;

  return (
    <div className = "d-grid">
      <Button
        className = { button_classnames }
        style = {{ cursor: 'url("/assets/cursor/pointer.png"), pointer' }}
        onClick = { (e) => EffThis.do_filter_lang(cancel_or_filter) }
      >
        {lang}
      </Button>
    </div>
  );
}

function RandomFilterBtn () {
  //随便听听
  const handleRandomSong = () => {
    let random = Math.floor(Math.random() * song_list.length);
    global_controllers.copy_to_clipboard(song_list[random].song_name)
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
