import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainContent from './MainContent';
import { useForm } from '@evandrolg/react-form-helper';
import { postWithRedirect } from '../libs/http';

import { FormGroup, Label, SubmitButton, Input, FieldError } from './Form';

const SignupLink = styled(Link)`
  margin-left: 15px;
`;

const validation = ({ username, password }) => ({
  ...(!username && { username: 'Username is required' }),
  ...(!password && { password: 'Password is required' }),
});

const login = history => {
  return async ({ username, password }) => {
    await postWithRedirect(
      '/api/signin',
      {
        username,
        password,
      },
      history,
    );
  };
};

const Login = ({ history }) => {
  const [getInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    login(history),
  );

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

        <SubmitButton value="Login" disabled={Object.keys(errors).length} />
        <SignupLink to="/signup">Signup</SignupLink>
      </form>
    </MainContent>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
