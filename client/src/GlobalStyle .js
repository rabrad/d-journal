import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    /* overflow-x: hidden; */
    box-sizing:border-box;
    font-family: 'Montserrat', sans-serif;
  }

  #root{
  height:100vh;
  background: linear-gradient(180deg, rgba(0, 153, 255, 0.13) 0%, rgba(255, 255, 255, 0) 83.33%);
  color: #334858;
   
  }
`;

export default GlobalStyle;
