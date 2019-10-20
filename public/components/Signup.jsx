import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import MainContent from './MainContent';
import useForm from '../hooks/useForm';
import { postWithRedirect } from '../libs/http';

import {
  FormGroup,
  Label,
  SubmitButton,
  Input,
} from './Form';

const Signup = ({ history }) => {
  const register = async (data) => {
    await postWithRedirect('/api/signup', data, history);
  };

  const [
    fields,
    getInputValue,
    handleChange,
    handleSubmit,
  ] = useForm(register);

  return (
    <MainContent>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="text"
            id="email"
            value={getInputValue('email')}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={getInputValue('username')}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={getInputValue('password')}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton
          value="Sign up"
        />
      </form>
    </MainContent>
  );
};

Signup.propTypes = {
  history: PropTypes.object
};

export default Signup;
