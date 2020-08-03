import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { forgetPassword } from '../../actions/auth';
import { Divider, Button } from '../shared/Elements';
import {
  Form,
  Input,
  Label,
  FormTitle,
  InputHolder,
  SendContainer,
} from '../shared/FormGroup';

const FormWrapper = styled.div`
  width: 40vw;
`;

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log('email:', email);
    e.preventDefault();
    dispatch(forgetPassword(email));
    setEmail('');
  };

  return (
    <SendContainer>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Reset Your Password</FormTitle>
          <Divider marginBottom='0.8rem' />
          <InputHolder>
            <Input
              color='#334858'
              type='email'
              name='email'
              onChange={handleChange}
              value={email}
              required
            />
            <Label>Email</Label>
          </InputHolder>
          <Button small>Send reset mail</Button>
        </Form>
      </FormWrapper>
    </SendContainer>
  );
};

export default ForgetPassword;
