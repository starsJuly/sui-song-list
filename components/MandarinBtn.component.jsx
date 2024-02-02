import styles from "../styles/Home.module.css";

import { SplitButton, Dropdown } from "react-bootstrap";
import { getCursor } from "../utils/utils";
import MusicList from "../public/music_list.json";

const activeColor = "#BEA5C1";
let availableAlphabets = [];
MusicList.forEach((x) => {
  if (x.initial.length === 1 && availableAlphabets.indexOf(x.initial) === -1) {
    availableAlphabets.push(x.initial)
  }
})

export default function MandarinBtn({
  languageFilter,
  initialFilter,
  setLanguageState,
  setInitialState,
}) {
  return (
    <div className="d-grid">
      <SplitButton
        title="华语"
        className={
          languageFilter == "华语"
            ? styles.mandarinBtnActive
            : styles.mandarinBtn
        }
        onClick={(e) => {
          languageFilter == "华语"
            ? setLanguageState("")
            : setLanguageState("华语");
        }}
      >
        {availableAlphabets.map((alphabet) => {
          return (
            <Dropdown.Item
              onClick={(e) => {
                initialFilter == alphabet
                  ? setInitialState("")
                  : setInitialState(alphabet);
              }}
              style={
                initialFilter == alphabet
                  ? {
                      backgroundColor: activeColor,
                      cursor: getCursor(),
                    }
                  : { cursor: getCursor() }
              }
              key={alphabet}
            >
              首字母-{alphabet}
            </Dropdown.Item>
          );
        })}
      </SplitButton>
    </div>
  );
}
