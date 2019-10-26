import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";
import MainContent from './MainContent';
import status from '../status';

import {
  FormGroup,
  Label,
  Textarea,
  SubmitButton
} from './Form';

import { post, authorizationHeader } from "../libs/http";
import useForm from '../hooks/useForm';

const Title = styled.h1`
  font-size: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const NewPost = ({ history }) => {
  const image = useRef(null);
  const [
    fields,
    getInputValue,
    handleChange,
    handleSubmit,
  ] = useForm(newPost);

  async function newPost({ description }) {
    const data = new FormData();
    data.append('photo', image.current.files[0]);
    data.append('description', description);

    const result = await post('/api/post', data, {
      ...authorizationHeader,
    });

    if (result.ok) {
      history.push('/');
    } else if (result.status === status.UNAUTHORIZED) {
      return <Redirect to='/login' />;
    }
  }

  return (
    <MainContent>
      <Title>New Post</Title>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <input
            id="image"
            type="file"
            ref={image}
            accept="image/x-png,image/gif,image/jpeg"
            value={getInputValue('image')}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">
            Description
          </Label>
          <Textarea
            id="description"
            value={getInputValue('description')}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton
          value="Submit"
        />
      </form>
    </MainContent>
  );
}

NewPost.propTypes = {
  history: PropTypes.object,
};

export default NewPost;
