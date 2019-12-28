import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainContent from './MainContent';
import useForm from '../hooks/useForm';
import { postWithRedirect } from '../libs/http';

import { FormGroup, Label, SubmitButton, Input, FieldError } from './Form';

const SignupLink = styled(Link)`
  margin-left: 15px;
`;

const Login = ({ history }) => {
  const [getInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    login,
  );

  function validation({ username, password }) {
    return {
      ...(!username && { username: 'Username is required' }),
      ...(!password && { password: 'Password is required' }),
    };
  }

  async function login({ username, password }) {
    await postWithRedirect(
      '/api/signin',
      {
        username,
        password,
      },
      history,
    );
  }

  return (
    <MainContent>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">*E-mail or Username</Label>
          <Input
            type="text"
            id="username"
            value={getInputValue('username')}
            onChange={handleChange}
          />
          {errors.username && <FieldError>{errors.username}</FieldError>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">*Password</Label>
          <Input
            type="password"
            id="password"
            value={getInputValue('password')}
            onChange={handleChange}
          />
          {errors.password && <FieldError>{errors.password}</FieldError>}
        </FormGroup>

        <SubmitButton value="Login" />
        <SignupLink to='/signup'>Signup</SignupLink>
      </form>
    </MainContent>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
