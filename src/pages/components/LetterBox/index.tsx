import { useEffect, useState } from "react";
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

  const regex = /^(a[aàáãâ]|c[cç]|e[eéê]|i[ií]|o[oóòôõ]|u[uú])$/;
  const status = regex.test(letter + content) || letter === content;
  const [alert, setAlert] = useState(false);

  const specialCharacter =
    (content.match(/[-?!,'`"`\.]/g) || [])?.length > 0 || content === "´";

  useEffect(() => {
    if (status) {
      console.log(1);

      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        setIsVisible(true);
      }, 1000);
    }

    if (!isVisible && !specialCharacter && content !== " " && showAllLetters) {
      console.log(2);

      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        setIsVisible(true);
      }, 1000);
    }
  }, [status, showAllLetters]);

  // function handleShowLetter() {
  //   setIsVisible(!isVisible);
  // }

  return (
    <LetterContainer
      disabled={content === " "}
      isAlert={alert}
      isSpecialCharacter={specialCharacter}
      // onClick={handleShowLetter}
    >
      {isVisible && !specialCharacter && <span>{content}</span>}
      {specialCharacter && <span>{content}</span>}
    </LetterContainer>
  );
}
