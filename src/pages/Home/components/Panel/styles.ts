import styled, { css } from "styled-components";

export const PanelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  margin-top: 2.5rem;
`;

interface TeamsProps {
  side?: "right" | "left";
}
export const TeamsContainer = styled.div<TeamsProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  ${(props) =>
    props.side === "right" &&
    css`
      align-items: flex-end;

      div {
        border-radius: 0;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
    `}
`;

interface TeamProps {
  team: 1 | 2 | 3 | 4;
  active: boolean;
}
export const Team = styled.div<TeamProps>`
  width: 10rem;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 3rem;
  color: ${(props) => props.theme.white};

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.team === 1 &&
    css`
      background-color: ${props.theme.team1};
    `}

  ${(props) =>
    props.team === 2 &&
    css`
      background-color: ${props.theme.team2};
    `}

  ${(props) =>
    props.team === 3 &&
    css`
      background-color: ${props.theme.team3};
    `}

  ${(props) =>
    props.team === 4 &&
    css`
      background-color: ${props.theme.team4};
    `}

  ${(props) =>
    props.active &&
    css`
      box-shadow: 0 0 0 5px ${(props) => props.theme.white};
      outline: 3px solid ${(props) => props.theme["blue-700"]};
    `}
`;
export const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
`;

PanelContainer.displayName = "PanelContainer";
TeamsContainer.displayName = "TeamsContainer";
Team.displayName = "Team";
MiddleContainer.displayName = "MiddleContainer";
