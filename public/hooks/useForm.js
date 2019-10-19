import { useState } from 'react';

export default (callback) => {
  const [state, setState] = useState({});

  const getInputValue = value => state[value] || '';
  const handleChange = e => setState({ ...state, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return [
    state,
    getInputValue,
    handleChange,
    handleSubmit,
  ];
};
