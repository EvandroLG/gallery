import React from 'react';
import { StyledHeader, StyledLogo, StyledNewPostLink } from '../styled/Header';

export default function Header() {
  return (
    <StyledHeader>
      <StyledLogo to="/">Gallery</StyledLogo>
      <StyledNewPostLink to="new_post">New Post</StyledNewPostLink>
    </StyledHeader>
  );
}
