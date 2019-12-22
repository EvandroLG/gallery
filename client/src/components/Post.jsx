import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromUtcToLocalTime, formatfromNow } from '../libs/date';

const Article = styled.article`
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 15px 0;
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

const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

const Post = ({ image, description, createdAt }) => {
  function formatDate() {
    const date = fromUtcToLocalTime(new Date(createdAt));
    return formatfromNow(date);
  }

  return (
    <Article>
      <Image src={image} alt={description} data-testid="image" />

      <DescriptionWrapper>
        {description && (
          <Description data-testid="description">{description}</Description>
        )}

        <Time dateTime={createdAt}>{formatDate()}</Time>
      </DescriptionWrapper>
    </Article>
  );
};

Post.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
};

export default Post;
