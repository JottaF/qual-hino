import { InputLetter } from "../components/InputLetter";
import { MusicWidget } from "../components/MusicWidget";
import {
  FooterContainer,
  HomeContainer,
  MiddleContainer,
  PanelContainer,
  Team,
  TeamsContainer,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <header>
        <h1>Qual o hino?</h1>
      </header>

      <MusicWidget />

      <PanelContainer>
        <TeamsContainer>
          <Team team={1}>1220</Team>
          <Team team={2}>1050</Team>
        </TeamsContainer>
        <MiddleContainer>
          <div></div>
          <InputLetter />
        </MiddleContainer>
        <TeamsContainer side="right">
          <Team team={3}>1220</Team>
          <Team team={4}>1050</Team>
        </TeamsContainer>
      </PanelContainer>

      <FooterContainer>
        <span>A</span>
        <span>F</span>
        <span>G</span>
      </FooterContainer>
    </HomeContainer>
  );
}
