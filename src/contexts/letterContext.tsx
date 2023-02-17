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
  variant?: "point";
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
  changeCurrentTeam: (team?: number) => void;
  totalLetters: number;
  lettersFound: number;
  sendRoulettePoint: (point: number) => void;
  finishedLettersInput: boolean;
  roulettePoints: number;
  rotate: number;
  handleRoulette: () => void;
  showAllLetters: boolean;
  showLetters: () => void;
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
  const [rotate, setRotate] = useState(0);
  const [showAllLetters, setShowAllLetters] = useState(false);

  const finishedLettersInput = totalLetters - 12 <= lettersFound; // !: trocar

  function reducer(state: any, action: ActionProps) {
    console.log("reduce");
    switch (action.type) {
      case "INCREMENT_TEAM1":
        return { ...state, team1: (state.team1 += action.hit) };
      case "INCREMENT_TEAM2":
        return { ...state, team2: (state.team2 += action.hit) };
      case "INCREMENT_TEAM3":
        return { ...state, team3: (state.team3 += action.hit) };
      case "INCREMENT_TEAM4":
        return { ...state, team4: (state.team4 += action.hit) };
      case "RESET_1":
        return { ...state, team1: (state.team1 = 0) };
      case "RESET_2":
        return { ...state, team2: (state.team2 = 0) };
      case "RESET_3":
        return { ...state, team3: (state.team3 = 0) };
      case "RESET_4":
        return { ...state, team4: (state.team4 = 0) };
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
        teamsPointsDispatch({ type: "INCREMENT_TEAM1", hit });
        break;
      case 2:
        teamsPointsDispatch({ type: "INCREMENT_TEAM2", hit });
        break;
      case 3:
        teamsPointsDispatch({ type: "INCREMENT_TEAM3", hit });
        break;
      case 4:
        teamsPointsDispatch({ type: "INCREMENT_TEAM4", hit });
        break;
    }
  }

  function resetTeamPoints(team: number) {
    switch (team) {
      case 1:
        teamsPointsDispatch({ type: "RESET_1", hit: 0 });
        break;
      case 2:
        teamsPointsDispatch({ type: "RESET_2", hit: 0 });
        break;
      case 3:
        teamsPointsDispatch({ type: "RESET_3", hit: 0 });
        break;
      case 4:
        teamsPointsDispatch({ type: "RESET_4", hit: 0 });
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
        setRoulettePoints(0);
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
        incrementTeam(currentTeam, 0);
        changeCurrentTeam();
      }, 2000);
    } else if (hitsCount > 0) {
      setTimeout(() => {
        incrementTeam(currentTeam, hitsCount * roulettePoints);
      }, 2000);
    }
    setRoulettePoints((state) => 0);
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

  function changeCurrentTeam(team?: number) {
    console.log("changeCurrentTeam");
    if (team) {
      setCurrentTeam((state) => team);
    } else if (currentTeam < 4) {
      setCurrentTeam((state) => state + 1);
    } else {
      setCurrentTeam((state) => 1);
    }
  }

  function sendRoulettePoint(point: number) {
    console.log("sendRoulettePoint", point);

    setTimeout(() => {
      if (point === 0) {
        setShowAlert((state) => ({
          active: true,
          title: "Perdeu tudo",
        }));
        resetTeamPoints(currentTeam);
        changeCurrentTeam();
      } else if (point === 1) {
        setShowAlert((state) => ({
          active: true,
          title: "Passou a vez",
        }));
        changeCurrentTeam();
      } else if (point > 1) {
        setShowAlert((state) => ({
          active: true,
          variant: "point",
          title: `${point} pontos`,
        }));
        setRoulettePoints(point);
      }
    }, 3900);

    setTimeout(() => {
      setShowAlert((state) => ({ active: false }));
    }, 5200);

    if (finishedLettersInput) changeCurrentTeam();
  }

  function handleRoulette() {
    const rotation = Math.random() * 5000 + 9000;

    if (Math.abs(rotate - rotation) < 9000) {
      setRotate((state) => rotation + 9000);
    } else {
      setRotate((state) => rotation);
    }

    const deg = rotation % 360;
    if (deg >= 0 && deg < 20) {
      sendRoulettePoint(200);
    } else if (deg >= 20 && deg < 40) {
      sendRoulettePoint(100);
    } else if (deg >= 40 && deg < 60) {
      sendRoulettePoint(350);
    } else if (deg >= 60 && deg < 80) {
      sendRoulettePoint(1);
    } else if (deg >= 80 && deg < 100) {
      sendRoulettePoint(800);
    } else if (deg >= 100 && deg < 120) {
      sendRoulettePoint(75);
    } else if (deg >= 120 && deg < 140) {
      sendRoulettePoint(900);
    } else if (deg >= 140 && deg < 160) {
      sendRoulettePoint(1);
    } else if (deg >= 160 && deg < 180) {
      sendRoulettePoint(100);
    } else if (deg >= 180 && deg < 200) {
      sendRoulettePoint(750);
    } else if (deg >= 200 && deg < 220) {
      sendRoulettePoint(50);
    } else if (deg >= 220 && deg < 240) {
      sendRoulettePoint(1);
    } else if (deg >= 240 && deg < 260) {
      sendRoulettePoint(150);
    } else if (deg >= 260 && deg < 280) {
      sendRoulettePoint(600);
    } else if (deg >= 280 && deg < 300) {
      sendRoulettePoint(250);
    } else if (deg >= 300 && deg < 320) {
      sendRoulettePoint(0);
    } else if (deg >= 320 && deg < 340) {
      sendRoulettePoint(1000);
    } else if (deg >= 340 && deg < 360) {
      sendRoulettePoint(1);
    }
  }

  function showLetters() {
    setShowAllLetters(true);
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
        roulettePoints,
        rotate,
        handleRoulette,
        showAllLetters,
        showLetters,
      }}
    >
      {children}
    </LetterContext.Provider>
  );
}
