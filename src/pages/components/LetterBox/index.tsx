import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { LetterContext } from "../../../contexts/letterContext";
import { LetterContainer } from "./styles";

interface LetterBoxProps {
  content: string;
}

export function LetterBox({ content }: LetterBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { letter, showAllLetters } = useContextSelector(
    LetterContext,
    (context) => context
  );

  const regex = /^(a[aàáãâ]|c[cç]|e[eéê]|i[ií]|o[oóôõ]|u[uú])$/;
  const status = regex.test(letter + content);

  if (status) {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }

  const specialCharacter = (content.match(/[-?!,'´`\.]/g) || [])?.length > 0;

  return (
    <LetterContainer
      disabled={content === " "}
      isAlert={status}
      isSpecialCharacter={specialCharacter}
    >
      {(isVisible || showAllLetters) && !specialCharacter && (
        <span>{content}</span>
      )}
      {specialCharacter && <span>{content}</span>}
    </LetterContainer>
  );
}
