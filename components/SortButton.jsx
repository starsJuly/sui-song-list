import styles from "../styles/Home.module.css";

import { SplitButton, Dropdown } from "react-bootstrap";
import { theme } from "../config/constants";
import { useState } from "react";
import { 
  ChevronDownIcon, 
  PresentationChartLineIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/20/solid'

export default function SortBtn({ props: [
  filter_state,
  sort_options,
  EffThis,
]}) {
  let label = 'default';
  const label_map = {
    'default': '默认歌曲排序',
    'not_recently': '最近没唱过？',
    'infrequently': '唱得比较少？',
    'recently': '最近有唱过？',
    'frequently': '唱得比较多？',
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div class="relative inline-block text-left mr-2 mb-2 shrink-0">
      <div className={`relative inline-flex justify-center gap-x-1.5
         rounded-xl text-sm shadow-sm ring-1 
         ring-inset ring-gray-300 hover:bg-gray-50
         bg-white text-gray-900
         `}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="relative flex items-center divide-x divide-solid divide-gray-300"
        >
          <button type="button" class="inline justify-center gap-x-3
            px-2 py-2 text-sm pr-4"
            id="menu-button" aria-expanded="true" aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <PresentationChartLineIcon className="inline h-4 w-4 mr-1" />
            {label_map[filter_state.sorting_method]}
          </button>
          <ChevronDownIcon aria-hidden="true"
            className={`mr-1 h-6 w-6 inline
            ${filter_state.lang === '华语' ? "text-oen-color-9" : "text-gray-400"}
            `}
          />
        </div>
      </div>
      {(isOpen) && (
        <div
          className={`origin-top-right absolute left-0 mt-2 w-32 z-10 
          rounded-md shadow-lg 
          bg-white ring-1 ring-black 
          ring-opacity-5 focus:outline-none 
          ease-out duration-100 h-[10rem] overflow-y-auto transition-all
          transform ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} 
          role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            {
              sort_options.map(
                (option) => (
                  <a
                    href="#"
                    onClick={
                      () => {
                        EffThis.do_sort(option);
                        setIsOpen(false);
                      }
                    }
                    style={{
                      cursor: theme.cursor.pointer,
                    }}
                    className={`block px-4 py-2 text-sm text-gray-700 
                      ${option === filter_state.sorting_method ? 'bg-oen-color-1' : 'bg-white'}
                    `} 
                    role="menuitem" tabindex="-1" id="menu-item-3"
                    key={option}
                  >
                    { label_map[option] }
                  </a>
                )
              )
            }
          </div>
        </div>
      )}
  </div>
  );
}
