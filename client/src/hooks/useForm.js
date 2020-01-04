import { useState } from 'react';
import { isObjectEmpty } from '../libs/utils';

export default (validation, submit) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const getInputValue = value => values[value] || '';

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });

    setErrors(validation(values));

    setIsValid(isObjectEmpty(errors));
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validation(values));
    isObjectEmpty(errors) && submit(values);
  };

  return [getInputValue, handleChange, handleSubmit, isValid, errors, values];
};
