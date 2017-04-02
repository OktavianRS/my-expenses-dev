/*
 *
 * Registration reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TRY_REGISTER,
} from './constants';

const initialState = fromJS({});

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case TRY_REGISTER:
      return state;
    default:
      return state;
  }
}

export default registrationReducer;
