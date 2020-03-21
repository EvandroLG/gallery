import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../styled/Container';

import {
  StyledFieldError,
  StyledFormGroup,
  StyledLabel,
  StyledSubmitButton,
  StyledTextarea,
} from '../styled/Form';

import { useForm } from '@evandrolg/react-form-helper';
import usePost from '../hooks/usePost';

export interface IDict {
  [key: string]: string;
}

const Title = styled.h1`
  font-size: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const validation = ({ image }: IDict) => ({
  ...(!image && { image: 'File is required' }),
});

const NewPost: React.FC<RouteComponentProps> = ({ history }) => {
  const image = useRef<HTMLInputElement>(null);
  const [setData, isLoading, response] = usePost('/api/post');
  const [getInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    newPost,
  );

  useEffect(() => {
    if (response?.ok) {
      history.push('/');
    }
  }, [response]);

  async function newPost({ description }: IDict) {
    const formData = new FormData();
    const current = image?.current;
    const files = current?.files;

    formData.append('photo', (files || [])[0]);

    if (description) {
      formData.append('description', description);
    }

    setData(formData);
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
          value={isLoading ? 'Posting...' : 'Post'}
          disabled={!!Object.keys(errors).length || isLoading}
        />
      </form>
    </Container>
  );
};

export default NewPost;
