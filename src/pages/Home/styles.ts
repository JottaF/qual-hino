import styled from "styled-components";

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

export const FooterContainer = styled.footer`
  font-size: 2rem;
  color: ${(props) => props.theme["yellow-300"]};

  display: flex;
  gap: 1rem;
  padding: 0 1rem;
`;

export const AlertContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 20rem;
  background-color: ${(props) => props.theme.red};
  color: ${(props) => props.theme.white};
  font-size: 3rem;

  position: absolute;
  top: calc((100% - 20rem) / 2);
  left: calc((100% - 1000px) / 2);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  border: 10px solid ${(props) => props.theme.white};
`;
