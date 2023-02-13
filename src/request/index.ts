import fetcher from "@/fetcher";
import type Song from "@/interfaces/song";

export const getSongDetail = async (ids: string | number) => {
  const res = await fetcher.get<{ songs: any[] }>(
    `/api/song/detail?ids=${ids}`
  );
  const songs = res.data.songs;
  return songs.map((song) => {
    const names = song.ar.length
      ? [...song.ar].reverse().reduce((ac, a) => `${a.name} ${ac}`, "")
      : "";
    return {
      imgUrl: song.al.picUrl ? song.al.picUrl.replace(/https?/, "https") : "",
      title: `${song.name}`,
      desc: names,
      artistId: song.ar[0].id,
      albumId: song.al.id,
      artistName: names,
      albumName: song.al.name,
      type: "song",
      id: song.id,
    };
  })[0] as Song;
};
