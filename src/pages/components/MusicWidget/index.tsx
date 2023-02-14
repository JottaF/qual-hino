import { useContext } from "react";
import { LetterContext, MusicProps } from "../../../contexts/letterContext";
import { LetterBox } from "../LetterBox";
import { Music, MusicsContainer } from "./styles";

export function MusicWidget() {
  const { musics, isMusicLoading } = useContext(LetterContext);

  function createMusic(music: MusicProps) {
    const letters = [];

    for (let i = 0; i < music.name.length; i++) {
      letters.push(
        <LetterBox
          key={music.id * Math.random() + music.name[i]}
          content={music.name[i].toLocaleLowerCase()}
        />
      );
    }

    return letters;
  }

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
