import styled, { css } from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  header {
    width: auto;
    margin: 0 auto;

    h1 {
      font-size: 4rem;
      color: ${(props) => props.theme["blue-500"]};
    }
  }
`;

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
`;
export const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;

  div {
    width: 18em;
    height: 18rem;
    background-color: ${(props) => props.theme.white};
    border-radius: 100%;
  }
`;

export const FooterContainer = styled.footer`
  font-size: 2rem;
  color: ${(props) => props.theme["yellow-300"]};

  display: flex;
  gap: 1rem;
  padding: 0 1rem;
`;
