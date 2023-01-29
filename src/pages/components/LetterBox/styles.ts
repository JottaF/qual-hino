import styled, { css } from "styled-components";

interface LetterContainerProps {
  disabled: boolean;
}

export const LetterContainer = styled.div<LetterContainerProps>`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme["yellow-300"]};

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${(props) => props.theme["blue-700"]};
    font-size: 2.5rem;
    text-transform: capitalize;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: transparent;
    `}
`;
