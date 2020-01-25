import React, { useRef } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
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

import { post, authorizationHeader } from '../libs/http';
import useForm, { Dict } from '../hooks/useForm';

const Title = styled.h1`
  font-size: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const validation = ({ image }: Dict) => ({
  ...(!image && { image: 'File is required' }),
});

const NewPost: React.FC<RouteComponentProps> = ({ history }) => {
  const image = useRef<HTMLInputElement>(null);
  const [getInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    newPost,
  );

  async function newPost({ description }: Dict) {
    const data = new FormData();
    const current = image?.current;
    const files = current?.files;

    data.append('photo', (files || [])[0]);
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
          disabled={!!Object.keys(errors).length}
        />
      </form>
    </Container>
  );
};

export default NewPost;
