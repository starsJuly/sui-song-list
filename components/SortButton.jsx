import styles from "../styles/Home.module.css";

import { SplitButton, Dropdown } from "react-bootstrap";
import { theme } from "../config/constants";
import { useRef, useState } from "react";
import { 
  ChevronDownIcon, 
  PresentationChartLineIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/20/solid'
import { useClickAway } from "react-use";
import { motion } from "framer-motion";

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
  const ref = useRef(null);
  const dropdownRef = useRef(null);
  
  useClickAway(ref, (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  });

  return (
    <div className="relative inline-block text-left mr-2 mb-2 shrink-0">
      <div className={`relative inline-flex justify-center gap-x-1.5
         rounded-xl text-sm shadow-sm ring-1 
         ring-inset ring-gray-300 
         bg-tertiary-background text-label
         `}
        ref={ref}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="relative flex items-center divide-x divide-solid divide-secondary-label"
        >
          <button type="button" className="inline-flex items-center
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
            className='mr-1 h-6 w-6 inline'
          />
        </div>
      </div>
      {isOpen ? (
        <motion.div
          className='origin-top-right absolute left-0 mt-2 w-32 z-10 
          rounded-md shadow-lg 
          bg-tertiary-background ring-1 ring-black 
          ring-opacity-5 focus:outline-none 
          h-[10rem] overflow-y-auto' 
          role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1"
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0, transform: 'translateY(-15px)' }}
          animate={{ opacity: [0, 1], scale: [0, 1], transform: 'translateY(0px)' }}
          >
          <div className="py-1" role="none">
            {
              sort_options.map(
                (option) => (
                  <a
                    onClick={
                      () => {
                        EffThis.do_sort(option);
                        setIsOpen(false);
                      }
                    }
                    style={{
                      cursor: theme.cursor.pointer,
                    }}
                    className={`block px-4 py-2 text-sm text-label
                      ${option === filter_state.sorting_method ? 'bg-accent-oen/30' : 'bg-tertiary-background'}
                    `} 
                    role="menuitem" tabIndex="-1" id="menu-item-3"
                    key={option}
                  >
                    { label_map[option] }
                  </a>
                )
              )
            }
          </div>
        </motion.div>
      ) : null }
  </div>
  );
}
