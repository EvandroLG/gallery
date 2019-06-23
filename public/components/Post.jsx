import React from "react";
import PropTypes from 'prop-types';

const Post = ({ image, description }) => {
 return (
    <article>
      <header>
        <strong></strong>
      </header>

      <img src={image} alt={description} />

      <section></section>
    </article>
  );
};

Post.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string
};

export default Post;
