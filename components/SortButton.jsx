import styles from "../styles/Home.module.css";

import { SplitButton, Dropdown } from "react-bootstrap";
import { theme } from "../config/constants";

export default function SortBtn({ props: [
  filter_state,
  sort_options,
  EffThis,
]}) {
  let label = 'default';
  const label_map = {
    'default': '默认排序',
    'not_recently': '最近没唱过？',
    'infrequently': '唱得比较少？',
  };
  return (
    <div className = "d-grid">
      <Dropdown
        title = { label }
        className= { styles.sortButton }
        style = {{ cursor: theme.cursor.pointer }}
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          { label_map[filter_state.sorting_method] }
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {
          sort_options.map(
            (option) => (
              <Dropdown.Item
                onClick = { 
                  () => {
                    EffThis.do_sort(option);
                  }
                }
                
                style = {{
                  cursor: theme.cursor.pointer,
                  backgroundColor: option === filter_state.sorting_method ? 
                    "#87EAFF" : undefined,
                }}

                key = { option }
              >
                { label_map[option] }
              </Dropdown.Item>
            )
          )
        }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
