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

const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case TRY_LOGIN:
      return state;
    default:
      return state;
  }
}

export default loginReducer;
