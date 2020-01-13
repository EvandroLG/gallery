import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledHeader = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 15px;
  margin-bottom: 50px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  line-height: 75px;
  height: 75px;
`;

export const StyledLogo = styled(Link)`
  color: #5a5758;
  font-size: 32px;
  text-transform: uppercase;
`;

export const StyledNewPostLink = styled(Link)`
  position: absolute;
  z-index: 2;
  right: 15px;
`;
