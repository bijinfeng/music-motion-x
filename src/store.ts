import { create } from "zustand";
import { getSongDetail } from "@/request";

import type Song from "@/interfaces/song";

interface RootState {
  autoplay: boolean;
  currentPlaySong?: Song;
  showPlayBar: boolean;
  currentPlaySongList: Song[];
  isShowPlayModal: boolean;
  setShowPlayModal: (bol: boolean) => void;
  playSong: (song: Song, autoplay?: boolean) => void;
  playSongs: (songs: Song[], autoplay?: boolean) => void;
  playPrev: () => void;
  playNext: () => void;
  playAtNext: (song: Song) => void;
  setShowPlayBar: (show: boolean) => void;
  playById: (id: string, autoplay?: boolean) => void;
}

export const useRootStore = create<RootState>((set, get) => ({
  autoplay: true,
  showPlayBar: true,
  currentPlaySongList: [],
  isShowPlayModal: false,
  setShowPlayModal: (bol) => {
    set({ isShowPlayModal: bol });
  },
  playSong: (song, autoplay = true) => {
    set((state) => {
      const currentPlaySong = song;
      const currentPlaySongList = [...state.currentPlaySongList];
      const curIndex = currentPlaySongList.findIndex(
        (song) => song.id === currentPlaySong.id
      );
      if (curIndex === -1) {
        currentPlaySongList.unshift(currentPlaySong);
      }

      return { currentPlaySong, currentPlaySongList, autoplay };
    });
  },
  playSongs: (songs, autoplay) => {
    set({ currentPlaySongList: songs, currentPlaySong: songs[0], autoplay });
  },
  playPrev: () => {
    const { currentPlaySongList, currentPlaySong } = get();
    const curIndex = currentPlaySongList.findIndex(
      (song) => song.id === currentPlaySong?.id
    );
    if (curIndex > 0) {
      set({ currentPlaySong: currentPlaySongList[curIndex - 1] });
    }
  },
  playNext: () => {
    const { currentPlaySongList, currentPlaySong } = get();
    const curIndex = currentPlaySongList.findIndex(
      (song) => song.id === currentPlaySong?.id
    );
    if (curIndex > 0) {
      set({ currentPlaySong: currentPlaySongList[curIndex + 1] });
    }
  },
  playAtNext: (song) => {
    const { currentPlaySong, currentPlaySongList } = get();
    if (song.id === currentPlaySong?.id) return;
    if (!currentPlaySong?.id) {
      set({ currentPlaySong });
      if (currentPlaySongList.length === 0) {
        set({ currentPlaySongList: [song] });
      }
    } else {
      const curIndex = currentPlaySongList.findIndex(
        (song) => song.id === currentPlaySong.id
      );
      set({
        currentPlaySongList: [
          ...currentPlaySongList.splice(curIndex + 1, 0, song),
        ],
      });
    }
  },
  setShowPlayBar: (show) => {
    set({ showPlayBar: show });
  },
  playById: async (id, autoplay) => {
    const { playSong } = get();
    const song = await getSongDetail(id);
    playSong(song, autoplay);
  },
}));
