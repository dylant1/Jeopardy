import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
    font-family: Roboto Mono, monospace;
    //add or rmove time to fade where the 0.0 is
    transition: all 0.20s linear;
  }
  `;
