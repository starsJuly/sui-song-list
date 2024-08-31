import styles from "../styles/Home.module.css";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BsChevronDown } from "react-icons/bs";
import { 
  ChevronDownIcon,
  LanguageIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/20/solid'
import { useState } from "react";
import { theme } from "../config/constants";

export default function MandarinBtn(
  { props: [
    filter_state,
    alphabets,
    EffThis,
  ]}
) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left mr-2 mb-2 shrink-0">
      <div className={`relative inline-flex justify-center gap-x-1.5
         rounded-xl text-sm shadow-sm ring-1 
         ring-inset ring-gray-300 hover:bg-gray-50"
         ${filter_state.lang === "华语" ? "bg-oen-color-1" : "bg-white"}
         ${filter_state.lang === "华语" ? "text-oen-color-9" : "text-gray-900"}
         `}
         onClick={() => {
          setIsOpen(!isOpen);
         }}
      >
        <div className={`relative flex items-center divide-x divide-solid 
          ${filter_state === '华语' ? 'divide-white' : 'divide-gray-300'}`}
        >
          <button type="button" className="inline justify-center gap-x-3
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
          role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
            {
              alphabets.map(
                (alphabet) => (
                  <a 
                    href="#"
                    onClick={() => {
                      EffThis.do_filter_initial(alphabet === filter_state.initial ? '' : alphabet)
                      setIsOpen(false)
                    }}
                    style={{
                      cursor: theme.cursor.pointer,
                    }}
                    className={`block px-4 py-2 text-sm text-gray-700 
                      ${alphabet === filter_state.initial ? 'bg-oen-color-1' : 'bg-white'}
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
        </div>
      )}
  </div>

  );
}
