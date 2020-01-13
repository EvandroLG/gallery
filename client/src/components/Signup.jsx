import React from 'react';
import PropTypes from 'prop-types';
import MainContent from './MainContent';
import { postWithRedirect } from '../libs/http';
import {
  useForm,
  isEmailValid,
  isPasswordValid,
} from '@evandrolg/react-form-helper';

import { FormGroup, Label, SubmitButton, Input, FieldError } from './Form';

const validation = ({ email, username, password }) => ({
  ...(!isEmailValid(email) && { email: 'E-mail is not valid' }),
  ...(!username && { username: 'Username is required' }),
  ...(!isPasswordValid(password) && { password: 'Password is not valid' }),
});

const submit = async data => {
  await postWithRedirect('/api/signup', data, history);
};

const Signup = ({ history }) => {
  const [getInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    submit,
  );

  return (
    <MainContent>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">*E-mail</Label>
          <Input
            type="text"
            id="email"
            value={getInputValue('email')}
            onChange={handleChange}
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="username">*Username</Label>
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

        <SubmitButton value="Sign up" disabled={Object.keys(errors).length} />
      </form>
    </MainContent>
  );
};

Signup.propTypes = {
  history: PropTypes.object,
};

export default Signup;
