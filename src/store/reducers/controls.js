import {
  TOGGLE_MENU,
} from '../constants';

const initialState = {
  userMenuOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        userMenuOpen: !state.userMenuOpen,
      };
    default:
      return state;
  }
}
