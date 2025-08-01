import { filterSong } from "../../config/constants";
import RetroWindow from "../../components/retro/RetroWindow.component";
import clsx from "clsx";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { canonicalizeSong } from "../../config/controllers";
import Image from "next/legacy/image";

export default function RetroSongList({
  songList = [],
  rowHeight = 72,
  songListHeight = 0.8
}) {
  const inputList = songList;
  const [pageIndex, setPageIndex] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const recompute = () => {
    const vh = window.innerHeight;
    const capacity = Math.floor((vh * songListHeight) / (rowHeight + 5)) || 1;
    setPerPage(capacity);

    const newTotalPage = Math.ceil(inputList.length / capacity);
    if (pageIndex >= newTotalPage) {
      setPageIndex(newTotalPage - 1);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", recompute);
    recompute();
    return () => {
      window.removeEventListener("resize", recompute);
    };
  }, [inputList, rowHeight, songListHeight]);

  const totalPages = Math.ceil(inputList.length / perPage);
  const pageItems = inputList.slice(
    (pageIndex - 1) * perPage,
    pageIndex * perPage
  );

  const generateRow = (song, i) => {
    let renderedSong = canonicalizeSong(song, i);
    return (
      <div className="flex border-b border-gray-600"
        key={i}
      >
        <div
          className="py-2 px-3
          flex items-center gap-1"
          style={{ height: `${rowHeight}px` }}
        >
          <div
          className="inline shrink-0
          sm:w-[3.5rem] sm:h-[3.5rem] 
          w-[3rem] h-[3rem] relative mr-1"
          >
          <Image
              src={renderedSong.artwork_url || "/favicon.png"}
              alt={renderedSong.song_name}
              className="rounded-lg object-cover w-full h-full"
              width={56}
              height={56}
              unoptimized
              onError={(e) => {
                e.target.src = "/favicon.png";
              }}
          />
          </div>
          <div className="
            flex flex-col"
            >
            <p className="text-white">{renderedSong.song_name}</p>
            {renderedSong.song_translated_name.length > 0 && (
                <p className="text-neon-text-1 text-sm">
                {renderedSong.song_translated_name}
                </p>
            )}
            {renderedSong.remarks.length > 0 && (
                <p className="text-neon-text-1 text-sm">
                {renderedSong.remarks}
                </p>
            )}
          </div>
        </div>
        <div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ height: `${100 * songListHeight}vh` }}>
      {/* 歌单列表 */}
      <div className="flex-1 overflow-auto">
        {pageItems.map((song, i) => (
            generateRow(song, i)
        ))}
      </div>
      {/* 分页按钮 */}
      <div className="flex justify-center gap-4 py-2">
        <button
          onClick={() => setPageIndex(Math.max(1, pageIndex - 1))}
          disabled={pageIndex <= 1}
          className="px-3 py-1 border hover:bg-gray-700"
        >
          ◀ Prev
        </button>
        <span className="px-2">
          {pageIndex} / {totalPages}
        </span>
        <button
          onClick={() => setPageIndex(Math.min(totalPages, pageIndex + 1))}
          disabled={pageIndex >= totalPages}
          className="px-3 py-1 border hover:bg-gray-700"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
