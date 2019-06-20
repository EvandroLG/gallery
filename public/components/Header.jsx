import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0,0,0,.0975);
  height: 75px;
`;

export default () => {
  return (
    <Header>
      <a href="/">
        Gallery
      </a>
    </Header>
  );
};
