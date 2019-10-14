import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import MainContent from './MainContent';
import { post } from '../libs/http';

import {
  FormGroup,
  Label,
  SubmitButton,
  Input,
} from './Form';

const Signup = ({ history }) => {
  const [ isValid, setIsValid ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const inputEmail = useRef(null);
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);

  function getInputValues() {
    const { value: email } = inputEmail.current;
    const { value: username } = inputUsername.current;
    const { value: password } = inputPassword.current;

    return {
      email,
      username,
      password,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, username, password } = getInputValues();

    const result = await post('/api/signup', JSON.stringify({
      email,
      username,
      password,
    }), {
        'Content-Type': 'application/json',
    });

    if (result.ok) {
      const { token } = await result.json();
      localStorage.setItem('jwt_token', token);
      history.push('/');
    }
  }

  function handleChange(e, setValue) {
    const { value } = e.target;
    setValue(value);

    const { email, username, password } = getInputValues();
    setIsValid(email && username && password);
  }

  return (
    <MainContent>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="text"
            ref={inputEmail}
            id="email"
            value={email}
            onChange={ e => handleChange(e, setEmail) }
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            ref={inputUsername}
            id="username"
            value={username}
            onChange={ e => handleChange(e, setUsername) }
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
          value="Sign up"
          disabled={!isValid}
        />
      </form>
    </MainContent>
  );
};

Signup.propTypes = {
  history: PropTypes.object
};

export default Signup;
