import React, { useState, useRef } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormGroup, Label, Textarea, SubmitButton } from './Form';
import http from '../libs/http';

const Main = styled.main`
  width: 95%;
  margin: 0 auto;
  margin-top: 40px;
  padding: 15px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.0975);
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const NewPost = ({ history }) => {
  const [description, setDescription] = useState('');
  const [isValid, setIsValid] = useState(false);
  const inputImage = useRef(null);
  const inputDescription = useRef(null);

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
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const type = e.target.files[0].type;

    setIsValid(acceptedTypes.includes(type));
  }

  return (
    <Main>
      <Title>New Post</Title>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <input
            ref={inputImage}
            id="image"
            type="file"
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
    </Main>
  );
}

NewPost.propTypes = {
  history: PropTypes.object
};

export default NewPost;
