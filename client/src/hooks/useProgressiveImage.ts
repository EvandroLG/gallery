import { useState, useEffect } from 'react';
import styled from 'styled-components';

const styles = `
  width: 100%;
  height: 600px;
  border-radius: 5px;
`;

const Photo = styled.img`
  ${styles}
  object-fit: cover;
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
