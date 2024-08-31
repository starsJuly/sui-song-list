import React, { useState, useRef, useEffect } from 'react';
import Image from "next/legacy/image";
import config from '../config/constants';
import { song_list } from "../config/song_list";

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

const HeaderView = ({ props: [filter_state, EffThis,] }) => {
  return(
    <>
      <div>
        <div className='pt-[20rem]'>
        <div className='flex items-center'>
          <div className="mr-2 ml-[1rem] hidden relative sm:w-[9rem] sm:h-[9rem] sm:block">
            <Image src="/assets/images/banner_image.webp" 
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
                <Image src="/assets/images/banner_image.webp"
                  alt="liver-avatar"
                  loader={({ src }) => src}
                  layout='fill' objectFit='contain'
                  unoptimized
                  className='rounded-full'
                />
              </div>
              <div className='text-base text-label flex-col'>
                <span className='font-bold block sm:text-title'> {config.Name} </span>
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
