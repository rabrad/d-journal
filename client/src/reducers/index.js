import { combineReducers } from 'redux';
import notes from './notes';
import auth from './auth';
import alert from './alert';

export default combineReducers({
  notes,
  auth,
  alert,
});
