import axios from "axios";
import {
  ADD_NOTE,
  GET_NOTES,
  GET_REMINDER_NOTES,
  DELETE_NOTE,
  GET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_NOTE,
  GET_NOTE,
} from "./types";
import { setAlert } from "./alert";

export const addNote = (noteForm) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes`,
      noteForm,
      config
    );
    dispatch({
      type: ADD_NOTE,
      payload: data.data,
    });
    dispatch(setAlert("Note created", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
export const updateNote = (noteForm, id, archive = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const data = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`,
      noteForm,
      config
    );
    if (archive) {
      dispatch(setAlert("Note archived", "success"));
      dispatch(getReminderNotes());
    } else {
      dispatch({
        type: UPDATE_NOTE,
        payload: data.data,
      });
      dispatch(setAlert("Note updated", "success"));
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
export const archiveNote = (note, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`,
      note,
      config
    );
    dispatch({
      type: UPDATE_NOTE,
      payload: id,
    });
    dispatch(setAlert("Note archived", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
export const setReminder = (reminder, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const data = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}/reminder`,
      reminder,
      config
    );
    dispatch({
      type: UPDATE_NOTE,
      payload: data.data,
    });
    dispatch(setAlert("Reminder updated", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const getNotes = () => async (dispatch) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes`
    );
    dispatch({
      type: GET_NOTES,
      payload: data.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
export const getNote = (noteId) => async (dispatch) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes/${noteId}`
    );
    dispatch({
      type: GET_NOTE,
      payload: data.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const getReminderNotes = () => async (dispatch) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/notes/reminder`
    );
    dispatch({
      type: GET_REMINDER_NOTES,
      payload: data.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`);
    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
    dispatch(setAlert("Note deleted", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const getCurrent = (note) => (dispatch) => {
  dispatch({
    type: GET_CURRENT,
    payload: note,
  });
};
export const clearCurrent = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};
