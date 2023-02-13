import { FC } from "react";
import css from "./PlayBar.module.css";
import type { PlayState } from "./PlayBar";
import { SpinnerLoading } from "@/components/Spinner";
import { useRootStore } from "@/store";
import formatAudioTime from "@/utils/formatAudioTime";

interface PlayFixBarProps {
  playState: PlayState;
  handlePlayIconClick: () => void;
  hasSong: boolean;
  audioCurTime: number;
}

const PlayFixedBar: FC<PlayFixBarProps> = (props) => {
  const { playState, handlePlayIconClick, hasSong, audioCurTime } = props;
  const setShowPlayModal = useRootStore((state) => state.setShowPlayModal);

  const renderPlayStateIcon = () => {
    if (playState === "loading") {
      return (
        <SpinnerLoading
          color="rgb(254, 221, 39)"
          style={{ width: 16, height: 16 }}
        />
      );
    }

    if (playState === "playing") {
      return (
        <div className="relative w-4 h-4 before:absolute  before:top-0 before:left-0 before:block before:w-[6px] before:h-4 before:bg-secondary before:rounded-[2px] after:top-0 after:left-1 after:block after:w-[6px] after:h-4 after:bg-secondary after:rounded-[2px] after:ml-[10px]" />
      );
    }

    return <div className={css.play} />;
  };

  return (
    <div className="flex items-center justify-center">
      <div onClick={handlePlayIconClick}>{renderPlayStateIcon()}</div>
      <div
        className="text-dg font-bold text-lg h-full leading-10 ml-3"
        onClick={() => {
          if (hasSong) {
            setShowPlayModal(true);
          }
        }}
      >
        {formatAudioTime(audioCurTime)}
      </div>
    </div>
  );
};

export default PlayFixedBar;
