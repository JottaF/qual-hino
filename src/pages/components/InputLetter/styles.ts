import styled from "styled-components";

export const InputFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    background-color: transparent;
    border: none;
    border-radius: 4px;
    border-bottom: 4px solid ${(props) => props.theme["blue-500"]};
    color: ${(props) => props.theme.white};
    font-size: 4rem;
    text-align: center;
    width: 12rem;
    height: 4rem;
    text-transform: capitalize;

    &::placeholder {
      color: ${(props) => props.theme["blue-500"]};
      font-size: 1.5rem;
    }

    :focus {
      outline: none;
    }
  }

  button {
    width: 12rem;
    height: 4rem;
    border: 0;
    background: ${(props) => props.theme["blue-500"]};
    color: ${(props) => props.theme["blue-800"]};
    font-size: 1.5rem;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
      transition: filter 0.2s ease-in;
    }

    &:focus {
      outline: 0;
    }
  }
`;

InputFormContainer.displayName = "InputFormContainer";
