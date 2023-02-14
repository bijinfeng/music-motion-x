export interface PersonalizedSong {
  picUrl: string;
  id: number;
  name: string;
  song: Song;
}

export default interface Song {
  imgUrl: string;
  title: string;
  desc: string;
  artistId: number;
  albumId: number;
  artistName: string;
  albumName: string;
  type: "song";
  id: number;
}

export interface Lyric {
  version: number;
  lyric: string;
}

export interface LyricMap {
  lrc: Lyric; // 歌曲歌词
  klyric: Lyric; // 逐字歌词
  tlyric: Lyric; // 翻译歌词
}
