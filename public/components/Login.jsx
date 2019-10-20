import React from 'react';
import PropTypes from 'prop-types';
import MainContent from './MainContent';
import useForm from '../hooks/useForm';
import { postWithRedirect } from '../libs/http';

import {
  FormGroup,
  Label,
  SubmitButton,
  Input,
} from './Form';

const Login = ({ history }) => {
  const login = async ({
    username,
    password
  }) => {
    await postWithRedirect('/api/signin', {
      username,
      password,
    }, history);
  };

  const [
    fields,
    getInputValue,
    handleChange,
    handleSubmit,
  ] = useForm(login);

  return (
    <MainContent>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">E-mail or Username</Label>
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
          value="Login"
        />
      </form>
    </MainContent>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
