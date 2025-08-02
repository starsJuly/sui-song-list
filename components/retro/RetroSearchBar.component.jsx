import { filterSong } from "../../config/constants";
import {
  RetroWindow,
  RetroButton,
  RetroBox,
} from "../../components/retro/RetroWindow.component";
import clsx from "clsx";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";

export function RetroSearchBar({
  onUpdate,
  className = "",
  placeholder = "Search...",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <RetroBox>
      <input
        type="text"
        className="
          p-2 m-2 text-neon-text-1
          placeholder-neon-text-1 w-[100%]
          bg-neon-background-text text-[1rem]
          focus:outline-none focus:ring-0 focus:ring-offset-0
        "
        placeholder={placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onUpdate(e.target.value);
        }}
      ></input>
    </RetroBox>
  );
}
