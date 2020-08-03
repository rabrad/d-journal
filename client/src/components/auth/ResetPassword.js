import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Divider, Button } from '../shared/Elements';
import { resetPassword } from '../../actions/auth';
import {
  Form,
  Input,
  Label,
  FormTitle,
  InputHolder,
  SendContainer,
} from '../shared/FormGroup';

const FormWrapper = styled.div`
  width: 50vw;
`;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const token = useParams().token;
  const location = useHistory();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, confirmPassword, token));
    location.push('/');
  };

  return (
    <SendContainer>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormTitle> Rest your password</FormTitle>
          <Divider marginBottom='0.8rem' />

          <InputHolder>
            <Input
              type='password'
              name='password'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Label>Password</Label>
          </InputHolder>
          <InputHolder>
            <Input
              type='password'
              name='confirmPassword'
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <Label>Confirm Password</Label>
          </InputHolder>
          <Button>Reset Your Password</Button>
        </Form>
      </FormWrapper>
    </SendContainer>
  );
};

export default ResetPassword;
