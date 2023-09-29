import { createGlobalStyle } from "styled-components"

export enum Color {
  white = "#FFFFFF",
  light = "#F4F5F7",
  black = "#000000",
  primary = "#B88E2F",
  pink_1 = "#FFF3E3",
  pink_2 = "#FCF8F3",
  font_1 = "#333333",
  font_2 = "#666666",
  gray_1 = "#3A3A3A",
  gray_2 = "#616161",
  gray_3 = "#898989",
  gray_5 = "#D8D8D8",
  green = "#2EC1AC",
  red = "#E97171",
}


const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: inherit;
  }
  #root{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  body {
    background-color: ${Color.white};
    font-weight: 400;
    color: ${Color.font_1};
    font-family: inherit;
  }
  html {
    box-sizing: border-box;
    font-size: 93.75%;
  }
`

export default GlobalStyle
