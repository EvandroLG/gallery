import { History } from 'history';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, IDict } from '@evandrolg/react-form-helper';
import { postWithRedirect } from '../libs/http';
import Container from '../styled/Container';

import {
  StyledFieldError,
  StyledFormGroup,
  StyledInput,
  StyledLabel,
  StyledSubmitButton,
} from '../styled/Form';

const SignupLink = styled(Link)`
  margin-left: 15px;
`;

const validation = ({ username, password }: IDict) => ({
  ...(!username && { username: 'Username is required' }),
  ...(!password && { password: 'Password is required' }),
});

const login = (history: History) => {
  return async ({ username, password }: IDict) => {
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

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [getInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    login(history),
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <StyledFormGroup>
          <StyledLabel htmlFor="username">*E-mail or Username</StyledLabel>
          <StyledInput
            type="text"
            id="username"
            value={getInputValue('username')}
            onChange={handleChange}
          />
          {errors.username && (
            <StyledFieldError>{errors.username}</StyledFieldError>
          )}
        </StyledFormGroup>

        <StyledFormGroup>
          <StyledLabel htmlFor="password">*Password</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            value={getInputValue('password')}
            onChange={handleChange}
          />
          {errors.password && (
            <StyledFieldError>{errors.password}</StyledFieldError>
          )}
        </StyledFormGroup>

        <StyledSubmitButton
          value="Login"
          disabled={!!Object.keys(errors).length}
        />
        <SignupLink to="/signup">Signup</SignupLink>
      </form>
    </Container>
  );
};

export default Login;
