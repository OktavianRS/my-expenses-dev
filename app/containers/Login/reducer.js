/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TRY_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN,
} from './constants';

const initialState = fromJS({
  errors: null,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case TRY_LOGIN:
      return state;
    case FAILED_LOGIN:
      return state
      .setIn(
        ['errors'], action.err,
      );
    default:
      return state;
  }
}

export default loginReducer;
