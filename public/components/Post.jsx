import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  padding: 15px 15px 0;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

const Post = ({ image, description }) => {
  return (
    <Article>
      <Image
        src={image}
        alt={description}
        data-testid="image"
      />

      <Description data-testid="description">{description}</Description>
    </Article>
  );
};

Post.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string
};

export default Post;
