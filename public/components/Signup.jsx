import React, { useState, useRef } from "react";
import styled from "styled-components";
import http from '../libs/http';

import {
  FormGroup,
  Label,
  SubmitButton,
  Input,
} from './Form';

const Main = styled.main`
  width: 95%;
  margin: 0 auto;
  margin-top: 40px;
  padding: 15px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.0975);
  border-radius: 5px;
`;

const Signup = () => {
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const inputEmail = useRef(null);
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await http.post('/api/signup', {
      email: inputEmail.current.value,
      username: inputUsername.current.value,
      password: inputPassword.current.value,
    });

    debugger;
  }

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="text"
            ref={inputEmail}
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            ref={inputUsername}
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            ref={inputPassword}
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>

        <SubmitButton
          value="Sign up"
        />
      </form>
    </Main>
  );
}

export default Signup;
