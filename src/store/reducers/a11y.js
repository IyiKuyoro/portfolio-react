import { TOGGLE_ANIMATIONS } from '../constants';

const initialState = {
  animations: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ANIMATIONS:
      return {
        ...state,
        animations: !state.animations,
      };
    default:
      return state;
  }
}
