import React from 'react';
import PropTypes from 'prop-types';
import Container from '../styled/Container';
import {postWithRedirect} from '../libs/http';
import {
  useForm,
  isEmailValid,
  isPasswordValid,
} from '@evandrolg/react-form-helper';

import {
  StyledFormGroup,
  StyledLabel,
  StyledSubmitButton,
  StyledInput,
  StyledFieldError,
} from '../styled/Form';

const validation = ({email, username, password}) => ({
  ...(!isEmailValid(email) && {email: 'E-mail is not valid'}),
  ...(!username && {username: 'Username is required'}),
  ...(!isPasswordValid(password) && {password: 'Password is not valid'}),
});

const submit = async data => {
  await postWithRedirect('/api/signup', data, history);
};

const Signup = () => {
  const [getStyledInputValue, handleChange, handleSubmit, errors] = useForm(
    validation,
    submit,
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <StyledFormGroup>
          <StyledLabel htmlFor="email">*E-mail</StyledLabel>
          <StyledInput
            type="text"
            id="email"
            value={getStyledInputValue('email')}
            onChange={handleChange}
          />
          {errors.email && <StyledFieldError>{errors.email}</StyledFieldError>}
        </StyledFormGroup>

        <StyledFormGroup>
          <StyledLabel htmlFor="username">*Username</StyledLabel>
          <StyledInput
            type="text"
            id="username"
            value={getStyledInputValue('username')}
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
            value={getStyledInputValue('password')}
            onChange={handleChange}
          />
          {errors.password && (
            <StyledFieldError>{errors.password}</StyledFieldError>
          )}
        </StyledFormGroup>

        <StyledSubmitButton
          value="Sign up"
          disabled={Object.keys(errors).length}
        />
      </form>
    </Container>
  );
};

Signup.propTypes = {
  history: PropTypes.object,
};

export default Signup;
