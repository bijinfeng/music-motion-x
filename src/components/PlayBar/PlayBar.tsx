/* eslint-disable react/prop-types */
import cx from "classnames";
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import InnerModal, { ModalMask } from "../InnerModal";
import { SongList } from "../MediaItemList";
import css from "./PlayBar.module.css";
import PlayFixedBar from "./PlayFixedBar";
import { useLyricStateStore } from "./PlayLyric";
import fetcher from "@/fetcher";
import useIsomorphicEffect from "@/hooks/useIsomorphicEffect";
import { useRootStore } from "@/store";
import Dialog from "@/components/Dialog";
import { getSongDetail, getSongLyric } from "@/request";

import type Song from "@/interfaces/song";

import useEffectShowModal from "@/hooks/useEffectShowModal";

const PlayModal = lazy(() => import("./PlayModal"));

export type PlayState =
  | "loading"
  | "stopped"
  | "paused"
  | "loaded"
  | "playing"
  | "";

const PlayBar: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playState, setPlayState] = useState<PlayState>("");
  const [isShowDialog, setShowDialog] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const { lrc, play, pause } = useLyricStateStore();

  const [audioCurTime, setAudioCurTime] = useState(0);
  const {
    autoplay,
    isShowPlayModal,
    currentPlaySong: { id: currentPlayId } = {},
    currentPlaySongList: currentPlayList,
    showPlayBar,
    playPrev,
    playNext,
    playSong,
  } = useRootStore();

  const { data: src, isLoading: audioLoading } = useQuery(
    ["song", "url", currentPlayId],
    () =>
      fetcher
        .get(`/api/song/url?id=${currentPlayId}`)
        .then((res) => res.data.data[0]),
    { suspense: false, refetchOnWindowFocus: false, enabled: !!currentPlayId }
  );

  const { data: songDetail } = useQuery(
    ["song", "detail", currentPlayId],
    () => getSongDetail(currentPlayId!),
    { suspense: false, refetchOnWindowFocus: false, enabled: !!currentPlayId }
  );

  useQuery(
    ["song", "lyric", currentPlayId],
    () =>
      getSongLyric(currentPlayId!).then((data) => {
        const lyricString = data.lrc.lyric;
        const extendedLyrics = data.tlyric.lyric ? [data.tlyric.lyric] : [];
        lrc.setLyric(lyricString, extendedLyrics);
        return data;
      }),
    { suspense: false, refetchOnWindowFocus: false, enabled: !!currentPlayId }
  );

  const onAudioTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setAudioCurTime(audioRef.current.duration - audioRef.current.currentTime);
      play(audioRef.current.currentTime * 1000);
    }
  }, [play]);

  const onAudioLoadedData = useCallback(() => {
    setAudioCurTime(audioRef.current!.duration);
    setPlayState("loaded");
  }, []);

  const onAudioPlay = useCallback(() => {
    setPlayState("playing");
  }, []);

  const onAudioPause = useCallback(() => {
    setPlayState("paused");
    pause();
  }, [pause]);

  const handlePlayIconClick = useCallback(() => {
    if (playState === "playing") {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
    }
  }, [playState]);

  const onNextOrPrePlay = useCallback(
    (_b: boolean, mode: "prev" | "next") => {
      if (mode === "prev") {
        playPrev();
      } else if (mode === "next") {
        playNext();
      }
    },
    [playNext, playPrev]
  );

  const onAudioEnd = useCallback(() => {
    setPlayState("stopped");
    onNextOrPrePlay(false, "next");
  }, [onNextOrPrePlay]);

  const { isShowModal, isShowContent, onModalOpen, onModalClose } =
    useEffectShowModal();

  useIsomorphicEffect(() => {
    if (barRef.current && isShowPlayModal) {
      barRef.current.style.height = window.innerHeight + "px";
    } else if (barRef.current && !isShowPlayModal) {
      barRef.current.style.height = 40 + "px";
      onModalClose();
    }
  }, [isShowPlayModal]);

  useIsomorphicEffect(() => {
    if (audioLoading && currentPlayId) setPlayState("loading");
  }, [audioLoading]);

  useIsomorphicEffect(() => {
    if (audioRef.current && src?.url) {
      audioRef.current.src = src.url?.replace?.(/https?/, "https");
      audioRef.current.currentTime = 0;
      if (autoplay) {
        audioRef.current
          .play()
          .then(onAudioPlay)
          .catch(() => {
            setShowDialog(true);
          });
      }
    } else if (src && !src?.url && currentPlayId) {
      setShowDialog(true);
    }
  }, [src]);

  useEffect(() => {
    if ("mediaSession" in navigator && songDetail) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songDetail.title ?? "",
        artist: songDetail.artistName ?? "",
        album: songDetail.albumName ?? "",
        artwork: [{ src: songDetail.imgUrl ?? "" }],
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        onNextOrPrePlay(true, "prev");
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        onNextOrPrePlay(true, "next");
      });
    }
  }, [onNextOrPrePlay, songDetail]);

  if (!showPlayBar) return <></>;

  return (
    <>
      {isShowDialog && (
        <Dialog
          title="播放出错，请重试"
          onCancelClick={() => setShowDialog(false)}
          onConfirmClick={() => {
            playSong({} as Song);
            setShowDialog(false);
          }}
        />
      )}
      {isShowModal && (
        <InnerModal isDynamic={false}>
          <ModalMask onClick={onModalClose}>
            <div
              className={css.songlist}
              style={{
                transform: isShowContent
                  ? "translate3d(0, 0,0)"
                  : "translate3d(0, 100%,0)",
              }}
            >
              <div className={css.contents}>
                <SongList
                  list={(currentPlayList as Song[]) ?? undefined}
                  placeHolderCount={8}
                  lazyAll
                  indexedPic
                  more={false}
                />
              </div>
              <div className={css.close} data-close="true">
                &times;
              </div>
            </div>
          </ModalMask>
        </InnerModal>
      )}
      <audio
        src={src?.url ?? ""}
        ref={audioRef}
        preload="metadata"
        autoPlay={autoplay}
        onLoadedData={onAudioLoadedData}
        onTimeUpdate={onAudioTimeUpdate}
        onPlay={onAudioPlay}
        onPause={onAudioPause}
        onEnded={onAudioEnd}
        onError={(e) => {
          console.log(
            e.currentTarget?.error?.code,
            e.currentTarget?.error?.message
          );
        }}
      />
      <div
        className={cx(
          "fixed bg-black transition-all overflow-hidden duration-300",
          {
            "z-[9999] bottom-0 left-0 rounded-none h-screen w-screen bg-mg will-change-auto p-5":
              isShowPlayModal,
            "left-4 bottom-5 z-[1000] w-32 h-10 rounded-[500px]":
              !isShowPlayModal,
          }
        )}
        ref={barRef}
      >
        {!isShowPlayModal ? (
          <PlayFixedBar
            playState={playState}
            handlePlayIconClick={handlePlayIconClick}
            hasSong={!!songDetail}
            audioCurTime={audioCurTime}
          />
        ) : (
          <Suspense>
            <PlayModal
              playState={playState}
              songDetail={songDetail}
              audioRef={audioRef}
              audioCurTime={audioCurTime}
              handlePlayIconClick={handlePlayIconClick}
              onModalOpen={onModalOpen}
              onNextOrPrePlay={onNextOrPrePlay}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default PlayBar;
