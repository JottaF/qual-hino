import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 20rem;
  max-height: 20rem;

  /* @media() { dimensionar depois
    
  } */
`;

interface RouletteImgProps {
  rotate: number;
}

export const RouletteImg = styled.img<RouletteImgProps>`
  width: 100%;
  transition: 3s ease-in-out;

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
