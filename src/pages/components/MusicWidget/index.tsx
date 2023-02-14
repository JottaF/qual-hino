import { useContextSelector } from "use-context-selector";
import { LetterContext, MusicProps } from "../../../contexts/letterContext";
import { LetterBox } from "../LetterBox";
import { Music, MusicsContainer } from "./styles";

export function MusicWidget() {
  const { musics, isMusicLoading } = useContextSelector(
    LetterContext,
    (context) => context
  );

  function createMusic(music: MusicProps) {
    const letters = [];

    for (let i = 0; i < music.name.length; i++) {
      letters.push(
        <LetterBox
          key={music.id + music.name[i] + i}
          content={music.name[i].toLocaleLowerCase()}
        />
      );
    }

    return letters;
  }

  console.log("musicwidget", isMusicLoading, musics);
  return (
    <MusicsContainer>
      {!isMusicLoading &&
        musics.map((music) => {
          return (
            <Music key={music.id}>
              {createMusic(music).map((letters) => {
                return letters;
              })}
            </Music>
          );
        })}
    </MusicsContainer>
  );
}
