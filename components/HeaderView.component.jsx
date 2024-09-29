import React, { useState, useRef, useEffect } from 'react';
import Image from "next/legacy/image";
import config from '../config/constants';
import { song_list } from "../config/song_list";

import {
  HiHeart
} from "react-icons/hi";

import question_mark from '../public/assets/images/question_mark.gif';
import bgs1314baobaomuamualovelove from '../public/assets/images/bgs1314baobaomuamualovelove.gif';

const HomeList = () => {
  return(
    <>
      <div className='flex items-center
        flex-nowrap w-full overflow-x-auto
        no-scrollbar overflow-y-visible py-1'
      >
        {
          config.HomeList.map((c, idx) => {
            return (
              <div
                className={`
                  ${c.textcolor} ${c.background} ${c.shadowcolor}
                  flex items-center rounded-full shrink-0 
                  ${idx == 0 ? "ml-[1rem]" : "ml-2"}
                  ${idx == config.HomeList.length - 1 ? "mr-[1rem]" : "mr-0"}
                  px-[0.7em] py-[0.3em] relative space-x-2
                  sm:hover:scale-110 transition-all duration-300
                `}
                onClick={() => window.open(c.url)}
                key={idx}
              >
                <Image
                  src={c.icon}
                  alt={c.name}
                  width={16}
                  height={16}
                  loader={({ src }) => src}
                  unoptimized
                />
                <span className="text-sm">{c.name}</span>
              </div>
            );
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
  }, [clicks]);
  return (
    <div className="absolute bottom-0 right-0 text-base sm:text-title flex flex-col items-center text-label group/heart pointer-events-none">
      <div className='font-normal text-base absolute 
        right-0 -top-[3rem] shrink-0 text-nowrap backdrop-blur-xl opacity-0 transition-all
        inline sm:group-hover/heart:!opacity-100 text-right bg-accent/10 rounded-full px-3 py-1 duration-150'>
        <span className='flex flex-row items-center space-x-1'>
          <div className='relative w-[1.2rem] h-[1.2rem]'>
          <Image src={clicks <= 5 ? question_mark : bgs1314baobaomuamualovelove}
            width={0} height={0} sizes='100vw'
            layout='fill' objectFit='contain' unoptimized
          />
          </div>
          <span>{text}</span>
        </span>
        <div className="w-10 h-10 absolute top-[1.80rem] left-10 overflow-hidden inline-block">
          <div className='w-[10px] h-[10px] right-6
            -rotate-45 transform absolute -top-[5px]
            backdrop-blur-xl bg-accent/10'>
          </div>
        </div>
      </div>
      <HiHeart className="font-semibold text-extra-2 text-[0.35rem] sm:text-base absolute bottom-[1.1rem] sm:bottom-[2.3rem] pointer-events-auto" 
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
        <div className='pt-[15rem] sm:pt-[25rem] 5xl:pt-[35rem]'>
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
            <div className='flex items-center ml-[1rem] mb-2'>
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
