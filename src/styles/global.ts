import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${(props) => props.theme["blue-700"]};
    }

    body, input, button, textarea {
        font-family: 'Baloo 2';
        font-weight: bold;
        font-size: 1rem;
    }
`;
