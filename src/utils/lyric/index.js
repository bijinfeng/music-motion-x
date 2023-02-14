import LinePlayer from "./line-player";
import FontPlayer from "./font-player";

const fontTimeExp = /<(\d+),(\d+)>/g;

class Lyric {
  constructor({
    lyric = "",
    extendedLyrics = [],
    offset = 0,
    lineContentClassName = "line-content",
    lineClassName = "line",
    shadowClassName = "shadow",
    fontModeClassName = "font-mode",
    lineModeClassName = "line-mode",
    fontLrcClassName = "font-lrc",
    extendedLrcClassName = "extended",
    activeLineClassName = "active",
    shadowContent = false,
    isVertical = false,
    onPlay = function (_line, _text) {},
    onSetLyric = function (_lines, _offset) {},
    onUpdateLyric = function (_lines) {},
  }) {
    this.lyric = lyric;
    this.extendedLyrics = extendedLyrics;
    this.offset = offset;
    this.onPlay = onPlay;
    this.onSetLyric = onSetLyric;
    this.onUpdateLyric = onUpdateLyric;

    this.lineContentClassName = lineContentClassName;
    this.lineClassName = lineClassName;
    this.shadowClassName = shadowClassName;
    this.fontModeClassName = fontModeClassName;
    this.lineModeClassName = lineModeClassName;
    this.fontLrcClassName = fontLrcClassName;
    this.extendedLrcClassName = extendedLrcClassName;
    this.activeLineClassName = activeLineClassName;
    this.shadowContent = shadowContent;

    this.isVertical = isVertical;
    this.playingLineNum = -1;
    this.isLineMode = false;

    this.initInfo = {
      lines: [],
      offset: 0,
    };

    this.linePlayer = new LinePlayer({
      offset: this.offset,
      onPlay: this._handleLinePlayerOnPlay,
      onSetLyric: this._handleLinePlayerOnSetLyric,
    });
  }

  _init() {
    this.playingLineNum = -1;
    this.isLineMode = false;

    this.linePlayer.setLyric(this.lyric, this.extendedLyrics);
  }

  _handleLinePlayerOnPlay = (num, _text, curTime) => {
    if (this.isLineMode) {
      if (num < this.playingLineNum + 1) {
        for (let i = this.playingLineNum; i > num - 1; i--) {
          const font = this._lineFonts[i];
          font.reset();
          font.lineContent.classList.remove(this.activeLineClassName);
        }
      } else if (num > this.playingLineNum) {
        for (let i = Math.max(this.playingLineNum, 0); i < num; i++) {
          const font = this._lineFonts[i];
          font.reset();
          font.lineContent.classList.remove(this.activeLineClassName);
        }
      } else if (this.playingLineNum > -1) {
        const font = this._lineFonts[this.playingLineNum];
        font.reset();
        font.lineContent.classList.remove(this.activeLineClassName);
      }
    } else {
      if (num < this.playingLineNum + 1) {
        for (let i = this.playingLineNum; i > num - 1; i--) {
          const font = this._lineFonts[i];
          font.lineContent.classList.remove(this.activeLineClassName);
          font.reset();
        }
      } else if (num > this.playingLineNum) {
        for (let i = Math.max(this.playingLineNum, 0); i < num; i++) {
          const font = this._lineFonts[i];
          font.lineContent.classList.remove(this.activeLineClassName);
          font.finish();
        }
      } else if (this.playingLineNum > -1) {
        const font = this._lineFonts[this.playingLineNum];
        font.lineContent.classList.remove(this.activeLineClassName);
      }
    }
    this.playingLineNum = num;
    const font = this._lineFonts[num];
    font.lineContent.classList.add(this.activeLineClassName);
    font.play(curTime - this._lines[num].time);
    this.onPlay(num, this._lines[num].text);
  };

  _initLines = (lyricLines, offset, isUpdate) => {
    // console.log(lyricLines)
    // this._lines = lyricsLines
    this.isLineMode =
      lyricLines.length && !/^<\d+,\d+>/.test(lyricLines[0].text);

    this._lineFonts = [];
    if (this.isLineMode) {
      this._lines = lyricLines.map((line) => {
        const fontPlayer = new FontPlayer({
          time: line.time,
          lyric: line.text,
          extendedLyrics: line.extendedLyrics,
          lineContentClassName: this.lineContentClassName,
          lineClassName: this.lineClassName,
          shadowClassName: this.shadowClassName,
          fontModeClassName: this.fontModeClassName,
          lineModeClassName: this.lineModeClassName,
          fontLrcClassName: this.fontLrcClassName,
          extendedLrcClassName: this.extendedLrcClassName,
          shadowContent: this.shadowContent,
          isVertical: this.isVertical,
        });

        this._lineFonts.push(fontPlayer);
        return {
          text: line.text,
          time: line.time,
          extendedLyrics: line.extendedLyrics,
          dom_line: fontPlayer.lineContent,
        };
      });
    } else {
      this._lines = lyricLines.map((line) => {
        const fontPlayer = new FontPlayer({
          time: line.time,
          lyric: line.text,
          extendedLyrics: line.extendedLyrics,
          lineContentClassName: this.lineContentClassName,
          lineClassName: this.lineClassName,
          shadowClassName: this.shadowClassName,
          fontModeClassName: this.fontModeClassName,
          lineModeClassName: this.lineModeClassName,
          fontLrcClassName: this.fontLrcClassName,
          extendedLrcClassName: this.extendedLrcClassName,
          shadowContent: this.shadowContent,
          isVertical: this.isVertical,
        });

        this._lineFonts.push(fontPlayer);
        return {
          text: line.text.replace(fontTimeExp, ""),
          time: line.time,
          extendedLyrics: line.extendedLyrics,
          dom_line: fontPlayer.lineContent,
        };
      });
    }

    // 如果是逐行歌词，则添加 60ms 的偏移
    let newOffset = this.isLineMode ? this.offset + 60 : this.offset;
    offset = offset - this.linePlayer.offset + newOffset;
    this.linePlayer.offset = newOffset;
    if (isUpdate) this.onUpdateLyric(this._lines);
    else this.onSetLyric(this._lines, offset);
  };

  _handleLinePlayerOnSetLyric = (lyricLines, offset) => {
    this._initLines(lyricLines, offset, false);
    this.playingLineNum = 0;
    this.initInfo.lines = lyricLines;
    this.initInfo.offset = offset;
  };

  play(curTime) {
    if (!this.linePlayer) return;
    this.linePlayer.play(curTime);
  }

  pause() {
    if (!this.linePlayer) return;
    this.linePlayer.pause();
    if (this.playingLineNum > -1) this._lineFonts[this.playingLineNum]?.pause();
  }

  setOffset(offset) {
    this.linePlayer.offset = offset;
  }

  setLyric(lyric, extendedLyrics) {
    this.lyric = lyric;
    this.extendedLyrics = extendedLyrics;
    this._init();
  }

  setVertical(isVertical) {
    this.isVertical = isVertical;
    this._initLines(this.initInfo.lines, this.initInfo.offset, true);
    if (this.linePlayer.isPlay) {
      const num = this.playingLineNum;
      this.playingLineNum = 0;
      this._handleLinePlayerOnPlay(num, "", this.linePlayer._currentTime());
    } else this.playingLineNum = 0;
  }
}

export default Lyric;
