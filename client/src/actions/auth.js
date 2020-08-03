import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_FAIL,
  USER_LOADED,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  DELETE_USER,
  CLEAR_USER_NOTES,
} from "./types";

export const clearUserNotes = () => (dispatch) => {
  dispatch({ type: CLEAR_USER_NOTES });
};

// get current user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/me`
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const formData = {
    name,
    email,
    password,
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
      formData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert("Registration successful!", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Forget Password
export const forgetPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgetpassword`,
      body,
      config
    );
    // if (res.body) {
    //   return dispatch(setAlert(res.data.message, 'success'));
    // }
    dispatch({
      type: FORGET_PASSWORD,
      payload: res.date,
    });

    dispatch(
      setAlert(
        "Dev Journal sent a password reset link to your email.",
        "success"
      )
    );
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Reset Password
export const resetPassword = (password, confirmPassword, token) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // const body = JSON.stringify({ password });
  const formDate = {
    password: password,
    confirmPassword: confirmPassword,
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/resetpassword/${token}`,
      formDate,
      config
    );

    // if (res.data) {
    //   return dispatch(setAlert(res.data.message, 'success'));
    // }
    // dispatch(loadUser());

    dispatch({
      type: RESET_PASSWORD,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(clearUserNotes());
};

// Delete user
export const deleteUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    await axios.delete(`http://localhost:5000/api/users`);
    dispatch({ type: DELETE_USER });
    dispatch(setAlert("Users deleted", "success"));
    dispatch(clearUserNotes());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
