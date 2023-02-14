import styled from "styled-components";

export const MusicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Music = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 0.5rem;
`;

MusicsContainer.displayName = "MusicsContainer";
Music.displayName = "Music";
