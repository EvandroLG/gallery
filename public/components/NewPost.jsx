import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";
import MainContent from './MainContent';

import {
  FormGroup,
  Label,
  Textarea,
  SubmitButton
} from './Form';

import http from "../libs/http";
import statusCode from '../status';

const Title = styled.h1`
  font-size: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const NewPost = ({ history }) => {
  const [ description, setDescription ] = useState('');
  const [ isValid, setIsValid ] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const inputImage = useRef(null);
  const inputDescription = useRef(null);

  async function verifyAuthentication() {
    try {
      await http.get('/api/auth', {
        authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      });
    } catch(e) {
        if (e.status === statusCode.UNAUTHORIZED) {
          setIsAuthorized(false);
        }
    }
  }

  useEffect(() => {
    verifyAuthentication();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('photo', inputImage.current.files[0]);
    data.append('description', inputDescription.current.value);

    const result = await http.post('/api/post', data);

    if (result.ok) {
      history.push('/');
    }
  }

  function onChangeFile(e) {
    setIsValid(Boolean(e.target.value));
  }

  if (!isAuthorized) {
    return <Redirect to='/login' />;
  }

  return (
    <MainContent>
      <Title>New Post</Title>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <input
            ref={inputImage}
            id="image"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={onChangeFile}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">
            Description
          </Label>
          <Textarea
            ref={inputDescription}
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>

        <SubmitButton
          value="Submit"
          disabled={!isValid}
        />
      </form>
    </MainContent>
  );
}

NewPost.propTypes = {
  history: PropTypes.object
};

export default NewPost;
