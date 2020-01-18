import { combineReducers } from 'redux';
import authUser from './authUser';
import controls from './controls';
import a11y from './a11y';
import notifications from './notifications';

const rootReducer = combineReducers({
  authUser,
  controls,
  a11y,
  notifications,
});

export default rootReducer;
