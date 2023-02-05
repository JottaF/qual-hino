import { useContext, useState } from "react";
import { LetterContext } from "../../../contexts/letterContext";
import { LetterContainer } from "./styles";

interface LetterBoxProps {
  content: string;
  visibility?: boolean;
}

export function LetterBox({ content, visibility = false }: LetterBoxProps) {
  const { letter } = useContext(LetterContext);
  const [isVisible, setIsVisible] = useState(visibility);

  if (letter === content) {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }

  return (
    <LetterContainer disabled={content === " "} isAlert={letter === content}>
      {isVisible && <span>{content}</span>}
    </LetterContainer>
  );
}
