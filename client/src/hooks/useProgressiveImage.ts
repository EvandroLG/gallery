import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const styles = `
  width: 100%;
  height: 600px;
  border-radius: 5px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Photo = styled.img`
  ${styles}
  object-fit: cover;
  animation: ${fadeIn} 1s;
`;

const Fallback = styled.div`
  ${styles}
  background: #fafafa;
`;

export default (src: string) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setIsReady(true);
    image.src = src;
  }, [src]);

  return [Fallback, Photo, isReady];
};
