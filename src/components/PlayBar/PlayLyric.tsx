import React, { useEffect, useRef } from "react";
import { create } from "zustand";
import cls from "classnames";
import styles from "./PlayBar.module.css";
import Lyric from "@/utils/lyric";

interface Line {
  text: string;
  time: number;
  extendedLyrics: string[];
  dom_line: HTMLDivElement;
}

interface PlayLyricState {
  lrc: Lyric;
  lines: Line[];
  text: string;
  line: number;
  offset: number; // 歌词延迟
  tempOffset: number; // 歌词临时延迟
  play: (time: number) => void;
  pause: () => void;
  stop: () => void;
}

export const useLyricStateStore = create<PlayLyricState>((set) => {
  const lrc = new Lyric({
    shadowContent: true,
    activeLineClassName: "active",
    isVertical: false,
    onPlay(line, text) {
      set({ text, line });
    },
    onSetLyric(lines, offset) {
      set({ lines, offset, tempOffset: 0, text: lines[0] ?? "", line: 0 });
    },
    onUpdateLyric(lines) {
      set({ lines, text: lines[0] ?? "", line: 0 });
    },
  });

  return {
    lrc,
    lines: [],
    text: "",
    line: 0,
    offset: 0,
    tempOffset: 0,
    play: (time) => lrc.play(time),
    pause: () => lrc.pause(),
    stop: () => {
      lrc.setLyric("");
      set({ text: "", line: 0 });
    },
  };
});

const PlayLyric: React.FC = () => {
  const lyricRef = useRef<HTMLDivElement>(null);
  const { line, lines } = useLyricStateStore();

  useEffect(() => {
    const dom_line_content = document.createDocumentFragment();
    for (const line of lines) {
      dom_line_content.appendChild(line.dom_line);
    }
    // @ts-ignore
    // lyricRef.current?.textContent = "";
    lyricRef.current?.appendChild(dom_line_content);
  }, [lines]);

  useEffect(() => {
    const top = (line - 1) * 20;
    lyricRef.current?.scrollTo({ top: top > 0 ? top : 0 });
  }, [line]);

  return (
    <div ref={lyricRef} className={cls("text-fg text-xs", styles.lyric)} />
  );
};

export default PlayLyric;
