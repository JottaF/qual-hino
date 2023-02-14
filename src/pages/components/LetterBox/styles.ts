import styled, { css } from "styled-components";

interface LetterContainerProps {
  disabled: boolean;
  isAlert?: boolean;
  isSpecialCharacter: boolean;
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

  ${(props) =>
    props.isAlert &&
    css`
      background-color: orange;
    `}

  ${(props) =>
    props.isSpecialCharacter &&
    css`
      background-color: transparent;
      border: 3px solid ${props.theme["yellow-300"]};
      span {
        color: ${props.theme["yellow-300"]};
      }
    `}
`;

LetterContainer.displayName = "LetterContainer";
