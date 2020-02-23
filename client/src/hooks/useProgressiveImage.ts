import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const styles = `
  width: 100%;
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
  max-height: 600px;
  object-fit: contain;
  animation: ${fadeIn} 1s;
`;

const Fallback = styled.div`
  ${styles}
  height: auto;
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
