import { useState } from "react";
import { LetterContainer } from "./styles";

interface LetterBoxProps {
  letter: string;
  visibility?: boolean;
}

export function LetterBox({ letter, visibility = false }: LetterBoxProps) {
  const [isVisible, setIsVisible] = useState(visibility);

  //TODO remover função
  function handleClick() {
    setIsVisible(!isVisible);
  }
  return (
    <LetterContainer disabled={letter === " "} onClick={handleClick}>
      {isVisible && <span>{letter}</span>}
    </LetterContainer>
  );
}
