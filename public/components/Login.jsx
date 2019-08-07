import React, { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types";
import MainContent from './MainContent';

import {
  FormGroup,
  Label,
  SubmitButton,
  Input,
} from './Form';

const Login = ({ history }) => {
  const [ isValid, setIsValid ] = useState(false);
  const [ emailOrUsername, setEmailOrUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const inputEmailOrUsername = useRef(null);
  const inputPassword = useRef(null);

  function checkIfFormIsValid() {
    const { emailOrUsername, password } = getInputValues();
    setIsValid(emailOrUsername && password);
  }

  useEffect(() => {
    checkIfFormIsValid();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  function getInputValues() {
    const { value: emailOrUsername } = inputEmailOrUsername.current;
    const { value: password } = inputPassword.current;

    return {
      emailOrUsername,
      password,
    };
  }

  function handleChange(e, setValue) {
    const { value } = e.target;

    setValue(value);
    checkIfFormIsValid();
  }

  return (
    <MainContent>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email_or_username">E-mail or Username</Label>
          <Input
            type="text"
            ref={inputEmailOrUsername}
            id="email_or_username"
            value={emailOrUsername}
            onChange={ e => handleChange(e, setEmailOrUsername) }
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            ref={inputPassword}
            id="password"
            value={password}
            onChange={ e => handleChange(e, setPassword) }
          />
        </FormGroup>

        <SubmitButton
          value="Login"
          disabled={!isValid}
        />
      </form>
    </MainContent>
  );
}

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
