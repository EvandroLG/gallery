import React from 'react';
import styled from 'styled-components';
import useProgressiveImage from '../hooks/useProgressiveImage';
import { IPost } from '../interfaces/post';
import { formatfromNow, fromUtcToLocalTime } from '../libs/date';

const Article = styled.article`
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 15px;
  width: 100%;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.0975);
  border-radius: 5px;

  &:first-child {
    margin-top: 0;
  }
`;

const Description = styled.section`
  padding-top: 15px;
`;

const Time = styled.time`
  padding-top: 5px;
  color: #999;
  font-size: 0.9rem;
`;

const DescriptionWrapper = styled.div`
  padding-left: 15px;
`;

const formatDate = (createdAt: string) => {
  const date = fromUtcToLocalTime(new Date(createdAt));
  return formatfromNow(date);
};

const Post: React.FC<IPost> = ({ image, description, createdAt }) => {
  const [Fallback, Photo, isReady] = useProgressiveImage(image);

  return (
    <Article>
      <Fallback>{isReady && <Photo src={image} alt={description} />}</Fallback>

      <DescriptionWrapper>
        {description && (
          <Description data-testid="description">{description}</Description>
        )}

        <Time dateTime={createdAt}>{formatDate(createdAt)}</Time>
      </DescriptionWrapper>
    </Article>
  );
};

export default Post;
