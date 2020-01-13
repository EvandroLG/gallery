import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from '../styled/Container';
import {useForm} from '@evandrolg/react-form-helper';
import {postWithRedirect} from '../libs/http';

import {
  StyledFormGroup,
  StyledLabel,
  StyledSubmitButton,
  StyledInput,
  StyledFieldError,
} from '../styled/Form';

const SignupLink = styled(Link)`
  margin-left: 15px;
`;

const validation = ({username, password}) => ({
  ...(!username && {username: 'Username is required'}),
  ...(!password && {password: 'Password is required'}),
});

const login = history => {
  return async ({username, password}) => {
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

const Login = ({history}) => {
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
          <Label htmlFor="password">*Password</Label>
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
          disabled={Object.keys(errors).length}
        />
        <SignupLink to="/signup">Signup</SignupLink>
      </form>
    </Container>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
