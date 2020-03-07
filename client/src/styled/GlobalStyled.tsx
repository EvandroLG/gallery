import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, h1, a, p,
  span, ul, li, section, header {
      margin: 0;
      padding: 0;
      border: 0;
  }

  input, textarea {
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
    color: ${props => props.theme.defaultTextColor};
    font-family: Helvetica, Arial, sans-serif;
    border: 0;
  }

  body {
    background: ${props => props.theme.bgBody};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.defaultLinkColor};
  }
`;

export default GlobalStyle;
