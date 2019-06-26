import React from "react";
import styled from "styled-components";

const MainHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  height: 75px;
`;

MainHeader.defaultProps = {
  ['data-testid']: 'header'
};

export default function Header() {
  return (
    <MainHeader>
      <a href="/">Gallery</a>
    </MainHeader>
  );
}
