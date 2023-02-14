import { useContextSelector } from "use-context-selector";
import { LetterContext } from "../../../../contexts/letterContext";
import { InputLetter } from "../../../components/InputLetter";
import { Roulette } from "../../../components/Roulet";
import {
  MiddleContainer,
  PanelContainer,
  Team,
  TeamsContainer,
} from "./styles";

export function Panel() {
  const { teamsPoints, currentTeam } = useContextSelector(
    LetterContext,
    (context) => context
  );

  return (
    <PanelContainer>
      <TeamsContainer>
        <Team team={1} active={currentTeam === 1}>
          {teamsPoints.team1}
        </Team>
        <Team team={2} active={currentTeam === 2}>
          {teamsPoints.team2}
        </Team>
      </TeamsContainer>
      <MiddleContainer>
        <Roulette />
        <InputLetter />
      </MiddleContainer>
      <TeamsContainer side="right">
        <Team team={3} active={currentTeam === 3}>
          {teamsPoints.team3}
        </Team>
        <Team team={4} active={currentTeam === 4}>
          {teamsPoints.team4}
        </Team>
      </TeamsContainer>
    </PanelContainer>
  );
}
