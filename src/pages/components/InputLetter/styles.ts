import styled from "styled-components";

export const InputFormContainer = styled.form`
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
`;

InputFormContainer.displayName = "InputFormContainer";
