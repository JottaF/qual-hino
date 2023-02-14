import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { LetterContext } from "../../../contexts/letterContext";
import { LetterContainer } from "./styles";

interface LetterBoxProps {
  content: string;
}

export function LetterBox({ content }: LetterBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const letter = useContextSelector(LetterContext, (context) => context.letter);
  const status =
    letter === content ||
    (letter === "c" && content === "ç") ||
    (letter === "a" && content === "á") ||
    (letter === "a" && content === "à") ||
    (letter === "a" && content === "ã") ||
    (letter === "a" && content === "â") ||
    (letter === "e" && content === "é") ||
    (letter === "e" && content === "ê") ||
    (letter === "i" && content === "í") ||
    (letter === "o" && content === "ô") ||
    (letter === "o" && content === "õ") ||
    (letter === "o" && content === "ó") ||
    (letter === "u" && content === "ú");

  if (status) {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }

  const specialCharacter =
    content === "-" ||
    content === "?" ||
    content === "!" ||
    content === "," ||
    content === "'" ||
    content === ".";

  return (
    <LetterContainer
      disabled={content === " "}
      isAlert={status}
      isSpecialCharacter={specialCharacter}
    >
      {isVisible && <span>{content}</span>}
      {specialCharacter && <span>{content}</span>}
    </LetterContainer>
  );
}
