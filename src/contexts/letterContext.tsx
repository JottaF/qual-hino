import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface MusicProps {
  id: number;
  name: string;
}

interface LetterContextType {
  letter: string;
  sendLetter: (letter: string) => void;
  getMusics: () => MusicProps[];
  lettersHistoric: string[];
  fetchMusics: () => Promise<void>;
  isMusicLoading: boolean;
}

interface LetterContextProps {
  children: ReactNode;
}

export const LetterContext = createContext({} as LetterContextType);

export function LetterProvider({ children }: LetterContextProps) {
  const [isMusicLoading, setIsMusicLoading] = useState(true);
  const [letter, setLetter] = useState("");
  const [musics, setMusics] = useState<MusicProps[]>([]);
  const [lettersHistoric, setLettersHistoric] = useState<string[]>([]);

  function sendLetter(letter: string) {
    setLetter((state) => letter);
    setLettersHistoric((state) => [...state, letter]);
  }

  async function fetchMusics() {
    const response = await api.get("musics");
    console.log("fetch 2");
    console.log(response.data);

    setMusics((state) => [...response.data]);
    setIsMusicLoading(false);
  }

  function getMusics() {
    const musicsArray = [] as MusicProps[];

    for (let i = 0; i < 3; i++) {
      let count = 0;
      while (count < 400) {
        let random = Math.floor(Math.random() * musics.length);
        if (!musicsArray.includes(musics[random])) {
          musicsArray.push(musics[random]);
          break;
        }
        count++;
      }
    }
    console.log("music");

    return musicsArray;
  }

  useEffect(() => {
    fetchMusics();
    console.log("fetch");
  }, []);

  return (
    <LetterContext.Provider
      value={{
        letter,
        sendLetter,
        getMusics,
        lettersHistoric,
        fetchMusics,
        isMusicLoading,
      }}
    >
      {children}
    </LetterContext.Provider>
  );
}
