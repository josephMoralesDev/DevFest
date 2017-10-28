
import {
  SET_FRIENDS,
} from '../../actions/friends';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  data: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
