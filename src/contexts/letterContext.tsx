import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface MusicProps {
  id: number;
  name: string;
}

interface LetterContextType {
  letter: string;
  sendLetter: (letter: string) => void;
  lettersHistoric: string[];
  fetchMusics: () => Promise<void>;
  isMusicLoading: boolean;
  musics: MusicProps[];
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
    setTimeout(() => setLetter((state) => ""), 1000);
  }

  async function fetchMusics() {
    const response = await api.get("musics");

    setIsMusicLoading(false);

    const musicsArray = [] as MusicProps[];

    for (let i = 0; i < 3; i++) {
      let count = 0;
      while (count < 400) {
        let random = Math.floor(Math.random() * response.data.length);
        if (!musicsArray.includes(response.data[random])) {
          musicsArray.push(response.data[random]);
          break;
        }
        count++;
      }
    }

    setMusics((state) => [...musicsArray]);
  }

  useEffect(() => {
    fetchMusics();
  }, []);

  return (
    <LetterContext.Provider
      value={{
        letter,
        sendLetter,
        lettersHistoric,
        fetchMusics,
        isMusicLoading,
        musics,
      }}
    >
      {children}
    </LetterContext.Provider>
  );
}
