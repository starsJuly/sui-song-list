import styles from "../styles/Home.module.css";

import { SplitButton, Dropdown } from "react-bootstrap";
import { getCursor } from "../utils/utils";

export default function MandarinBtn({ props: [
  filter_state,
  do_filter_lang,
  do_filter_initial,
  alphabets,
]}) {
  const lang = '华语';
  const active_color = "#BEA5C1";
  return (
    <div className = "d-grid">
      <SplitButton
        title = {lang}
        className = { lang === filter_state.lang ? styles.mandarinBtnActive : styles.mandarinBtn }
        onClick={ () => do_filter_lang(lang === filter_state.lang ? '' : lang) }
      >
        {
          alphabets.map(
            (alphabet) => (
              <Dropdown.Item
                onClick = { () => do_filter_initial(alphabet === filter_state.initial ? '' : alphabet) }
                
                style = {{
                  backgroundColor: alphabet === filter_state.initial ? active_color : undefined,
                  cursor: getCursor(),
                }}

                key = { alphabet }
              >
                首字母-{ alphabet }
              </Dropdown.Item>
            )
          )
        }
      </SplitButton>
    </div>
  );
}
