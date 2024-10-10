import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/legacy/image";
import { song_list } from "../config/song_list";
import { 
  BsBookmarkPlus, 
  BsBookmarkHeartFill 
} from "react-icons/bs";

import {
  bili2_icon
} from "./SongList.component"

import { 
  HiMiniPlay, 
  HiChevronRight,
  HiChevronLeft
} from "react-icons/hi2";

import {
  get_artwork_url,
  latest_date,
  is_favorite_song,
  toggle_favorite_song,
} from "../config/controllers";

import { motion } from "framer-motion";

const FeaturedSongItem = ({ props: [song, EffThis] }) => {
  const [is_favorite, set_is_favorite] = useState(null);
  useEffect(() => {
    set_is_favorite(is_favorite_song(song.song_name));
  }, [song]);
  const bvid_list = song.BVID.trim().split(/，/g);

  const [show_love, set_show_love] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center mb-3 w-[21rem] sm:w-[30rem]">
      <div className="flex flex-row items-center">
        <div className="shrink-0 rounded-lg w-[2.5rem] h-[2.5rem] object-cover relative">
          <Image src={get_artwork_url(bvid_list)} 
            width={0} height={0} layout="fill" objectFit="cover"
            loader={({src}) => src} sizes="100vw"
            className="rounded-lg" alt="artwork" unoptimized
          />
        </div>
        <div className="flex flex-col pl-3">
          <div className="text-sm text-label flex flex-row space-x-3 max-w-[9rem] sm:max-w-[16rem] truncate text-ellipsis">
            <span>{song.song_name}</span>
          </div>
          <div className="text-xs text-secondary-label flex flex-row space-x-1 max-w-[9rem] sm:max-w-[20rem] truncate text-ellipsis">
            <span>{song.artist}</span>
            <span>&#x2022;</span>
            <span>{latest_date(song.date_list)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start pr-10">
        <span className={`text-label flex flex-row items-center ${get_artwork_url(bvid_list) !== "/favicon.png" ? "inline" : "hidden"}`}>
          <span className="text-accent">{bili2_icon()}</span>
          <HiMiniPlay className="mr-1 ml-3" onClick={
            () => {
              EffThis.play_music_for_name(song.song_name);
            }
          }/>
          <span className="relative inline-flex items-center h-[2rem] w-[2rem] justify-center"
            onClick={(e) => {
                e.stopPropagation();
                toggle_favorite_song(song.song_name, is_favorite, set_is_favorite)
                if (!is_favorite) {
                  set_show_love(true);
                }
              }
            }
          >
            {
              is_favorite ?
              <BsBookmarkHeartFill className="text-oen-red" /> :
              <BsBookmarkPlus className="text-label" />
            }
            {
              show_love 
              ? <motion.div className="absolute h-[2rem] w-[2rem] bg-black rounded-full overflow-hidden top-0 right-0 left-0 bottom-0"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 1, 0], scale: [0, 1, 1, 1, 1] }}
                  onAnimationComplete={() => set_show_love(false)}
                >
                  <Image src="/assets/images/emoticon_love.webp" alt="artwork"
                    width={0} height={0} sizes="100vw" layout="fill" unoptimized
                  />
                </motion.div>
              : null
            }
          </span>
        </span>
        <span className={`flex flex-row ${get_artwork_url(bvid_list) !== "/favicon.png" ? "hidden" : "inline"}`}>
          <span className={`ml-[0.5rem] h-[1.2rem] inline-flex 
            items-center rounded-full
            px-2 py-1 font-medium mr-2
          text-secondary-label ring-1 ring-inset 
          ring-secondary-label text-xs shrink-0
            transition-colors duration-100 hover:ring-white hover:text-white hover:bg-secondary-label`}
            onClick={(e) => {
              e.stopPropagation();
              alert("暂时没有歌切记录；；");
            }}
            >
            <div className="inline">
              无记录
            </div>
          </span>
        </span>
      </div>
    </div>
  );
};

const FeaturedSongList = ({ props: [EffThis] }) => {
  const sorted_list = song_list.sort((a, b) => {
    const a_date = a.date_list
      .split(/，/g)
      .map((a) => Date.parse(a))
      .filter((a) => !isNaN(a))
      .sort();
    const b_date = b.date_list
      .split(/，/g)
      .map((a) => Date.parse(a))
      .filter((a) => !isNaN(a))
      .sort();
    return b_date[b_date.length - 1] - a_date[a_date.length - 1];
  });

  const [scroll_position, set_scroll_position] = useState({
    scrollTop: 0,
    scrollLeft: 0,
  });
  const list_ref = useRef(null);

  const handle_scroll = () => {
    if (list_ref.current) {
      const { scrollTop, scrollLeft } = list_ref.current;
      set_scroll_position({ scrollTop, scrollLeft });
    }
  };

  const chevronClick = (direction) => {
    const step = 300;
    let new_offset = scroll_position.scrollLeft + direction * step;
    let top = scroll_position.scrollTop;
    list_ref.current.scrollTo({
      top: top,
      left: new_offset,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="pl-3 pr-3 mt-3 w-[100vw] sm:max-w-[1100px] relative">
        <div className="inline-block w-[100%] overflow-x-hidden">
          <div className='flex flex-row items-center mb-2'>
            <div className='w-[1.5rem] h-[1.5rem]  relative mr-1 rounded-full overflow-hidden'>
              <Image src={'/assets/images/emoticon_stars_in_your_eyes.webp'}
                width={0} height={0} sizes='100vw' layout='fill'
                unoptimized objectFit='cover' alt='stars'
              />
            </div>
            <span className="text-subtitle text-secondary-label font-semibold">
              最近更新
            </span>
          </div>
          <div className="relative">
            <div className="w-full overflow-x-scroll featured-list no-scrollbar"
              onScroll={handle_scroll}
              ref={list_ref}
            >
              <div className="flex flex-row transition-all duration-300">
                {[0, 3, 6].map((idx) => {
                  return (
                    <div key={idx}>
                      {sorted_list.slice(idx, idx + 3).map((song, i) => {
                        return (
                          <FeaturedSongItem props={[song, EffThis]} key={i} />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="absolute right-[-0.21rem] top-[-0.5rem] h-[100%] flex items-center text-label font-semibold"
              onClick={() => chevronClick(1)}>
              <HiChevronRight className="text-subtitle"/>
            </div>
            <div className="absolute left-[-0.21rem] top-[-0.5rem] h-[100%] flex items-center text-label font-semibold"
              onClick={() => chevronClick(-1)}>
              <HiChevronLeft className="text-subtitle"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedSongList;
