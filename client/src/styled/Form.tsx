import styled from 'styled-components';

export const StyledFormGroup = styled.div`
  margin-bottom: 30px;
`;

export const StyledLabel = styled.label`
  display: block;
  cursor: pointer;
  margin-bottom: 0.5em;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.0975);
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.0975);
`;

type ButtonProps = {
  disabled: boolean;
};

export const StyledSubmitButton = styled.input.attrs({ type: 'submit' })<
  ButtonProps
>`
  cursor: pointer;
  padding: 15px;
  background: #000;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  border-radius: 5px;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.7);
    cursor: default;
  }
`;

export const StyledFieldError = styled.div`
  margin-top: 15px;
  color: #f00;
`;
