import styled from "styled-components";

export const FormGroup = styled.div`
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  cursor: pointer;
  margin-bottom: 0.5em;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.0975);
`;

export const SubmitButton = styled.input.attrs({ type: 'submit' })`
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
`;
