import styled, { css } from "styled-components";

export const RouletteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 20rem;
  max-height: 20rem;
`;

interface RouletteImgProps {
  rotate: number;
}

export const RouletteImg = styled.img<RouletteImgProps>`
  width: 100%;

  transition: rotate 3s cubic-bezier(0.075, 0.82, 0.165, 1);

  ${(props) =>
    props.rotate > 0 &&
    css`
      rotate: ${props.rotate}deg;
    `}
`;

export const Spin = styled.img`
  height: 2rem;
  margin-left: -1.5rem;
  z-index: 2;
`;

RouletteContainer.displayName = "RouletteContainer";
RouletteImg.displayName = "RouletteImg";
Spin.displayName = "Spin";
