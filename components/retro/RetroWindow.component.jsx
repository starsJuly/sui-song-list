import React from "react";
import {
  useRef,
  Children,
  useState,
  useEffect,
  useCallback,
  cloneElement
} from "react";
import clsx from "clsx";
import { 
  MdClose,
  MdOutlineMaximize,
  MdOutlineFavorite
} from "react-icons/md";
import { 
  motion, 
  useDragControls 
} from "framer-motion";
import Draggable from "react-draggable";

export function RetroBox({ 
  variant = "neon", 
  className,
  children 
}) {
  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <div className="absolute bottom-[2px] w-[100%] h-[2px] border-transparent pointer-events-none bg-neon-secondary-highlight"></div>
      <div className="absolute right-[2px] w-[2px] h-[100%] border-transparent pointer-events-none bg-neon-secondary-highlight"></div>

      <div className="absolute top-0 inset-0 h-[2px] w-[100%] border-transparent pointer-events-none bg-neon-highlight"></div>
      <div className="absolute left-0 inset-x-0 w-[2px] h-[100%] border-transparent pointer-events-none bg-neon-highlight"></div>

      <div className="absolute bottom-0 h-[2px] w-[100%] border-transparent pointer-events-none bg-neon-tetriary-highlight"></div>
      <div className="absolute right-0 w-[2px] h-[100%] border-transparent pointer-events-none bg-neon-tetriary-highlight"></div>
      {children}
    </div>
  );
}

export function RetroButton({
  className,
  children,
  onClick,
}) {
  return (
    <button className={clsx("relative overflow-hidden", className)}
      onClick={onClick}
    >
      <div className="absolute bottom-[2px] w-[100%] h-[2px] border-transparent pointer-events-none bg-neon-secondary-highlight"></div>
      <div className="absolute right-[2px] w-[2px] h-[100%] border-transparent pointer-events-none bg-neon-secondary-highlight"></div>

      <div className="absolute top-0 inset-0 h-[2px] w-[100%] border-transparent pointer-events-none bg-neon-highlight"></div>
      <div className="absolute left-0 inset-x-0 w-[2px] h-[100%] border-transparent pointer-events-none bg-neon-highlight"></div>

      <div className="absolute bottom-0 h-[2px] w-[100%] border-transparent pointer-events-none bg-neon-tetriary-highlight"></div>
      <div className="absolute right-0 w-[2px] h-[100%] border-transparent pointer-events-none bg-neon-tetriary-highlight"></div>
      {children}
    </button>
  );
}

export function RetroWindow({
  variant = "neon",
  title = "Window",
  icon,
  actions,
  widthClass = "w-80",
  className,
  children,
}) {
  const theme = {
    neon: {
      outer: clsx(
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]",
        "before:bg-[size:100%_4px] before:pointer-events-none before:animate-scan"
      ),
      titleBar: "bg-neonBorder/20 text-neonBorder",
      body: "text-neonBorder/80",
    },
    classic: {
      outer: clsx(
        "bg-classicBg",
        "border-t-2 border-l-2 border-classicBorderLight",
        "border-b-4 border-r-4 border-classicBorderDark",
        "shadow-[inset_0_0_0_1px_#fff,inset_-1px_-1px_0_1px_#00000040]"
      ),
      titleBar: "bg-classicBar text-white",
      body: "text-gray-800",
    },
  }[variant];

  const nodeRef = useRef(null);

  const window = (
    <RetroBox className={clsx("bg-neon-background-1")}>
      {/* top */}
      <div
        className="
          border-solid border-[2px] 
          border-neon-tetriary-highlight
          relative ml-[4px] mr-[6px] mt-[4px]
          pl-1 pr-1 bg-neon-background-2
          text-neon-text-1 flex-row flex
          flex-shrink-0 justify-between
          items-center handle cursor-move
          "
      >
        <div className="flex items-center gap-2 select-none">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-subtitle">{title}</span>
        </div>
        <div className="inline-flex flex-row gap-1">
          <RetroBox
            className="
            text-neon-action-foreground
            bg-neon-action-background
            text-[1.5rem] mt-[2px] mb-[1px] flex items-center
          "
          >
            <MdOutlineFavorite />
          </RetroBox>
          <RetroBox
            className="
            text-neon-action-foreground
            bg-neon-action-background
            text-[1.5rem] mt-[2px] mb-[1px] flex items-center
          "
          >
            <MdOutlineMaximize />
          </RetroBox>
          <RetroBox
            className="
            text-neon-action-foreground
            bg-neon-action-background
            text-[1.5rem] mt-[2px] mb-[1px] flex items-center
          "
          >
            <MdClose />
          </RetroBox>
        </div>
      </div>

      {/* content */}
      <div
        className="
        relative
        border-solid border-[2px] 
      border-neon-tetriary-highlight
        p-1 ml-[4px] mr-[6px] mt-[2px] mb-[6px]
        bg-neon-background-text 
        "
      >
        {children}
      </div>
    </RetroBox>
  );
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"  
    >
      <div className={clsx("relative", className)} ref={nodeRef}>
        {window}
      </div>
    </Draggable>
  );
}

export function RetroWindowContainer({
  children,
  className,
}) {
  const flat = Children.toArray(children)
    .map((child, i) =>
      React.isValidElement(child)
        ? { key: child.key ?? `${i}`, el: child }
        : null
    )
    .filter(Boolean);
  const [stack, setStack] = useState(flat);
  useEffect(() => {
    const newStack = [...stack];
    flat.forEach(({ key, el }) => {
      if (!newStack.some((w) => w.key === key)) {
        newStack.push({ key, el });
      }
    });
    setStack(newStack.filter((w) => flat.some((f) => f.key === w.key)));
  }, [children]);

  const bringToTop = useCallback((key) => {
    console.log("Bringing to top:", key);
    setStack((ws) => {
      const idx = ws.findIndex((w) => w.key === key);
      if (idx < 0 || idx === ws.length - 1) return ws;
      const w = ws[idx];
      const clone = [...ws];
      clone.splice(idx, 1);
      clone.push(w);
      return clone;
    });
  }, []);

  return (
    <>
      {stack.map(({ key, el }, z) => {
        return cloneElement(el, {
          key,
          onStart: () => bringToTop(key),
          onMouseDown: () => bringToTop(key),
          style: {
            position: "absolute",
            zIndex: 100 + z,
            ...(el.props.style ?? {}),
          },
        });
      })}
    </>
  );
}
