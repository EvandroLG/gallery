import { createGlobalStyle } from 'styled-components';
import theme from '../configs/theme';

const GlobalStyle = createGlobalStyle`
  html, body, h1, a, p,
  span, ul, li, section, header {
      margin: 0;
      padding: 0;
      border: 0;
  }

  * {
    box-sizing: border-box;
    color: ${theme.DEFAULT_TEXT_COLOR};
    font-family: Helvetica, Arial, sans-serif;
    border: 0;
  }

  body {
    background: ${theme.BG_BODY};
  }

  a {
    text-decoration: none;
    color: ${theme.DEFAULT_LINK_COLOR};
  }
`;

export default GlobalStyle;
