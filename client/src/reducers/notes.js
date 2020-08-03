import {
  ADD_NOTE,
  GET_NOTES,
  GET_REMINDER_NOTES,
  DELETE_NOTE,
  GET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_NOTE,
  GET_NOTE,
  CLEAR_USER_NOTES,
} from "../actions/types";
const initialState = {
  notes: null,
  note: null,
  reminderNotes: null,
  current: null,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
        loading: false,
      };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === payload._id ? payload : note
        ),
        loading: false,
      };

    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false,
      };

    case GET_NOTE:
      return {
        ...state,
        note: payload,
        loading: false,
      };

    case GET_REMINDER_NOTES:
      return {
        ...state,
        reminderNotes: payload,
        loading: false,
      };

    case GET_CURRENT:
      return {
        ...state,
        current: payload,
        loading: false,
      };
    case CLEAR_USER_NOTES:
      return {
        ...state,
        notes: null,
        note: null,
        reminderNotes: null,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};
