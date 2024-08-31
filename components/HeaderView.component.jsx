import React, { useState, useRef, useEffect } from 'react';
import Image from "next/legacy/image";
import config from '../config/constants';
import { song_list } from "../config/song_list";

import {
  HiHeart
} from "react-icons/hi";

const HomeList = () => {
  return(
    <>
      <div className='flex items-center
        flex-nowrap w-full overflow-x-auto
        no-scrollbar overflow-y-visible'
      >
        {
          config.HomeList.map((c, idx) => {
            return (
              <div 
                className={`
                  ${c.textcolor} ${c.background} ${c.shadowcolor}
                  flex items-center rounded-full shrink-0 
                  ${idx == 0 ? "ml-[1rem]" : "ml-2"}
                  ${idx == config.HomeList.length-1 ? "mr-[1rem]" : "mr-0"}
                  px-[0.7em] py-[0.3em] relative space-x-2
                  sm:hover:shadow-2xl sm:hover:scale-110 transition-all duration-300
                `}
                onClick={() => window.open(c.url)}
                key={idx}
              >
                <Image 
                  src={c.icon}
                  alt={c.name}
                  width={16}
                  height={16}
                  loader={({src}) => src}
                  unoptimized
                />
                <span className='text-sm'>
                  {c.name}
                </span>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

const StyledI = ({handle_click}) => {
  const [text, set_text] = useState('点点试试呢');
  const [clicks, set_clicks] = useState(1);
  useEffect(() => {
    if (clicks > 5) {
      set_text("bgs1314baobaomuamualovelove");
    } else if (clicks > 2) {
      set_text("再多试几次");
    }
  })
  return (
    <div className="absolute bottom-0 right-0 text-base sm:text-title flex flex-col items-center text-label group/heart pointer-events-none">
      <div className='font-normal text-base absolute right-0 bottom-[3rem] shrink-0 w-[5.5rem] hidden sm:group-hover/heart:inline text-right'>
        {text}
      </div>
      <HiHeart className="font-semibold text-palette-2 text-[0.35rem] sm:text-base absolute bottom-[1.1rem] sm:bottom-[2.3rem] pointer-events-auto" 
        onClick={() => {
          handle_click();
          set_clicks(clicks+1);
        }}
        />
      <span className="font-semibold">I</span>
    </div>
  );
}

const HeaderView = () => {
  const [clicks, set_clicks] = useState(1);
  const [avatar_url, set_avatar_url] = useState('/assets/images/banner_image.webp');
  useEffect(() => {
    if (clicks > 5) {
      set_avatar_url("/assets/images/emoticon_bgs1314baobaomuamualovelove.webp");
    }
  }, [clicks]);
  return(
    <>
      <div>
        <div className='pt-[15rem] sm:pt-[25rem]'>
        <div className='flex items-center'>
          <div className="mr-2 ml-[1rem] hidden relative sm:w-[9rem] sm:h-[9rem] sm:block">
            <Image src={avatar_url} 
              alt="liver-avatar"
              loader={({src}) => src}
              layout='fill' objectFit='contain'
              unoptimized
              className='rounded-full'
            />
          </div>
          <div className='flex flex-col items-start'>
            <div className='flex items-center mb-3 ml-[1rem]'>
              <div className="mr-2 w-[3.5rem] h-[3.5rem] relative sm:hidden">
                <Image src={avatar_url}
                  alt="liver-avatar"
                  loader={({ src }) => src}
                  layout='fill' objectFit='contain'
                  unoptimized
                  className='rounded-full'
                />
              </div>
              <div className='text-base text-label flex-col relative' >
                <span className='font-bold block sm:text-title w-fit relative'> 
                  <span>{config.Name}</span>
                  <StyledI className='absolute top-0 right-0' handle_click={
                    () => {
                      set_clicks(clicks+1);
                    }
                  }/>
                </span>
                <span className='sm:text-subtitle'> 已收录的歌曲 {song_list.length} 首 </span>
              </div>
            </div>
            <HomeList />
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default HeaderView;
