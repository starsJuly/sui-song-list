import styles from "../styles/Home.module.css";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BsChevronDown } from "react-icons/bs";
import { 
  ChevronDownIcon,
  LanguageIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/20/solid'
import { useRef, useState } from "react";
import { theme } from "../config/constants";
import { useClickAway } from "react-use";
import { motion } from "framer-motion";

export default function MandarinBtn(
  { props: [
    filter_state,
    alphabets,
    EffThis,
  ]}
) {

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const dropdownRef = useRef(null);
  
  useClickAway(ref, (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  })

  return (
    <div className="relative inline-block text-left mr-2 mb-2 shrink-0">
      <div className={`relative inline-flex justify-center gap-x-1.5
         rounded-xl text-sm hover:bg-gray-50"
         ${filter_state.lang === "华语" ? "bg-accent-bg" : "bg-tertiary-background"}
         ${filter_state.lang === "华语" ? "text-accent-fg shadow-none ring-1 ring-accent-fg" : "text-label"}
         `}
         ref={ref}
         onClick={() => {
          setIsOpen(!isOpen);
         }}
      >
        <div className={`relative flex items-center divide-x divide-solid 
          ${filter_state.lang === '华语' ? 'divide-accent-fg' : 'divide-secondary-label'}`}
        >
          <button type="button" className="inline-flex items-center
            px-2 py-2 text-sm pr-4" 
            id="menu-button" aria-expanded="true" aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation();
              EffThis.do_filter_lang(filter_state.lang === '华语' ? '' : '华语')
            }}
          >
            {
              filter_state.lang === '华语' ? 
              <span className="mr-1"> { filter_state.initial !== '' ? filter_state.initial : '文' } </span> : 
              <GlobeAsiaAustraliaIcon className="inline h-4 w-4 mr-1" />
            }
            华语
          </button>
          <ChevronDownIcon aria-hidden="true" 
            className={`mr-1 h-6 w-6 inline
            ${filter_state.lang === '华语' ? "text-accent-fg" : "text-label"}
            `} 
          />
        </div>
      </div>
      {(isOpen) && (
        <motion.div
          className='origin-top-right absolute left-0 mt-2 w-32 z-10 
          rounded-md shadow-lg text-label
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
              alphabets.map(
                (alphabet) => (
                  <a 
                    onClick={() => {
                      EffThis.do_filter_initial(alphabet === filter_state.initial ? '' : alphabet)
                      setIsOpen(false)
                    }}
                    style={{
                      cursor: theme.cursor.pointer,
                    }}
                    className={`block px-4 py-2 text-sm text-label
                      ${alphabet === filter_state.initial ? 'bg-accent-oen/30' : 'bg-tertiary-background'}
                    `} 
                    role="menuitem" tabIndex="-1" id="menu-item-3"
                    key={ alphabet }
                  >
                    首字母-{ alphabet }
                  </a>
                )
              )
            }
          </div>
        </motion.div>
      )}
  </div>

  );
}
