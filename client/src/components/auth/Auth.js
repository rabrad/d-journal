import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Divider, Button } from '../shared/Elements';
import { register, login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import {
  Form,
  Input,
  InputHolder,
  Label,
  FormTitle,
  StyledLink,
  GridButtons,
} from '../shared/FormGroup';

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loginMode, toggle] = useState(false);
  const [auth, setAuth] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = auth;

  const onChangeRegisterHandler = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const onSubmitAuthFormHandler = (e) => {
    e.preventDefault();

    if (loginMode) {
      return dispatch(login(email, password));
    } else {
      if (password !== password2) {
        dispatch(setAlert('Passwords do not match', 'danger'));
      } else {
        dispatch(register(name, email, password));
      }
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/reviewNote' />;
  }

  return (
    <Form onSubmit={onSubmitAuthFormHandler} center>
      <FormTitle>{loginMode ? 'Login' : 'Create an account'}</FormTitle>
      <Divider />
      {!loginMode && (
        <InputHolder>
          <Input
            background='none'
            color='#334858'
            name='name'
            value={name}
            onChange={onChangeRegisterHandler}
            required
          />
          <Label>Name</Label>
        </InputHolder>
      )}
      <InputHolder>
        <Input
          background='none'
          color='#334858'
          name='email'
          value={email}
          onChange={onChangeRegisterHandler}
          required
        />
        <Label>Email</Label>
      </InputHolder>
      <InputHolder>
        <Input
          background='none'
          color='#334858'
          name='password'
          value={password}
          onChange={onChangeRegisterHandler}
          type='password'
          required
        />
        <Label>Password</Label>
      </InputHolder>
      {!loginMode && (
        <InputHolder>
          <Input
            background='none'
            color='#334858'
            name='password2'
            value={password2}
            onChange={onChangeRegisterHandler}
            type='password'
            required
          />
          <Label>Confirm password</Label>
        </InputHolder>
      )}
      <GridButtons>
        <Button small> {loginMode ? 'Login' : 'Register'} </Button>
        {loginMode && (
          <StyledLink to='/forgetpassword'>Forget Password?</StyledLink>
        )}
        <Button small onClick={() => toggle(!loginMode)}>
          {`${loginMode ? 'Register' : 'Login'}`}
        </Button>
      </GridButtons>
    </Form>
  );
};

export default Register;
