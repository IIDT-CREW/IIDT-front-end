import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Nanum Myeongjo','Spoqa Han Sans Neo', 'sans-serif'; 
  }
  body {
    transition : background 0.5s;
    background-color: ${({ theme }) => theme.colors.background};
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
