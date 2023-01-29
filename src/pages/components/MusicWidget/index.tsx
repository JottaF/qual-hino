import { useContext } from "react";
import { LetterContext } from "../../../contexts/letterContext";
import { LetterBox } from "../LetterBox";
import { Music, MusicsContainer } from "./styles";

export function MusicWidget() {
  const { getMusics } = useContext(LetterContext);
  const musics = getMusics();

  function createMusic(music: string) {
    const letters = [];

    for (let i = 0; i < music.length; i++) {
      letters.push(<LetterBox letter={music[i]} />);
    }

    return letters;
  }

  return (
    <MusicsContainer>
      {musics.map((music) => {
        return (
          <Music key={music.id}>
            {createMusic(music.name).map((letters) => {
              return letters;
            })}
          </Music>
        );
      })}
    </MusicsContainer>
  );
}
