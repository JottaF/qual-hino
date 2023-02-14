import { useContextSelector } from "use-context-selector";
import { LetterContext } from "../../contexts/letterContext";
import { MusicWidget } from "../components/MusicWidget";
import { Panel } from "./components/Panel";
import { AlertContainer, FooterContainer, HomeContainer } from "./styles";

export function Home() {
  const { showAlert, lettersHistoric } = useContextSelector(
    LetterContext,
    (context) => context
  );

  return (
    <HomeContainer>
      <header>
        <h1>Roda a Roda JA</h1>
      </header>

      <MusicWidget />

      <Panel />

      <FooterContainer>
        {lettersHistoric.map((letter) => {
          return (
            <span key={letter + new Date().getTime()}>
              {letter.toUpperCase()}
            </span>
          );
        })}
      </FooterContainer>

      {showAlert.active && (
        <AlertContainer>
          <h1>{showAlert.title}</h1>
          <span>{showAlert.message}</span>
        </AlertContainer>
      )}
    </HomeContainer>
  );
}
