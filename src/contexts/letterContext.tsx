import { ReactNode, useEffect, useReducer, useState } from "react";
import { api } from "../lib/axios";

import { createContext } from "use-context-selector";

export interface MusicProps {
  id: number;
  name: string;
}

interface TeamsPointsProps {
  team1: number;
  team2: number;
  team3: number;
  team4: number;
}
interface ShowAlertProps {
  active: boolean;
  title?: string;
  message?: string;
}

type teamsType = "team1" | "team2" | "team3" | "team4";
interface LetterContextType {
  letter: string;
  sendLetter: (letter: string) => void;
  lettersHistoric: string[];
  fetchMusics: () => Promise<void>;
  isMusicLoading: boolean;
  musics: MusicProps[];
  hits: number;
  clearHits: () => void;
  resetHits: () => void;
  showAlert: ShowAlertProps;
  teamsPoints: TeamsPointsProps;
  currentTeam: number;
  changeCurrentTeam: () => void;
  totalLetters: number;
  lettersFound: number;
  sendRoulettePoint: (point: number) => void;
  finishedLettersInput: boolean;
}

interface LetterContextProps {
  children: ReactNode;
}

interface ActionProps {
  type: string;
  hit: number;
  payload?: any;
}

export const LetterContext = createContext({} as LetterContextType);

export function LetterProvider({ children }: LetterContextProps) {
  const [isMusicLoading, setIsMusicLoading] = useState(true);
  const [letter, setLetter] = useState("");
  const [musics, setMusics] = useState<MusicProps[]>([]);
  const [hits, setHits] = useState(-1);
  const [lettersHistoric, setLettersHistoric] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState<ShowAlertProps>({ active: false });
  const [currentTeam, setCurrentTeam] = useState(1);
  const [totalLetters, setTotalLetters] = useState(0);
  const [lettersFound, setLettersFound] = useState(0);
  const [roulettePoints, setRoulettePoints] = useState(0);

  const finishedLettersInput = totalLetters - 12 <= lettersFound; // !: trocar

  function reducer(state: any, action: ActionProps) {
    console.log("reduce");
    switch (action.type) {
      case "TEAM1":
        return { ...state, team1: (state.team1 += action.hit) };
      case "TEAM2":
        return { ...state, team2: (state.team2 += action.hit) };
      case "TEAM3":
        return { ...state, team3: (state.team3 += action.hit) };
      case "TEAM4":
        return { ...state, team4: (state.team4 += action.hit) };
      default:
        return state;
    }
  }

  const [teamsPoints, teamsPointsDispatch] = useReducer(reducer, {
    team1: 0,
    team2: 0,
    team3: 0,
    team4: 0,
  });

  function incrementTeam(team: number, hit: number) {
    console.log("incrementTeam");
    switch (team) {
      case 1:
        teamsPointsDispatch({ type: "TEAM1", hit });
        break;
      case 2:
        teamsPointsDispatch({ type: "TEAM2", hit });
        break;
      case 3:
        teamsPointsDispatch({ type: "TEAM3", hit });
        break;
      case 4:
        teamsPointsDispatch({ type: "TEAM4", hit });
        break;
    }
  }

  function sendLetter(userLetter: string) {
    console.log("sendLetter");
    const isLetterUsed = verifyLettersHistoric(userLetter);

    if (!isLetterUsed && userLetter !== "") {
      setLetter((state) => userLetter);
      setLettersHistoric((state) => [...state, userLetter]);
      clearHits();
      calcHits(userLetter);
      setTimeout(() => setLetter((state) => ""), 1000);
    } else {
      setShowAlert((state) => ({
        active: true,
        title: "Passou a vez",
        message: "Não acertou a letra",
      }));
      setTimeout(() => {
        setShowAlert((state) => ({ active: false }));
        changeCurrentTeam();
      }, 2000);
    }
  }

  async function fetchMusics() {
    console.log("fetchMusic");
    const response = await api.get("musics");

    setIsMusicLoading(false);

    const musicsArray = [] as MusicProps[];

    for (let i = 0; i < 3; i++) {
      let count = 0;
      while (count < 400) {
        let random = Math.floor(Math.random() * response.data.length);
        let music = response.data[random];
        if (!musicsArray.includes(music) && music.name.length <= 24) {
          musicsArray.push(music);
          console.log(music, "context 150");

          break;
        }
        count++;
      }
    }

    setMusics((state) => [...musicsArray]);

    let musicsLettersCount = musicsArray.reduce((acc, music) => {
      return (acc += music.name.replaceAll(" ", "").length);
    }, 0);
    setTotalLetters(musicsLettersCount);
  }

  function calcHits(userLetter: string) {
    console.log("calcHits");
    const hitsCount = musics.reduce((acc, music) => {
      for (let msc of music.name) {
        let mscLower = msc.toLocaleLowerCase();
        console.log(mscLower, userLetter);
        if (
          mscLower === userLetter ||
          (userLetter === "c" && mscLower === "ç") ||
          (userLetter === "a" && mscLower === "á") ||
          (userLetter === "a" && mscLower === "à") ||
          (userLetter === "a" && mscLower === "ã") ||
          (userLetter === "a" && mscLower === "â") ||
          (userLetter === "e" && mscLower === "é") ||
          (userLetter === "e" && mscLower === "ê") ||
          (userLetter === "i" && mscLower === "í") ||
          (userLetter === "o" && mscLower === "ô") ||
          (userLetter === "o" && mscLower === "õ") ||
          (userLetter === "o" && mscLower === "ó") ||
          (userLetter === "u" && mscLower === "ú")
        ) {
          acc++;
          setLettersFound((state) => state + 1);
        }
      }
      return acc;
    }, 0);

    setHits((state) => hitsCount);

    if (hitsCount === 0) {
      setShowAlert((state) => ({
        active: true,
        title: "Passou a vez",
        message: "Não acertou a letra",
      }));
      setTimeout(() => {
        setShowAlert((state) => ({ active: false }));
        changeCurrentTeam();
      }, 2000);
    } else if (hitsCount > 0) {
      incrementTeam(currentTeam, hitsCount * roulettePoints);
      setRoulettePoints((state) => 0);
    }
  }

  function clearHits() {
    console.log("clearHits");
    setHits((state) => 0);
  }

  function resetHits() {
    console.log("resetHits");
    setHits((state) => -1);
  }

  function verifyLettersHistoric(userLetter: string) {
    console.log("verifyLettersHistoric");
    const isLetterInHistoric = lettersHistoric.find((letter) => {
      return letter === userLetter;
    });
    return isLetterInHistoric;
  }

  function changeCurrentTeam() {
    console.log("changeCurrentTeam");
    if (currentTeam < 4) {
      setCurrentTeam((state) => state + 1);
    } else {
      setCurrentTeam((state) => 1);
    }
  }

  function sendRoulettePoint(point: number) {
    console.log("sendRoulettePoint", point);
    if (point === 0) {
      // incrementTeam(currentTeam, 0);
      // setTimeout(() => {
      //   setShowAlert((state) => ({
      //     active: true,
      //     title: "Perdeu tudo",
      //   }));
      // }, 3500);
      // setTimeout(() => {
      //   setShowAlert((state) => ({ active: false }));
      //   changeCurrentTeam();
      // }, 2000);
    } else if (point === 1) {
      // setTimeout(() => {
      //   setShowAlert((state) => ({
      //     active: true,
      //     title: "Passou a vez",
      //   }));
      // }, 3500);
      // setTimeout(() => {
      //   setShowAlert((state) => ({ active: false }));
      //   changeCurrentTeam();
      // }, 2000);
    } else {
      setRoulettePoints(point);
    }
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
        hits,
        clearHits,
        resetHits,
        showAlert,
        teamsPoints,
        currentTeam,
        changeCurrentTeam,
        totalLetters,
        lettersFound,
        sendRoulettePoint,
        finishedLettersInput,
      }}
    >
      {children}
    </LetterContext.Provider>
  );
}
