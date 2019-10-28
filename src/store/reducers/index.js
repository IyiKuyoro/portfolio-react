import { combineReducers } from 'redux';
import authUser from './authUser';
import controls from './controls';

const rootReducer = combineReducers({
  authUser,
  controls,
});

export default rootReducer;
