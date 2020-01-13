import React, {useRef} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../styled/Container';
import status from '../configs/status';

import {
  StyledFormGroup,
  StyledLabel,
  StyledTextarea,
  StyledSubmitButton,
  StyledFieldError,
} from '../styled/Form';

import {post, authorizationHeader} from '../libs/http';
import {useForm} from '@evandrolg/react-form-helper';

const Title = styled.h1`
  font-size: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const validation = ({image}) => ({
  ...(!image && {image: 'File is required'}),
});

const NewPost = ({history}) => {
  const image = useRef(null);
  const [getInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    newPost,
  );

  async function newPost({description}) {
    const data = new FormData();
    data.append('photo', image.current.files[0]);
    description && data.append('description', description);

    const result = await post('/api/post', data, {
      ...authorizationHeader,
    });

    if (result.ok) {
      history.push('/');
    } else if (result.status === status.UNAUTHORIZED) {
      return <Redirect to="/login" />;
    }
  }

  return (
    <Container>
      <Title>New Post</Title>

      <form onSubmit={handleSubmit}>
        <StyledFormGroup>
          <input
            id="image"
            type="file"
            ref={image}
            accept="image/x-png,image/gif,image/jpeg"
            value={getInputValue('image')}
            onChange={handleChange}
          />

          {errors.image && <StyledFieldError>{errors.image}</StyledFieldError>}
        </StyledFormGroup>

        <StyledFormGroup>
          <StyledLabel htmlFor="description">Description</StyledLabel>
          <StyledTextarea
            id="description"
            value={getInputValue('description')}
            onChange={handleChange}
          />
        </StyledFormGroup>

        <StyledSubmitButton
          value="Submit"
          disabled={Object.keys(errors).length}
        />
      </form>
    </Container>
  );
};

NewPost.propTypes = {
  history: PropTypes.object,
};

export default NewPost;
