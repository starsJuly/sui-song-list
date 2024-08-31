import styles from "../styles/Home.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";

import MandarinBtn from "../components/MandarinBtn.component";
import config, { theme } from "../config/constants";

import global_controllers from "../config/controllers";

import { 
  song_list, 
  available_alphabets
} from "../config/song_list";
import { Form } from "react-bootstrap";
import SortBtn from "./SortButton";

import {
  GlobeAsiaAustraliaIcon,
  AdjustmentsHorizontalIcon,
  HeartIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid'

import {
  BsDice6
} from "react-icons/bs";

export default function SongListFilter({ props: [ filter_state, searchBox, EffThis, ] }) {
  return (
    <div className="block">
      <div className="w-full left-0 pr-3">
        <div className="pl-3 
          inline-flex text-subtitle 
          font-semibold items-center sm:hidden text-secondary-label mb-2"
        >
          <AdjustmentsHorizontalIcon className="inline h-6 w-6 mr-1" />
          <span>筛选</span>
        </div>
        <div className="inline-flex items-center w-full flex-wrap sm:!flex-nowrap pl-3">
          <div className="relative rounded-xl shadow-sm 
            justify-center mr-2 mb-2 grow hidden sm:inline-block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">
                <MagnifyingGlassIcon className="inline h-5 w-5 ml-0" />
              </span>
            </div>
            <input type="text" className="block w-full rounded-xl border-0 
              py-1.5 pl-10 pr-20 text-gray-900 ring-1 focus:outline-palette-7
              ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-0 focus:ring-inset focus:ring-oen-color-1
              sm:text-sm sm:leading-6" placeholder="搜索"
              onChange={(e) => EffThis.do_set_search(e.target.value)}
            />
          </div>
          <MandarinBtn
            props={[
              filter_state, available_alphabets, EffThis,
            ]}
          />
          {
            config.LanguageCategories.map((lang, idx) => (
              <LanguageFilterBtn
                key={idx}
                props={[
                  filter_state.lang === lang, lang, EffThis,
                ]}
              />
            ))
          }
          <SortBtn
            props={[
              filter_state,
              ['default', 'infrequently', 'not_recently', 'recently', 'frequently'],
              EffThis,
            ]}
          />
          <LocalSongListBtn
            props={[
              filter_state.is_local,
              EffThis,
            ]}
          />
          <RandomFilterBtn />
        </div>
        <div className="relative pl-3">
          <div className="relative rounded-xl shadow-sm 
            justify-center mr-2 mb-2 w-full inline-block sm:hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">
                <MagnifyingGlassIcon className="inline h-5 w-5 ml-0" />
              </span>
            </div>
            <input type="text" className="block w-full rounded-xl border-0 
            py-1.5 pl-10 pr-20 text-gray-900
            ring-inset placeholder:text-gray-400 focus:outline-palette-7
            focus:ring-0 focus:ring-inset focus:ring-oen-color-1
            sm:text-sm sm:leading-6 text-sm" placeholder="搜索"
              onChange={(e) => EffThis.do_set_search(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const LocalSongListBtn = ({ props: [ is_active, EffThis, ] }) => {
  return (
    <div className={`relative inline-flex justify-center gap-x-1.5
      rounded-xl text-sm shadow-sm ring-1 transition-all
      ring-inset ring-gray-300 shrink-0
      ${is_active ? 'bg-oen-color-1' : 'bg-white'}
      ${is_active ? 'text-oen-color-9' : 'text-gray-900'}
      mr-2 mb-2
      `}
    >
      <button type="button" className="justify-center
          p-2 py-2 text-sm pr-4 inline-flex items-center"
        id="menu-button" aria-expanded="true" aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          EffThis.do_filter_local(!is_active);
        }}
      >
        <HeartIcon className="inline h-4 w-4 mr-1" />
        <span>收藏夹</span>
      </button>
    </div>
  );
}

function LanguageFilterBtn ({ props: [ is_active, lang, EffThis, ] }) {
  const cancel_or_filter = is_active ? '' : lang;
  return (
    <div className={`relative inline-flex justify-center gap-x-1.5
         rounded-xl text-sm shadow-sm ring-1 mr-2 mb-2
         ring-inset ring-gray-300 shrink-0
         ${is_active ? 'bg-oen-color-1' : 'bg-white'}
         ${is_active ? 'text-oen-color-9' : 'text-gray-900'}
         `}
    >
      <button type="button" className="justify-center
          p-2 py-2 text-sm pr-4 inline-flex items-center"
        id="menu-button" aria-expanded="true" aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          EffThis.do_filter_lang(cancel_or_filter);
        }}
      >
        <GlobeAsiaAustraliaIcon className="inline h-4 w-4 mr-1" />
        <span>{lang}</span>
      </button>
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
    <div className="relative inline-flex justify-center gap-x-1.5
         rounded-xl text-sm shadow-sm ring-1 items-center
         ring-inset ring-gray-300 bg-white mr-2 mb-2
         shrink-0"
    >
      <button type="button" className="justify-center
          p-2 py-2 text-sm pr-4 inline-flex items-center"
        id="menu-button" aria-expanded="true" aria-haspopup="true"
        title="从下面的歌单里随机挑一首"
        style = {{ cursor: theme.cursor.pointer }}
        onClick = { handleRandomSong }
      >
        <BsDice6 className="inline h-4 w-4 mr-1" />
        <span>随便听听</span>
      </button>
    </div>
  );
}
