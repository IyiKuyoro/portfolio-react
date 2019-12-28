import { combineReducers } from 'redux';
import authUser from './authUser';
import controls from './controls';
import a11y from './a11y';

const rootReducer = combineReducers({
  authUser,
  controls,
  a11y,
});

export default rootReducer;
